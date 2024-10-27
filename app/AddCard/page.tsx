"use client";

import { TodoCardInfoStructure } from "../../types";
import AddTodoCard from "../components/AddTodoCard";
import { useTodo } from "../../context/TodoContext";

export default function AddCard() {
  const { cardData, setCardData } = useTodo();

  function handleAdd(item: TodoCardInfoStructure) {
    setCardData([item, ...cardData]);
  }

  return <AddTodoCard onAdd={handleAdd} />;
}
