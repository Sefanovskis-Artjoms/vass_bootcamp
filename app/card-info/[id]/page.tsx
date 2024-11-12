"use client";

import { useParams } from "next/navigation";
import TodoCard from "@/app/components/TodoCard";
import dataService from "@/services/dataService";
import { TodoCardInfo } from "@/types";
import { useEffect, useState } from "react";

export default function CardDetailsPage() {
  const { id } = useParams();
  const idString: string = Array.isArray(id) ? id[0] : id;
  const [oneCardData, setOneCardData] = useState<TodoCardInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        if (idString) {
          const todo = await dataService.getTodoById(idString);
          if (todo) {
            setOneCardData(todo);
          } else {
            setError("Todo not found.");
          }
        }
      } catch {
        setError("Failed to fetch Todo data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [idString]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!oneCardData) return <p>Todo not found.</p>;

  return (
    <div>
      <TodoCard information={oneCardData} onDelete={null} hasLink={false} />
    </div>
  );
}
