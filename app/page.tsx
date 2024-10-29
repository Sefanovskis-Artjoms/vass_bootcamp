"use client";
import { TodoCardInfo } from "../types";
import { useTodo } from "../context/TodoContext";
import TodoCard from "./components/TodoCard";

export default function HomePage() {
  const { cardData, setCardData } = useTodo();

  function handleDelete(id: string) {
    const newData = cardData.filter((card: TodoCardInfo) => card.id !== id);
    setCardData(newData);
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
