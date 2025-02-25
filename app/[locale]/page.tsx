import { IResponse, ITodo } from "@/types";
import dataService from "@/services/dataService";
import { revalidateTag } from "next/cache";
import { auth } from "@/auth";
import { getTranslations } from "next-intl/server";
import TodoList from "../components/TodoList";
import TodoListSearchBar from "../components/TodoListSearchBar";

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
  const t = await getTranslations();
  const cardData: ITodo[] | null = await fetchTodoData();

  if (cardData === null) {
    return <p className="text-red-500">{t("Errors.Error in fetching data")}</p>;
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
    <>
      <TodoListSearchBar />
      <TodoList
        todoData={cardData}
        deleteTodo={userRole === "Admin" ? deleteTodo : undefined}
      />
    </>
  );
}
