import TodoDetails from "@/app/components/TodoDetails";
import dataService from "@/services/dataService";
import { IResponse, ITodo, IUser } from "@/types";
import { revalidateTag } from "next/cache";

export default async function CardDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

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

  const userData: IUser[] | null = await fetchUserData();
  const oneTodoData: ITodo | null = await fetchTodoData(id);

  if (!oneTodoData || !userData) {
    return <p className="text-red-500">Error in fetching data</p>;
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

  return (
    <div>
      <TodoDetails
        information={oneTodoData}
        onEditAction={handleEdit}
        userData={userData}
      />
    </div>
  );
}
