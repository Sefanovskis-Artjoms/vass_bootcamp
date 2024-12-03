import dataService from "@/services/dataService";
import { ITodo } from "@/types";
import AddTodoCard from "../components/AddTodoCard";
import { revalidateTag } from "next/cache";

export default async function AddCard() {
  const fetchUserData = async () => {
    try {
      const userData = await dataService.getAllUsers();
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  async function handleAdd(item: ITodo) {
    "use server";
    await dataService.addTodo(item);
    revalidateTag("todoData");
  }

  const userData = await fetchUserData();

  if (!userData)
    return <p className="text-red-500">Error in fetching user data</p>;

  return <AddTodoCard onAddAction={handleAdd} userData={userData} />;
}
