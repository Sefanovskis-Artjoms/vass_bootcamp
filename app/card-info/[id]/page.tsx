// The detailed information of a card if just a whole seperate page with one card by itself
// It is a solution made on the basis of non existent requirements for this page
// So a developer went on the path of a least resistance
"use client";
import { useParams } from "next/navigation";
import TodoCard from "@/app/components/TodoCard";
import dataService from "@/services/dataService";
import { TodoCardInfo } from "@/types";

export default function CardDetailsPage() {
  const params = useParams();
  const { id } = params;
  const oneCardData = dataService
    .getData()
    .filter((card: TodoCardInfo) => card.id === id)[0];
  return (
    <div>
      <TodoCard information={oneCardData} onDelete={null} hasLink={false} />
    </div>
  );
}
