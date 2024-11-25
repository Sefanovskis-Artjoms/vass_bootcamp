"use client";

import { useParams } from "next/navigation";
import TodoDetails from "@/app/components/TodoDetails";
import dataService from "@/services/dataService";
import { ITodo, IUser } from "@/types";
import { useEffect, useState } from "react";

export default function CardDetailsPage() {
  const { id } = useParams();
  const idString: string = typeof id === "string" ? id : id[0];
  const [oneTodoData, setOneTodoData] = useState<ITodo | null>(null);
  const [userData, setUserData] = useState<IUser[]>([]);
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
      } catch (error) {
        console.error(error);
        setError("Failed to fetch Todo data. Please try again later.");
      }
    }
    fetchData();
  }, [idString]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await dataService.getAllUsers();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, []);

  const handleEdit = async (updatedTodo: ITodo) => {
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
      <TodoDetails
        information={oneTodoData}
        onEdit={handleEdit}
        userData={userData}
      />
    </div>
  );
}
