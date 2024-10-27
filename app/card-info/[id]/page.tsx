// The detailed information of a card if just a whole seperate page with one card by itself
// It is a solution made on the basis of non existent requirements for this page
// So a developer went on the path of a least resistance
"use client";
import { useParams } from "next/navigation";
import { useTodo } from "../../../context/TodoContext";
import TodoCard from "../../components/TodoCard";

export default function CardDetailsPage() {
  const { cardData } = useTodo();
  const params = useParams();
  const { id } = params;
  const idNumber = +id;
  const oneCardData = cardData.filter((card) => card.id === idNumber)[0];
  return (
    <div>
      {<TodoCard information={oneCardData} onDelete={null} hasLink={false} />}
    </div>
  );
}
