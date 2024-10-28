"use client";

import { TodoCardInfo } from "../../types";
import AddTodoCard from "../components/AddTodoCard";
import { useTodo } from "../../context/TodoContext";

export default function AddCard() {
  const { cardData, setCardData } = useTodo();

  function handleAdd(item: TodoCardInfo) {
    setCardData([item, ...cardData]);
  }

  return <AddTodoCard onAdd={handleAdd} />;
}
