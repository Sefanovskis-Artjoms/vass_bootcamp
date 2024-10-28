// components/AddTodoCard.tsx
import { PlusIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useForm } from "react-hook-form";
import { TodoFormInputs, TodoCardInfo } from "../../types";
import { v4 as uuidv4 } from "uuid";

export default function AddTodoCard({
  onAdd,
}: {
  onAdd: (item: TodoCardInfo) => void;
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
    },
  });

  const onFormSubmit = (data: TodoFormInputs) => {
    const newItem: TodoCardInfo = {
      id: uuidv4(),
      ...data,
      date: new Date().toLocaleDateString(),
    };
    onAdd(newItem);
    reset();
  };

  return (
    <form
      className="grid grid-cols-[200px_minmax(300px,550px)_120px] w-fit min-h-[150px] bg-gray-200 rounded-md shadow-md border border-slate-500 overflow-hidden"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <div className="flex flex-col justify-center mx-3">
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

        <div>
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
            className={`h-min-150px mt-2 block w-full bg-white border rounded-md p-1 text-md ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
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
