import dataService from "@/services/dataService";
import { IResponse, ITodo, IUser } from "@/types";
import AddTodoCard from "../../components/AddTodoCard";
import { revalidateTag } from "next/cache";
import { getTranslations } from "next-intl/server";

export default async function AddCard() {
  async function fetchUserData(): Promise<IUser[] | null> {
    const getUserDataResponse: IResponse<IUser[]> =
      await dataService.getAllUsers();
    if (!getUserDataResponse.success) {
      return null;
    }
    return getUserDataResponse.data;
  }

  async function handleAdd(item: ITodo): Promise<IResponse<ITodo>> {
    "use server";
    const addTodoResponse: IResponse<ITodo> = await dataService.addTodo(item);
    if (addTodoResponse.success) {
      revalidateTag("todoData");
    }
    return addTodoResponse;
  }

  const t = await getTranslations();
  const userData: IUser[] | null = await fetchUserData();

  if (!userData) {
    return (
      <p className="text-red-500">{t("Errors.Error in fetching user data")}</p>
    );
  }

  return <AddTodoCard onAddAction={handleAdd} userData={userData} />;
}
