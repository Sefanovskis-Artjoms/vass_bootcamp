import { ITodo, IUser, IResponse } from "@/types";

const dataService = {
  async getAllTodos(): Promise<IResponse<ITodo[]>> {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

    const response = await fetch(`${baseUrl}/api/todos`, {
      next: { tags: ["todoData"] },
    });

    const responseData: IResponse<ITodo[]> = await response.json();
    return responseData;
  },

  getTodoById: async (id: string): Promise<IResponse<ITodo>> => {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";
    const response = await fetch(`${baseUrl}/api/todos/${id}`);
    const responseData: IResponse<ITodo> = await response.json();

    return responseData;
  },

  async addTodo(newTodo: ITodo): Promise<IResponse<ITodo>> {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

    const response = await fetch(`${baseUrl}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    const responseData: IResponse<ITodo> = await response.json();

    return responseData;
  },

  async updateTodo(
    id: string,
    updatedTodo: Partial<ITodo>
  ): Promise<IResponse<ITodo>> {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

    const response = await fetch(`${baseUrl}/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    });

    const responseData: IResponse<ITodo> = await response.json();

    return responseData;
  },

  async deleteTodo(id: string): Promise<IResponse> {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

    const response = await fetch(`${baseUrl}/api/todos/${id}`, {
      method: "DELETE",
    });

    const responseData: IResponse = await response.json();

    return responseData;
  },

  async addUser(newUser: IUser): Promise<IResponse<IUser>> {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

    const response = await fetch(`${baseUrl}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const responseData: IResponse<IUser> = await response.json();

    return responseData;
  },

  async getAllUsers(): Promise<IResponse<IUser[]>> {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

    const response = await fetch(`${baseUrl}/api/users`, {
      next: { tags: ["userData"] },
    });
    const responseData: IResponse<IUser[]> = await response.json();

    return responseData;
  },

  async getUserDetails(userId: string): Promise<IResponse<IUser>> {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

    const response = await fetch(`${baseUrl}/api/users/${userId}`);
    const responseData: IResponse<IUser> = await response.json();

    return responseData;
  },

  async updateUser(updatedUser: Partial<IUser>): Promise<IResponse<IUser>> {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

    const response = await fetch(`${baseUrl}/api/users/${updatedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    const responseData: IResponse<IUser> = await response.json();

    return responseData;
  },

  async isUsernameUnique(
    username: string
  ): Promise<IResponse<{ isUnique: boolean }>> {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

    const response = await fetch(
      `${baseUrl}/api/users/is-username-unique/${username}`
    );
    const responseData: IResponse<{ isUnique: boolean }> =
      await response.json();

    return responseData;
  },
};

export default dataService;
