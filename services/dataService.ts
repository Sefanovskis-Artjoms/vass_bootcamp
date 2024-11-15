import { TodoCardInfo } from "@/types";

const dataService = {
  async getData(): Promise<TodoCardInfo[]> {
    const response = await fetch("api/todos");
    const todoData = await response.json();
    return todoData.data;
  },

  getTodoById: async (id: string): Promise<TodoCardInfo | null> => {
    const response = await fetch(`/api/todos/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch the todo item");
    }
    const data = await response.json();
    return data.data;
  },

  async addData(newTodo: TodoCardInfo): Promise<void> {
    await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
  },

  async updateTodo(
    id: string,
    updatedTodo: Partial<TodoCardInfo>
  ): Promise<TodoCardInfo> {
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

  async deleteData(id: string): Promise<void> {
    await fetch(`api/todos/${id}`, {
      method: "DELETE",
    });
  },
};

export default dataService;
