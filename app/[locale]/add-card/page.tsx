import dataService from "@/services/dataService";
import { IGroup, IResponse, ITodo, IUser } from "@/types";
import AddTodoCard from "../../components/AddTodoCard";
import { revalidateTag } from "next/cache";
import { getTranslations } from "next-intl/server";

export default async function AddCard() {
  const [t, userData, groupData] = await Promise.all([
    getTranslations("Common"),
    fetchUserData(),
    fetchGroupData(),
  ]);

  async function fetchUserData(): Promise<IUser[] | null> {
    const getUserDataResponse: IResponse<IUser[]> =
      await dataService.getAllUsers();
    if (!getUserDataResponse.success) {
      return null;
    }
    return getUserDataResponse.data;
  }

  async function fetchGroupData(): Promise<IGroup[] | null> {
    const getGroupDataResponse: IResponse<IGroup[]> =
      await dataService.getAllGroups();
    if (!getGroupDataResponse.success) {
      return null;
    }
    return getGroupDataResponse.data;
  }

  async function handleAdd(item: ITodo): Promise<IResponse<ITodo>> {
    "use server";
    const addTodoResponse: IResponse<ITodo> = await dataService.addTodo(item);
    if (addTodoResponse.success) {
      revalidateTag("todoData");
    }
    return addTodoResponse;
  }

  if (userData === null || groupData === null) {
    return (
      <p className="text-red-500">{t("Errors.Error in fetching user data")}</p>
    );
  }

  return (
    <AddTodoCard
      onAddAction={handleAdd}
      userData={userData}
      groupData={groupData}
    />
  );
}
