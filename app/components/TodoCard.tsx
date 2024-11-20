import { TrashIcon } from "@heroicons/react/20/solid";
import { TodoCardInfo } from "@/types";
import Link from "next/link";

export default function TodoCard({
  information,
  onDelete,
}: {
  information: TodoCardInfo;
  onDelete: (id: string) => void;
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
          <Link href={`/card-info/${information.id}`}>
            <span className="font-bold text-xl text-gray-800">
              {information.title}
            </span>
            <span className="text-sm text-slate-500">
              , created on: {information.date}
            </span>
          </Link>
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
