"use client";

import dataService from "@/services/dataService";
import { ITodo, IUser } from "@/types";
import AddTodoCard from "../components/AddTodoCard";
import { useEffect, useState } from "react";

export default function AddCard() {
  const [userData, setUserData] = useState<IUser[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await dataService.getAllUsers();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again later.");
      }
    }
    fetchUserData();
  }, []);

  async function handleAdd(item: ITodo) {
    await dataService.addTodo(item);
  }

  if (error) return <p className="text-red-500">{error}</p>;
  return <AddTodoCard onAdd={handleAdd} userData={userData} />;
}
