import { ITodo, IUser } from "@/types";

const dataService = {
  async getAllTodos(): Promise<ITodo[]> {
    const response = await fetch("api/todos");
    const todoData = await response.json();
    return todoData.data;
  },

  getTodoById: async (id: string): Promise<ITodo | null> => {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

    const response = await fetch(`${baseUrl}/api/todos/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch the todo item");
    }
    const data = await response.json();
    return data.data;
  },

  async addTodo(newTodo: ITodo): Promise<void> {
    await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
  },

  async updateTodo(id: string, updatedTodo: Partial<ITodo>): Promise<ITodo> {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    });

    if (!response.ok) {
      throw new Error("Failed to update todo");
    }

    const data = await response.json();
    return data.data;
  },

  async deleteTodo(id: string): Promise<void> {
    await fetch(`api/todos/${id}`, {
      method: "DELETE",
    });
  },

  async getAllUsers(): Promise<IUser[]> {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

    const response = await fetch(`${baseUrl}/api/users`);
    const userData = await response.json();
    return userData.data;
  },
};

export default dataService;
