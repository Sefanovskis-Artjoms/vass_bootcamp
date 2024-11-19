"use client";

import { useParams } from "next/navigation";
import TodoDetails from "@/app/components/TodoDetails";
import dataService from "@/services/dataService";
import { TodoCardInfo } from "@/types";
import { useEffect, useState } from "react";

export default function CardDetailsPage() {
  const { id } = useParams();
  const idString: string = typeof id === "string" ? id : id[0];
  const [oneTodoData, setOneTodoData] = useState<TodoCardInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setError(null);
      try {
        if (idString) {
          const todo = await dataService.getTodoById(idString);
          if (todo) {
            setOneTodoData(todo);
          } else {
            setError("Todo not found.");
          }
        }
      } catch (e) {
        console.error(e);
        setError("Failed to fetch Todo data. Please try again later.");
      }
    }
    fetchData();
  }, [idString]);

  const handleEdit = async (updatedTodo: TodoCardInfo) => {
    setError(null);
    try {
      const updated = await dataService.updateTodo(idString, updatedTodo);
      if (typeof updated !== "undefined") {
        setOneTodoData(updated);
      } else {
        setError("Failed to update Todo.");
      }
    } catch (e) {
      console.error(e);
      setError("Failed to update Todo data. Please try again later.");
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!oneTodoData) return <p>Loading...</p>;

  return (
    <div>
      <TodoDetails information={oneTodoData} onEdit={handleEdit} />
    </div>
  );
}
