"use client";
import { TrashIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

// Datu struktūra priekš informācijas, kas tiek ielikta todo kartiņās
interface TodoCardProps {
  id: number;
  status: string;
  title: string;
  description: string;
  date: string;
  type: string;
}

// Testa objekti
const testData: TodoCardProps[] = [
  {
    id: 1,
    status: "Done",
    title: "HI",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione praesentium vel beatae quis? Vero non minus omnis enim quae, modi, iste mollitia harum beatae earum quisquam veniam eum! Ut, repellendus.",
    date: "12/24/0000",
    type: "Activity",
  },
  {
    id: 2,
    status: "In progress",
    title: "Build UI",
    description: "Working on UI components",
    date: "12/25/0000",
    type: "Task",
  },
  {
    id: 3,
    status: "To do",
    title: "Write Documentation",
    description: "Pending documentation work",
    date: "12/26/0000",
    type: "Task",
  },
];

export default function Home() {
  const [cardData, setCardData] = useState<TodoCardProps[]>(testData);

  // Pure or impure function, thats the question
  function handleDelete(id: number) {
    const newData = cardData.filter((cardInfo) => cardInfo.id !== id);
    setCardData(newData);
  }
  function handleAdd(item: TodoCardProps) {
    const newData = [item, ...cardData];
    setCardData(newData);
  }

  return (
    <div>
      <AddTodoCard onAdd={handleAdd} />
      <ul className="space-y-4">
        {cardData.map((card) => (
          <li key={card.id}>
            <TodoCard information={card} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// TodoCard Componente
function TodoCard({
  information,
  onDelete,
}: {
  information: TodoCardProps;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="grid grid-cols-[150px_minmax(400px,600px)_120px] w-fit min-h-[150px] bg-gray-200 rounded-md shadow-md border border-slate-500 overflow-hidden">
      <div className="flex flex-col justify-center m-3 border-r-2 border-slate-500">
        <div className="mb-4">
          <label className="text-slate-500 text-sm block mb-[-6px]">
            Status:
          </label>
          <div className="text-xl font-semibold text-gray-800">
            {information.status}
          </div>
        </div>
        <div>
          <label className="text-slate-500 text-sm block mb-[-6px]">
            Type:
          </label>
          <div className="text-xl font-semibold text-gray-800">
            {information.type}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div>
          <span className="font-bold text-xl text-gray-800">
            {information.title}
          </span>
          <span className="text-sm text-slate-500">
            , created on: {information.date}
          </span>
        </div>
        <div className="mt-2 text-gray-700">{information.description}</div>
      </div>

      <button
        className="flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-100 transition-colors duration-300"
        onClick={() => onDelete(information.id)}
      >
        <TrashIcon className="h-7 w-7 mr-1" />
        <span className="text-md font-semibold">Delete</span>
      </button>
    </div>
  );
}

function AddTodoCard({ onAdd }: { onAdd: (item: TodoCardProps) => void }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("in progress");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Feature");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: TodoCardProps = {
      id: Date.now(), // Ģenerēju id no izveides datuma, vēlāk pēc nepieciešamības to var mainīt
      title,
      status,
      description,
      date: new Date().toLocaleDateString(),
      type,
    };
    console.log(newItem);
    onAdd(newItem);
    // Atiestatu ievadlaukus pēc veiksmīgas pievienošanas
    setTitle("");
    setDescription("");
    setStatus("In progress");
    setType("Feature");
  };

  return (
    <form
      className="grid grid-cols-[200px_minmax(300px,550px)_120px] w-fit min-h-[150px] bg-gray-200 rounded-md shadow-md border border-slate-500 overflow-hidden"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col justify-center mx-3">
        <div className="mb-6">
          <label className="text-slate-800 text-md font-semibold block mb-[-6px]">
            Status:
          </label>
          <select
            name="status"
            id="statusSelect"
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md text-lg font-semibold p-1"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="In progress">In progress</option>
            <option value="Done">Done</option>
            <option value="To do">To do</option>
          </select>
        </div>

        <div>
          <label className="text-slate-800 text-md font-semibold block mb-[-6px]">
            Type:
          </label>
          <select
            name="type"
            id="typeSelect"
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md text-lg font-semibold p-1"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Feature">Feature</option>
            <option value="Bug">Bug</option>
            <option value="Story">Story</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="p-4">
        <div>
          <label
            htmlFor="title"
            className="text-slate-800 text-lg font-semibold block"
          >
            Title:
          </label>
          <input
            name="title"
            type="text"
            id="title"
            className="mt-2 block w-full bg-white border border-gray-300 rounded-md p-1 text-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mt-4">
          <label
            htmlFor="descriptionTextarea"
            className="text-slate-800 text-lg font-semibold block"
          >
            Description:
          </label>
          <textarea
            name="description"
            id="descriptionTextarea"
            className="h-min-150px mt-2 block w-full bg-white border border-gray-300 rounded-md p-1 text-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="flex items-center justify-center font-bold text-slate-400 hover:text-lime-700 hover:bg-gray-300 transition-colors duration-300"
        type="submit"
      >
        <PlusIcon className="h-8 w-8 mr-1" />
        <span className="text-lg">Add</span>
      </button>
    </form>
  );
}
