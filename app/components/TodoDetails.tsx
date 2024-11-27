"use client";

import { ITodo, IUser } from "@/types";
import {
  PencilSquareIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function TodoDetails({
  information,
  onEditAction,
  userData,
}: {
  information: ITodo;
  onEditAction: (
    updatedTodo: ITodo
  ) => Promise<{ success: boolean; updatedTodo?: ITodo; error?: string }>;
  userData: IUser[];
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

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

  const onSubmit = async (editedInformation: ITodo) => {
    const result = await onEditAction(editedInformation);
    if (!result.success) {
      setUpdateError("There was an issue while updating the todo.");
      return;
    }

    setUpdateError(null);
    setIsEditing(false);
  };

  const assignedUser = userData?.find(
    (user) => user.id === information.assignedTo
  );

  const assignedTo: string = !assignedUser
    ? "UNASSIGNED"
    : `${assignedUser.name} ${assignedUser.surname} (${assignedUser.username})`;

  // Component is basically split into two parts: one for viewing and one for editing
  // This is made for readability
  if (!isEditing) {
    return (
      <div className="grid grid-cols-[160px_minmax(400px,600px)_120px] w-fit min-h-[150px] bg-gray-200 rounded-md shadow-md border border-slate-500 overflow-hidden">
        <div className="flex flex-col justify-center m-3 border-r-2 border-slate-500">
          <div className="mb-4">
            <label className="text-slate-500 text-sm block ">Status:</label>
            <div className="text-xl font-semibold text-gray-800">
              {information.status}
            </div>
          </div>
          <div>
            <label className="text-slate-500 text-sm block">Type:</label>
            <div className="text-xl font-semibold text-gray-800">
              {information.type}
            </div>
          </div>
        </div>

        <div className="p-4 flex flex-col">
          <div className="mb-2">
            <span className="font-bold text-xl text-gray-800">
              {information.title}
            </span>
            <span className="text-sm text-slate-500">
              , created on: {information.date}
            </span>
          </div>

          <div className="mb-4 text-gray-700">{information.description}</div>

          <div className="mt-auto">
            <span className="text-sm text-slate-500">Assigned to: </span>
            <span className="text-gray-900">{assignedTo}</span>
          </div>
        </div>

        <button
          className="flex items-center justify-center text-slate-400 hover:text-orange-600 hover:bg-gray-300 transition-colors duration-300"
          onClick={() => setIsEditing(true)}
        >
          <PencilSquareIcon className="h-7 w-7 mr-1" />
          <span className="text-md font-semibold">Edit</span>
        </button>
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-[160px_minmax(400px,600px)_120px] w-fit min-h-[150px] bg-gray-200 rounded-md shadow-md border border-slate-500 overflow-hidden">
        <div className="flex flex-col justify-center m-3 border-r-2 border-slate-500">
          <div className="mb-4">
            <label className="text-slate-500 text-sm block ">Status:</label>
            <select
              {...register("status")}
              className="text-xl font-semibold text-gray-800 bg-transparent border rounded border-gray-500"
            >
              <option value="In progress">In progress</option>
              <option value="Done">Done</option>
              <option value="To do">To do</option>
            </select>
          </div>
          <div>
            <label className="text-slate-500 text-sm block">Type:</label>

            <select
              {...register("type")}
              className="text-xl font-semibold text-gray-800 bg-transparent border rounded border-gray-500"
            >
              <option value="Feature">Feature</option>
              <option value="Bug">Bug</option>
              <option value="Story">Story</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="p-4 flex flex-col">
          <div className="mb-2">
            <span className="font-bold text-xl text-gray-800">
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className={`p-1 text-xl font-semibold bg-transparent border rounded border-gray-500
                    ${errors.title ? "border-red-500" : "border-gray-300"}`}
              />
            </span>
            <span className="text-sm text-slate-500">
              , created on: {information.date}
            </span>
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="mb-4 text-gray-700">
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className={`p-1 text-md bg-transparent border rounded border-gray-500 min-w-full min-h-[150px] 
                   ${
                     errors.description ? "border-red-500" : "border-gray-300"
                   }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="mt-auto">
            <span className="text-sm text-slate-500">Assigned to: </span>
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
          </div>
          {updateError && <p className="text-red-500 mt-2">{updateError}</p>}
        </div>
        <button
          className="flex items-center justify-center text-slate-400 hover:text-lime-700 hover:bg-gray-300 transition-colors duration-300"
          onClick={handleSubmit(onSubmit)}
        >
          <ClipboardDocumentCheckIcon className="h-7 w-7 mr-1" />
          <span className="text-md font-semibold">Save</span>
        </button>
      </div>
    );
  }
}
