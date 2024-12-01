import TodoDetails from "@/app/components/TodoDetails";
import dataService from "@/services/dataService";
import { ITodo } from "@/types";
import { revalidateTag } from "next/cache";

export default async function CardDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const fetchTodoData = async (id: string) => {
    try {
      const oneTodoData = await dataService.getTodoById(id);
      return oneTodoData;
    } catch (error) {
      console.error("Error fetching todo data:", error);
      return null;
    }
  };

  const fetchUserData = async () => {
    try {
      const userData = await dataService.getAllUsers();
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const userData = await fetchUserData();
  const oneTodoData = await fetchTodoData(id);

  if (!oneTodoData || !userData) {
    return <p className="text-red-500">Error in fetching data</p>;
  }

  const handleEdit = async (updatedTodo: ITodo) => {
    "use server";
    try {
      await dataService.updateTodo(updatedTodo.id, updatedTodo);
      revalidateTag("todoData");
      return { success: true, updatedTodo };
    } catch (error) {
      console.error("Error updating todo:", error);
      return { success: false, error: "Failed to update todo" };
    }
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
