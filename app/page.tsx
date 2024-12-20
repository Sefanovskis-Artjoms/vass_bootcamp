import { ITodo } from "@/types";
import dataService from "@/services/dataService";
import TodoCard from "./components/TodoCard";
import { revalidateTag } from "next/cache";

export default async function HomePage() {
  async function fetchTodoData() {
    try {
      return await dataService.getAllTodos();
    } catch (error) {
      console.error("Error fetching todo data:", error);
      return null;
    }
  }

  const cardData: ITodo[] | null = await fetchTodoData();

  if (cardData === null) {
    return <p className="text-red-500">Error in fetching data</p>;
  }

  async function deleteTodo(id: string) {
    "use server";
    try {
      await dataService.deleteTodo(id);
      revalidateTag("todoData");
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  }

  return (
    <div>
      <ul className="space-y-4">
        {cardData.map((card: ITodo) => (
          <li key={card.id}>
            <TodoCard information={card} deleteTodoAction={deleteTodo} />
          </li>
        ))}
      </ul>
    </div>
  );
}
