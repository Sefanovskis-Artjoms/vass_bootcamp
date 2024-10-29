import { TodoCardInfo } from "../types";

let todoData: TodoCardInfo[] = [
  {
    id: "1",
    status: "Done",
    title: "HI",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit...",
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
];

const dataService = {
  getData: (): TodoCardInfo[] => todoData,

  addData: (newTodo: TodoCardInfo): void => {
    todoData = [newTodo, ...todoData];
  },

  updateData: (id: string, updatedTodo: Partial<TodoCardInfo>): void => {
    todoData = todoData.map((todoItem) =>
      todoItem.id === id ? { ...todoItem, ...updatedTodo } : todoItem
    );
  },

  deleteData: (id: string): void => {
    todoData = todoData.filter((todoItem) => todoItem.id !== id);
  },
};

export default dataService;
