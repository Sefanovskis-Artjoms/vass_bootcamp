"use client";
import { TodoCardInfo } from "@/types";
import dataService from "@/services/dataService";
import TodoCard from "./components/TodoCard";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [cardData, setCardData] = useState<TodoCardInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await dataService.getAllTodos();
        setCardData(data);
      } catch (e) {
        console.error(e);
        setError("Failed to fetch todos. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  async function handleDelete(id: string) {
    await dataService.deleteTodo(id);
    const updatedData = await dataService.getAllTodos();
    setCardData(updatedData);
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <ul className="space-y-4">
        {cardData.map((card: TodoCardInfo) => (
          <li key={card.id}>
            <TodoCard information={card} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
}
