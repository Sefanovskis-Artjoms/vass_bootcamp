"use client";

import dataService from "../../services/dataService";
import { TodoCardInfo } from "../../types";
import AddTodoCard from "../components/AddTodoCard";

export default function AddCard() {
  function handleAdd(item: TodoCardInfo) {
    dataService.addData(item);
  }

  return <AddTodoCard onAdd={handleAdd} />;
}
