"use client";

import { useState, useTransition } from "react";
import { IGroup, IResponse } from "@/types";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function GroupTable({
  data,
  onDeleteAction,
}: {
  data: IGroup[];
  onDeleteAction: (id: string) => Promise<IResponse>;
}) {
  const { searchQuery } = useSelector((state: RootState) => state.groupSearch);
  const t = useTranslations("Pages.GroupPages");
  const tCommon = useTranslations("Common");

  let filteredData = data;

  if (searchQuery.trim() !== "") {
    const queryLower = searchQuery.toLowerCase();
    filteredData = filteredData.filter((group) => {
      return group.name.toLowerCase().includes(queryLower);
    });
  }

  return (
    <ul className="grid grid-cols-[60px_2fr_4fr_150px_100px] border rounded-md overflow-hidden list-none p-0 border-gray-600 max-w-3xl text-center">
      <li key="header" className="contents font-bold text-gray-900">
        <div className="p-2 bg-gray-400 flex items-center justify-center">
          {t("Nr")}
        </div>
        <div className="p-2 bg-gray-400 flex items-center justify-center">
          {t("User count")}
        </div>
        <div className="p-2 bg-gray-400 flex items-center text-left">
          {t("Name")}
        </div>
        <div className="p-2 bg-gray-400 flex items-center justify-center">
          {t("View details")}
        </div>
        <div className="p-2 bg-gray-400 flex items-center justify-center">
          {tCommon("Delete")}
        </div>
      </li>
      {filteredData.map((group, index) => (
        <GroupRow
          key={group.id}
          group={group}
          index={index}
          onDeleteAction={onDeleteAction}
        />
      ))}
    </ul>
  );
}

function GroupRow({
  group,
  index,
  onDeleteAction,
}: {
  group: IGroup;
  index: number;
  onDeleteAction: (id: string) => Promise<IResponse>;
}) {
  const t = useTranslations("Pages.GroupPages");
  const tCommon = useTranslations("Common");
  const [deleteUser, setDeleteUser] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDeleteClick() {
    if (!deleteUser) {
      setDeleteUser(true);
      return;
    }
    setDeleteUser(false);
  }

  async function handleConfirm(id: string) {
    startTransition(async () => {
      const deleteGroupResponse = await onDeleteAction(id);
      if (!deleteGroupResponse.success) {
        return;
      }
      setDeleteUser(false);
    });
  }

  return (
    <li className="group contents bg-gray-800 font-semibold text-gray-700">
      <div className="p-2 bg-gray-100 flex items-center justify-center">
        {index + 1}
      </div>
      <div className="p-2 bg-gray-100 flex items-center justify-center">
        {group.users.length}
      </div>
      <div className="p-2 bg-gray-100 flex items-center text-left">
        {group.name}
      </div>
      <div className="p-2 bg-gray-100 flex items-center justify-center">
        {deleteUser ? (
          <button
            onClick={() => handleConfirm(group.id)}
            className="w-full h-full px-2 py-1 text-slate-600 border border-slate-600 hover:text-red-500 hover:bg-red-100 hover:border-red-500 rounded transition-colors"
            disabled={isPending}
          >
            {isPending ? tCommon("Deleting") : tCommon("Confirm")}
          </button>
        ) : (
          <Link
            href={`/view-group-details/${group.id}`}
            className="w-full h-full px-2 py-1 text-slate-600 border border-slate-600 hover:text-slate-800 hover:bg-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {t("View details")}
          </Link>
        )}
      </div>
      <div className="p-2 bg-gray-100 flex items-center justify-center">
        {deleteUser ? (
          <button
            onClick={handleDeleteClick}
            className="w-full h-full px-2 py-1 text-slate-600 border border-slate-600 hover:text-lime-700 hover:bg-gray-300 hover:border-lime-700 rounded transition-colors"
          >
            {tCommon("Cancel")}
          </button>
        ) : (
          <button
            onClick={handleDeleteClick}
            className="w-full h-full px-2 py-1 text-slate-600 border border-slate-600 hover:text-red-500 hover:bg-red-100 hover:border-red-500 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {tCommon("Delete")}
          </button>
        )}
      </div>
    </li>
  );
}
