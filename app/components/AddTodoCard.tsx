"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { TodoFormInputs, ITodo, IUser, IResponse } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export default function AddTodoCard({
  onAddAction,
  userData,
}: {
  onAddAction: (item: ITodo) => Promise<IResponse<ITodo>>;
  userData: IUser[];
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      status: "In progress",
      type: "Feature",
      title: "",
      description: "",
      assignedTo: "UNASSIGNED",
    },
  });
  const [formError, setFormError] = useState<string | null>(null);

  const onFormSubmit = async (data: TodoFormInputs) => {
    const newItem: ITodo = {
      id: uuidv4(),
      ...data,
      date: new Date().toLocaleDateString(),
    };

    const addActionResponse = await onAddAction(newItem);
    if (!addActionResponse.success) {
      setFormError(addActionResponse.error.message);
      return;
    }
    reset();
    setFormError(null);
  };

  return (
    <form
      className="grid grid-cols-[200px_minmax(300px,550px)_120px] w-fit min-h-max bg-gray-200 rounded-md shadow-md border border-slate-500 overflow-hidden"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <div className="flex flex-col justify-center mx-3 my-10">
        <div className="mb-6">
          <label className="text-slate-800 text-md font-semibold block mb-[-6px]">
            Status:
          </label>
          <select
            {...register("status")}
            id="statusSelect"
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md text-lg font-semibold p-1"
          >
            <option value="In progress">In progress</option>
            <option value="Done">Done</option>
            <option value="To do">To do</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="text-slate-800 text-md font-semibold block mb-[-6px]">
            Type:
          </label>
          <select
            {...register("type")}
            id="typeSelect"
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md text-lg font-semibold p-1"
          >
            <option value="Feature">Feature</option>
            <option value="Bug">Bug</option>
            <option value="Story">Story</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="text-slate-800 text-md font-semibold block mb-[-6px]">
            Assign to:
          </label>
          <select
            {...register("assignedTo")}
            id="assignToSelect"
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md text-lg font-semibold p-1"
          >
            <option value="UNASSIGNED">UNASSIGNED</option>
            {userData.length === 0 ? (
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
            {...register("title", { required: "Please fill in the title" })}
            id="title"
            className={`mt-2 block w-full bg-white border rounded-md p-1 text-md ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="mt-4">
          <label
            htmlFor="descriptionTextarea"
            className="text-slate-800 text-lg font-semibold block"
          >
            Description:
          </label>
          <textarea
            {...register("description", {
              required: "Please fill in the description",
            })}
            id="descriptionTextarea"
            className={`min-h-[150px] mt-2 block w-full bg-white border rounded-md p-1 text-md ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        {formError && <p className="text-red-500 mt-2">{formError}</p>}
      </div>

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
