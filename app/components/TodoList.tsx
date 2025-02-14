"use client";
import { IResponse, ITodo } from "@/types";
import TodoCard from "../components/TodoCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function TodoList({
  todoData,
  deleteTodo,
}: {
  todoData: ITodo[];
  deleteTodo?: (id: string) => Promise<IResponse>;
}) {
  const { searchQuery, sortOrder, filterTypes, filterStatuses } = useSelector(
    (state: RootState) => state.todoSearch
  );

  let filteredData = todoData.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filterTypes.length > 0) {
    filteredData = filteredData.filter((todo) =>
      filterTypes.includes(todo.type)
    );
  }

  if (filterStatuses.length > 0) {
    filteredData = filteredData.filter((todo) =>
      filterStatuses.includes(todo.status)
    );
  }

  filteredData.sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split(".");
    const [dayB, monthB, yearB] = b.date.split(".");

    const timeA = new Date(+yearA, +monthA - 1, +dayA).getTime();
    const timeB = new Date(+yearB, +monthB - 1, +dayB).getTime();

    return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
  });

  return (
    <ul className="space-y-4">
      {filteredData.map((card: ITodo) => (
        <li key={card.id}>
          <TodoCard information={card} deleteTodoAction={deleteTodo} />
        </li>
      ))}
    </ul>
  );
}
