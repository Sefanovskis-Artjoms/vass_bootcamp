"use client";

import { TrashIcon } from "@heroicons/react/20/solid";
import { IResponse, ITodo } from "@/types";
import { Link } from "@/i18n/routing";
import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";

export default function TodoCard({
  information,
  deleteTodoAction,
}: {
  information: ITodo;
  deleteTodoAction?: (id: string) => Promise<IResponse>;
}) {
  const [isPending, startTransition] = useTransition();
  const [deletingError, setDeletingError] = useState<string | null>(null);
  const t = useTranslations("Pages.ToDoPages");
  const tCommon = useTranslations("Common");

  function handleDelete() {
    startTransition(async () => {
      if (!deleteTodoAction) return;
      const deleteTodoResponse = await deleteTodoAction(information.id);

      if (!deleteTodoResponse.success) {
        setDeletingError(
          t("Errors." + deleteTodoResponse.error.message, {
            default: tCommon(
              "Errors.Unexpected error occurred, please try again later"
            ),
          })
        );
      }
    });
  }

  return (
    <div className="grid grid-cols-[150px_minmax(400px,600px)_120px] w-fit min-h-[150px] bg-gray-200 rounded-md shadow-md border border-slate-500 overflow-hidden">
      <div className="flex flex-col justify-center m-3 border-r-2 border-slate-500">
        <div className="mb-4">
          <label className="text-slate-500 text-sm block mb-[-6px]">
            {t("Status")}:
          </label>
          <div className="text-xl font-semibold text-gray-800">
            {t(information.status)}
          </div>
        </div>
        <div>
          <label className="text-slate-500 text-sm block mb-[-6px]">
            {t("Type")}:
          </label>
          <div className="text-xl font-semibold text-gray-800">
            {t(information.type)}
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col">
        <div>
          <Link href={`/card-info/${information.id}`}>
            <span className="font-bold text-xl text-gray-800">
              {information.title}
            </span>
            <span className="text-sm text-slate-500">
              , {t("created on")}: {information.date}
            </span>
          </Link>
        </div>
        <div className="mt-2 text-gray-700">{information.description}</div>
        {deletingError && <p className="text-red-500 mt-2">{deletingError}</p>}
      </div>
      {deleteTodoAction && (
        <button
          className="flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-100 transition-colors duration-300"
          onClick={handleDelete}
          disabled={isPending}
        >
          <span className="text-md font-semibold">
            {isPending ? tCommon("Deleting") : tCommon("Delete")}
          </span>
          <TrashIcon className="h-7 w-7 mr-1" />
        </button>
      )}
    </div>
  );
}
