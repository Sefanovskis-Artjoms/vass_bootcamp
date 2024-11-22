import dataService from "@/services/dataService";
import { ITodo, IUser } from "@/types";
import {
  PencilSquareIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function TodoDetails({
  information,
  onEdit,
}: {
  information: ITodo;
  onEdit: (updatedTodo: ITodo) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<IUser[] | null>(null);
  const [assignedTo, setAssignedTo] = useState<string>("");

  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await dataService.getAllUsers();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    const assignedUser = userData?.find(
      (user) => user.id === information.assignedTo
    );
    if (!assignedUser) {
      setAssignedTo("UNASSIGNED");
      return;
    }
    setAssignedTo(
      `${assignedUser.name} ${assignedUser.surname} (${assignedUser.username})`
    );
  }, [userData, information.assignedTo]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITodo>({
    defaultValues: {
      title: information.title,
      description: information.description,
      status: information.status,
      type: information.type,
      assignedTo: information.assignedTo,
    },
  });

  const onSubmit = (editedInformation: ITodo) => {
    onEdit(editedInformation);
    setIsEditing(false);
  };

  return (
    <div className="grid grid-cols-[160px_minmax(400px,600px)_120px] w-fit min-h-[150px] bg-gray-200 rounded-md shadow-md border border-slate-500 overflow-hidden">
      <div className="flex flex-col justify-center m-3 border-r-2 border-slate-500">
        <div className="mb-4">
          <label className="text-slate-500 text-sm block ">Status:</label>
          {isEditing ? (
            <select
              {...register("status")}
              className="text-xl font-semibold text-gray-800 bg-transparent border rounded border-gray-500"
            >
              <option value="In progress">In progress</option>
              <option value="Done">Done</option>
              <option value="To do">To do</option>
            </select>
          ) : (
            <div className="text-xl font-semibold text-gray-800">
              {information.status}
            </div>
          )}
        </div>
        <div>
          <label className="text-slate-500 text-sm block">Type:</label>
          {isEditing ? (
            <select
              {...register("type")}
              className="text-xl font-semibold text-gray-800 bg-transparent border rounded border-gray-500"
            >
              <option value="Feature">Feature</option>
              <option value="Bug">Bug</option>
              <option value="Story">Story</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <div className="text-xl font-semibold text-gray-800">
              {information.type}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col">
        <div className="mb-2">
          <span className="font-bold text-xl text-gray-800">
            {isEditing ? (
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className={`p-1 text-xl font-semibold bg-transparent border rounded border-gray-500
                  ${errors.title ? "border-red-500" : "border-gray-300"}`}
              />
            ) : (
              information.title
            )}
          </span>
          <span className="text-sm text-slate-500">
            , created on: {information.date}
          </span>
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div className="mb-4 text-gray-700">
          {isEditing ? (
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className={`p-1 text-md bg-transparent border rounded border-gray-500 min-w-full min-h-[150px] 
                 ${errors.description ? "border-red-500" : "border-gray-300"}`}
            />
          ) : (
            information.description
          )}
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="mt-auto">
          <span className="text-sm text-slate-500">Assigned to: </span>
          {isEditing ? (
            <select
              {...register("assignedTo")}
              id="assignToSelect"
              className="block w-full bg-white border border-gray-300 rounded-md text-lg font-semibold p-1"
            >
              <option value="UNASSIGNED">UNASSIGNED</option>
              {userData === null ? (
                <option disabled>Loading users...</option>
              ) : (
                userData.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} {user.surname} ({user.username})
                  </option>
                ))
              )}
            </select>
          ) : (
            <span className="text-gray-900">
              {assignedTo ? assignedTo : "Loading..."}
            </span>
          )}
        </div>
      </div>

      {isEditing ? (
        <button
          className="flex items-center justify-center text-slate-400 hover:text-lime-700 hover:bg-gray-300 transition-colors duration-300"
          onClick={handleSubmit(onSubmit)}
        >
          <ClipboardDocumentCheckIcon className="h-7 w-7 mr-1" />
          <span className="text-md font-semibold">Save</span>
        </button>
      ) : (
        <button
          className="flex items-center justify-center text-slate-400 hover:text-orange-600 hover:bg-gray-300 transition-colors duration-300"
          onClick={() => setIsEditing(true)}
        >
          <PencilSquareIcon className="h-7 w-7 mr-1" />
          <span className="text-md font-semibold">Edit</span>
        </button>
      )}
    </div>
  );
}
