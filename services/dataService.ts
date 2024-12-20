import { ITodo, IUser, IErrorDetail } from "@/types";

const dataService = {
  async getAllTodos(): Promise<ITodo[]> {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

    const response = await fetch(`${baseUrl}/api/todos`, {
      next: { tags: ["todoData"] },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw responseData.error as IErrorDetail;
    }

    return responseData.data;
  },

  getTodoById: async (id: string): Promise<ITodo | null> => {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

    const response = await fetch(`${baseUrl}/api/todos/${id}`);
    const responseData = await response.json();

    if (!response.ok) {
      throw responseData.error as IErrorDetail;
    }

    return responseData.data;
  },

  async addTodo(newTodo: ITodo): Promise<void> {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

    const response = await fetch(`${baseUrl}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw responseData.error as IErrorDetail;
    }

    return responseData.data;
  },

  async updateTodo(id: string, updatedTodo: Partial<ITodo>): Promise<ITodo> {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

    const response = await fetch(`${baseUrl}/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw responseData.error as IErrorDetail;
    }

    return responseData.data;
  },

  async deleteTodo(id: string): Promise<void> {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

    const response = await fetch(`${baseUrl}/api/todos/${id}`, {
      method: "DELETE",
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw responseData.error as IErrorDetail;
    }

    return responseData.data;
  },

  async getAllUsers(): Promise<IUser[]> {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

    const response = await fetch(`${baseUrl}/api/users`);
    const responseData = await response.json();

    if (!response.ok) {
      throw responseData.error as IErrorDetail;
    }

    return responseData.data;
  },

  async getUserDetails(userId: string): Promise<IUser> {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

    const response = await fetch(`${baseUrl}/api/users/${userId}`);
    const responseData = await response.json();

    if (!response.ok) {
      throw responseData.error as IErrorDetail;
    }

    return responseData.data;
  },
};

export default dataService;
