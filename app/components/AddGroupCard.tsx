"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { IGroup, IResponse } from "@/types";

export default function AddGroupCard({
  onAddAction,
}: {
  onAddAction: (name: string) => Promise<IResponse<IGroup>>;
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [formError, setFormError] = useState("");
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("Pages.GroupPages");
  const tCommon = useTranslations("Common");

  function handleCancel() {
    setGroupName("");
    setIsCreating(false);
  }

  async function handleCreate() {
    startTransition(async () => {
      if (groupName.trim() === "") {
        setFormError("Please enter a group name");
        return;
      }
      const addGroupResponse = await onAddAction(groupName);
      if (!addGroupResponse.success) {
        setFormError(
          t("Errors.Error occured while creating group, please try again later")
        );
        return;
      }

      setFormError("");
      setGroupName("");
      setIsCreating(false);
    });
  }

  return (
    <>
      {isCreating ? (
        <div className="max-w-3xl mb-4 p-4 bg-gray-200 rounded-md shadow-md border border-slate-500">
          <div className="mb-2 flex items-center space-x-4">
            <input
              type="text"
              placeholder={t("Group name")}
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-md text-lg"
            />
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleCreate}
                className="px-4 py-2 font-bold text-slate-400 border border-slate-400 hover:text-lime-700 hover:border-lime-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                {isPending ? tCommon("Adding") : tCommon("Add")}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 font-bold text-slate-400 border border-slate-400 hover:text-red-500 hover:bg-red-100 hover:border-red-500 rounded-md transition-colors"
              >
                {tCommon("Cancel")}
              </button>
            </div>
          </div>
          {formError && <p className="text-red-500">{formError}</p>}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsCreating(true)}
          className="max-w-3xl w-full mb-4 p-4 flex items-center bg-gray-200 rounded-md shadow-md border border-slate-500 space-x-2 text-lg font-bold text-slate-600 hover:text-lime-700 hover:bg-gray-300 transition-colors"
        >
          <PlusIcon className="h-8 w-8" />
          <span>{t("Create new group")}</span>
        </button>
      )}
    </>
  );
}
