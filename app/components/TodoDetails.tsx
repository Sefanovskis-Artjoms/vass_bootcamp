"use client";

import { IGroup, IResponse, ITodo, IUser } from "@/types";
import {
  PencilSquareIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

export default function TodoDetails({
  information,
  onEditAction,
  userData,
  userRole,
  groupData,
}: {
  information: ITodo;
  onEditAction?: (updatedTodo: ITodo) => Promise<IResponse<ITodo>>;
  userData: IUser[];
  userRole?: string;
  groupData: IGroup[];
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [assignedToUser, setAssignedToUser] = useState<boolean>(
    information.assignedTo.type === "user"
  );
  const t = useTranslations("Pages.ToDoPages");
  const tCommon = useTranslations("Common");
  const assignedTo: string = getAssignedToString();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ITodo>({
    defaultValues: {
      title: information.title,
      description: information.description,
      status: information.status,
      type: information.type,
      assignedTo: {
        type: information.assignedTo.type,
        id: information.assignedTo.id,
      },
    },
  });

  async function onSubmit(editedInformation: ITodo) {
    if (!onEditAction) return;
    const editTodoResponse: IResponse<ITodo> = await onEditAction({
      ...editedInformation,
      id: information.id,
    });

    if (editTodoResponse.success) {
      setIsEditing(false);
      setUpdateError(null);
      return;
    }
    setUpdateError(
      t("Errors." + editTodoResponse.error.message, {
        default: tCommon(
          "Errors.Unexpected error occurred, please try again later"
        ),
      })
    );
  }

  function handleAssignedToChange() {
    setAssignedToUser((prev) => {
      const newAssignedToUser = !prev;
      setValue("assignedTo.type", newAssignedToUser ? "user" : "group");
      return newAssignedToUser;
    });
  }

  function getAssignedToString() {
    if (information.assignedTo.type === "user") {
      const assignedUser = userData?.find(
        (user) => user.id === information.assignedTo.id
      );

      return !assignedUser
        ? t("Unassigned")
        : `${assignedUser.name} ${assignedUser.surname} (${assignedUser.username})`;
    }
    const assignedGroup = groupData?.find(
      (group) => group.id === information.assignedTo.id
    );
    return !assignedGroup ? t("Unassigned") : `Group - ${assignedGroup.name}`;
  }

  // For readibility component split into three parts: view state, full edit state(for admins), limited edit state(for managers)
  // Not sure if this is the best approach as it completely ignores DRY principle, but at least it's readable
  if (!isEditing) {
    return (
      <div className="grid grid-cols-[160px_minmax(400px,600px)_160px] w-fit min-h-[150px] bg-gray-200 rounded-md shadow-md border border-slate-500 overflow-hidden">
        <div className="flex flex-col justify-center m-3 border-r-2 border-slate-500">
          <div className="mb-4">
            <label className="text-slate-500 text-sm block ">
              {t("Status")}:
            </label>
            <div className="text-xl font-semibold text-gray-800">
              {t(`${information.status}`)}
            </div>
          </div>
          <div>
            <label className="text-slate-500 text-sm block">{t("Type")}:</label>
            <div className="text-xl font-semibold text-gray-800">
              {t(information.type)}
            </div>
          </div>
        </div>

        <div className="p-4 flex flex-col">
          <div className="mb-2">
            <span className="font-bold text-xl text-gray-800">
              {information.title}
            </span>
            <span className="text-sm text-slate-500">
              , {t("created on")}: {information.date}
            </span>
          </div>

          <div className="mb-4 text-gray-700">{information.description}</div>

          <div className="mt-auto">
            <span className="text-sm text-slate-500">{t("Assigned to")}: </span>
            <span className="text-gray-900">{assignedTo}</span>
          </div>
        </div>

        {onEditAction && (
          <button
            className="flex items-center justify-center text-slate-400 hover:text-orange-600 hover:bg-gray-300 transition-colors duration-300"
            onClick={() => setIsEditing(true)}
          >
            <PencilSquareIcon className="h-7 w-7 mr-1" />
            <span className="text-md font-semibold">{tCommon("Edit")}</span>
          </button>
        )}
      </div>
    );
  }
  if (userRole === "Admin") {
    return (
      <div className="grid grid-cols-[160px_minmax(400px,600px)_120px] w-fit min-h-[150px] bg-gray-200 rounded-md shadow-md border border-slate-500 overflow-hidden">
        <div className="flex flex-col justify-center m-3 border-r-2 border-slate-500">
          <div className="mb-4">
            <label className="text-slate-500 text-sm block ">
              {t("Status")}:
            </label>
            <select
              {...register("status")}
              className="text-xl font-semibold text-gray-800 bg-transparent border rounded border-gray-500"
            >
              <option value="In progress">{t("In progress")}</option>
              <option value="Done">{t("Done")}</option>
              <option value="To do">{t("To do")}</option>
            </select>
          </div>
          <div>
            <label className="text-slate-500 text-sm block">{t("Type")}:</label>

            <select
              {...register("type")}
              className="text-xl font-semibold text-gray-800 bg-transparent border rounded border-gray-500"
            >
              <option value="Feature">{t("Feature")}</option>
              <option value="Bug">{t("Bug")}</option>
              <option value="Story">{t("Story")}</option>
              <option value="Other">{t("Other")}</option>
            </select>
          </div>
        </div>

        <div className="p-4 flex flex-col">
          <div className="mb-2">
            <span className="font-bold text-xl text-gray-800">
              <input
                type="text"
                {...register("title", {
                  required: t("Form Messages.Title required"),
                })}
                className={`p-1 text-xl font-semibold bg-transparent border rounded border-gray-500
                    ${errors.title ? "border-red-500" : "border-gray-300"}`}
              />
            </span>
            <span className="text-sm text-slate-500">
              , {t("created on")}: {information.date}
            </span>
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="mb-4 text-gray-700">
            <textarea
              {...register("description", {
                required: t("Form Messages.Description required"),
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
            <div className="flex items-center gap-4 mb-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={assignedToUser}
                  onChange={handleAssignedToChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-100 border border-gray-400 rounded-full peer after:content-[''] after:absolute after:top-1 after:left-1.5 after:bg-gray-600 after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
              <span className="text-md text-slate-800">
                {t("Assign to")}: {assignedToUser ? t("to User") : t("Group")}
              </span>
            </div>
            {assignedToUser ? (
              <select
                {...register("assignedTo.id")}
                id="assignToSelect"
                className="block w-full bg-white border border-gray-300 rounded-md text-lg font-semibold p-1"
              >
                <option value="UNASSIGNED">{t("Unassigned")}</option>
                {userData.length === 0 ? (
                  <option disabled> {t("Loading users")} </option>
                ) : (
                  userData.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} {user.surname} ({user.username})
                    </option>
                  ))
                )}
              </select>
            ) : (
              <select
                {...register("assignedTo.id")}
                id="assignToSelect"
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md text-lg font-semibold p-1"
              >
                <option value="UNASSIGNED">{t("Unassigned")}</option>
                {groupData.length === 0 ? (
                  <option disabled> {t("Loading users")} </option>
                ) : (
                  groupData.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))
                )}
              </select>
            )}
          </div>
          {updateError && <p className="text-red-500 mt-2">{updateError}</p>}
        </div>
        <button
          className="flex items-center justify-center text-slate-400 hover:text-lime-700 hover:bg-gray-300 transition-colors duration-300"
          onClick={handleSubmit(onSubmit)}
        >
          <ClipboardDocumentCheckIcon className="h-7 w-7 mr-1" />
          <span className="text-md font-semibold">{tCommon("Save")}</span>
        </button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-[160px_minmax(400px,600px)_120px] w-fit min-h-[150px] bg-gray-200 rounded-md shadow-md border border-slate-500 overflow-hidden">
      <div className="flex flex-col justify-center m-3 border-r-2 border-slate-500">
        <div className="mb-4">
          <label className="text-slate-500 text-sm block ">
            {t("Status")}:
          </label>
          <div className="text-xl font-semibold text-gray-800">
            {t(information.status)}
          </div>
        </div>
        <div>
          <label className="text-slate-500 text-sm block">{t("Type")}:</label>
          <div className="text-xl font-semibold text-gray-800">
            {t(information.type)}
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col">
        <div className="mb-2">
          <span className="font-bold text-xl text-gray-800">
            {information.title}
          </span>
          <span className="text-sm text-slate-500">
            , {t("created on")}: {information.date}
          </span>
        </div>
        <div className="mb-4 text-gray-700">{information.description}</div>

        <div className="mt-auto">
          <div className="flex items-center gap-4 mb-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={assignedToUser}
                onChange={handleAssignedToChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-100 border border-gray-400 rounded-full peer after:content-[''] after:absolute after:top-1 after:left-1.5 after:bg-gray-600 after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
            <span className="text-md text-slate-800">
              {t("Assign to")}: {assignedToUser ? t("to User") : t("to Group")}
            </span>
          </div>
          {assignedToUser ? (
            <select
              {...register("assignedTo.id")}
              id="assignToSelect"
              className="block w-full bg-white border border-gray-300 rounded-md text-lg font-semibold p-1"
            >
              <option value="UNASSIGNED">{t("Unassigned")}</option>
              {userData.length === 0 ? (
                <option disabled> {t("Loading users")} </option>
              ) : (
                userData.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} {user.surname} ({user.username})
                  </option>
                ))
              )}
            </select>
          ) : (
            <select
              {...register("assignedTo.id")}
              id="assignToSelect"
              className="mt-1 block w-full bg-white border border-gray-300 rounded-md text-lg font-semibold p-1"
            >
              <option value="UNASSIGNED">{t("Unassigned")}</option>
              {groupData.length === 0 ? (
                <option disabled> {t("Loading users")} </option>
              ) : (
                groupData.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))
              )}
            </select>
          )}
        </div>
        {updateError && <p className="text-red-500 mt-2">{updateError}</p>}
      </div>
      <button
        className="flex items-center justify-center text-slate-400 hover:text-lime-700 hover:bg-gray-300 transition-colors duration-300"
        onClick={handleSubmit(onSubmit)}
      >
        <ClipboardDocumentCheckIcon className="h-7 w-7 mr-1" />
        <span className="text-md font-semibold">{tCommon("Save")}</span>
      </button>
    </div>
  );
}
