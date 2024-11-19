"use client";

import dataService from "@/services/dataService";
import { TodoCardInfo } from "@/types";
import AddTodoCard from "../components/AddTodoCard";

export default function AddCard() {
  async function handleAdd(item: TodoCardInfo) {
    await dataService.addTodo(item);
  }
  return <AddTodoCard onAdd={handleAdd} />;
}
