// This file is a temporary solution in order to keep the same data in the same state across different pages

"use client";
import React, { createContext, useState, useContext } from "react";
import { TodoCardInfo } from "../types";

interface TodoCardContext {
  cardData: TodoCardInfo[];
  setCardData: React.Dispatch<React.SetStateAction<TodoCardInfo[]>>;
}

const TodoContext = createContext<TodoCardContext | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [cardData, setCardData] = useState<TodoCardInfo[]>([
    {
      id: "1",
      status: "Done",
      title: "HI",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit...",
      date: "12/24/0000",
      type: "Activity",
    },
    {
      id: "2",
      status: "In progress",
      title: "Build UI",
      description: "Working on UI components",
      date: "12/25/0000",
      type: "Task",
    },
    {
      id: "3",
      status: "To do",
      title: "Write Documentation",
      description: "Pending documentation work",
      date: "12/26/0000",
      type: "Task",
    },
  ]);

  return (
    <TodoContext.Provider value={{ cardData, setCardData }}>
      {children}
    </TodoContext.Provider>
  );
};

// Creating a custom hook that will be used in place of a useState so I could work with test data
export function useTodo() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }

  return context;
}
