"use client";
import { TodoCardInfo } from "@/types";
import dataService from "@/services/dataService";
import TodoCard from "./components/TodoCard";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [cardData, setCardData] = useState<TodoCardInfo[]>([]);

  useEffect(() => {
    setCardData(dataService.getData());
  }, []);

  function handleDelete(id: string) {
    dataService.deleteData(id);
    setCardData(dataService.getData());
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
