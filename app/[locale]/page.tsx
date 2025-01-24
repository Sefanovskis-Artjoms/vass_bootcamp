import { IResponse, ITodo } from "@/types";
import dataService from "@/services/dataService";
import TodoCard from "../components/TodoCard";
import { revalidateTag } from "next/cache";
import { auth } from "@/auth";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  async function fetchTodoData(): Promise<ITodo[] | null> {
    const getAllTodosResponse: IResponse<ITodo[]> =
      await dataService.getAllTodos();
    if (!getAllTodosResponse.success) {
      return null;
    }
    return getAllTodosResponse.data;
  }

  const session = await auth();
  const userRole = session?.user?.role;
  const t = await getTranslations("TodoCards");
  const cardData: ITodo[] | null = await fetchTodoData();

  if (cardData === null) {
    return <p className="text-red-500">{t("Error in fetching data")}</p>;
  }

  async function deleteTodo(id: string): Promise<IResponse> {
    "use server";

    const deleteTodoResponse: IResponse = await dataService.deleteTodo(id);
    if (deleteTodoResponse.success) {
      revalidateTag("todoData");
    }
    return deleteTodoResponse;
  }

  return (
    <div>
      <ul className="space-y-4">
        {cardData.map((card: ITodo) => (
          <li key={card.id}>
            <TodoCard
              information={card}
              deleteTodoAction={userRole === "Admin" ? deleteTodo : undefined}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
