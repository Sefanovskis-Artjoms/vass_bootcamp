import TodoDetails from "@/app/components/TodoDetails";
import { auth } from "@/auth";
import dataService from "@/services/dataService";
import { IGroup, IResponse, ITodo, IUser } from "@/types";
import { revalidateTag } from "next/cache";
import { getTranslations } from "next-intl/server";

export default async function CardDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const session = await auth();
  const userRole = session?.user?.role;
  const canEdit = userRole === "Admin" || userRole === "Manager";
  const t = await getTranslations("Common");
  const [userData, oneTodoData, groupData] = await Promise.all([
    fetchUserData(),
    fetchTodoData(id),
    fetchGroupData(),
  ]);

  async function fetchTodoData(id: string): Promise<ITodo | null> {
    const oneTodoData: IResponse<ITodo> = await dataService.getTodoById(id);
    if (!oneTodoData.success) {
      return null;
    }
    return oneTodoData.data;
  }

  async function fetchUserData(): Promise<IUser[] | null> {
    const getUserResponse: IResponse<IUser[]> = await dataService.getAllUsers();
    if (!getUserResponse.success) {
      return null;
    }
    return getUserResponse.data;
  }

  async function fetchGroupData(): Promise<IGroup[] | null> {
    const getGroupResponse: IResponse<IGroup[]> =
      await dataService.getAllGroups();
    if (!getGroupResponse.success) {
      return null;
    }
    return getGroupResponse.data;
  }

  const handleEdit = async (updatedTodo: ITodo) => {
    "use server";
    const updateTodoResponse: IResponse<ITodo> = await dataService.updateTodo(
      updatedTodo.id,
      updatedTodo
    );
    if (updateTodoResponse.success) {
      revalidateTag("todoData");
    }
    return updateTodoResponse;
  };

  if (oneTodoData === null || userData === null || groupData === null) {
    return <p className="text-red-500">{t("Errors.Error in fetching data")}</p>;
  }

  return (
    <div>
      <TodoDetails
        information={oneTodoData}
        onEditAction={canEdit ? handleEdit : undefined}
        userData={userData}
        userRole={userRole}
        groupData={groupData}
      />
    </div>
  );
}
