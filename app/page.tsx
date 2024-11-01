"use client";
import { TodoCardInfo } from "../types";
import dataService from "../services/dataService";
import TodoCard from "./components/TodoCard";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [cardData, setCardData] = useState<TodoCardInfo[]>([]);

  // useEffect(() => {
  //   setCardData(dataService.getData());
  // }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      // try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      console.log(data);
      // setCardData(data);
      // } catch (err) {
      //   setError(err.message);
      // } finally {
      //   setLoading(false);
      // }
    };

    fetchTodos();
  }, []);
  function handleDelete(id: string) {
    dataService.deleteData(id);
    setCardData(dataService.getData());
  }

  return (
    <div>
      <ul className="space-y-4">
        {cardData.map((card: TodoCardInfo) => (
          <li key={card.id}>
            <TodoCard
              information={card}
              onDelete={handleDelete}
              hasLink={true}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
