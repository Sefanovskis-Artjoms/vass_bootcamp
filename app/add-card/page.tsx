"use client";

import dataService from "@/services/dataService";
import { ITodo } from "@/types";
import AddTodoCard from "../components/AddTodoCard";

export default function AddCard() {
  async function handleAdd(item: ITodo) {
    await dataService.addTodo(item);
  }
  return <AddTodoCard onAdd={handleAdd} />;
}
