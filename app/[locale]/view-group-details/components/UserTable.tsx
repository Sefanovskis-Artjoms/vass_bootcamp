"use client";

import { IGroup, IResponse, IUser } from "@/types";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState, useTransition } from "react";

export default function UserTable({
  data,
  viewMode,
  addUserToGroupAction,
  removeUserFromGroupAction,
}: {
  data: IUser[];
  viewMode: boolean;
  addUserToGroupAction: (userId: string) => Promise<IResponse<IGroup>>;
  removeUserFromGroupAction: (userId: string) => Promise<IResponse<IGroup>>;
}) {
  const t = useTranslations("Pages.UserPages");
  const tCommon = useTranslations("Common");
  const { searchQuery, searchFields, filterRoles } = useSelector(
    (state: RootState) => state.userSearch["viewGroupDetails"]
  );

  let filteredData = data;

  if (searchQuery.trim() !== "") {
    const queryLower = searchQuery.toLowerCase();
    filteredData = filteredData.filter((user) => {
      if (searchFields.length === 0) {
        return (
          user.name.toLowerCase().includes(queryLower) ||
          user.surname.toLowerCase().includes(queryLower) ||
          user.username.toLowerCase().includes(queryLower)
        );
      } else {
        return searchFields.some((field) => {
          if (field === "name")
            return user.name.toLowerCase().includes(queryLower);
          if (field === "surname")
            return user.surname.toLowerCase().includes(queryLower);
          if (field === "username")
            return user.username.toLowerCase().includes(queryLower);
          return false;
        });
      }
    });
  }

  if (filterRoles.length > 0) {
    filteredData = filteredData.filter((user) =>
      filterRoles.includes(user.role)
    );
  }

  return (
    <ul className="grid grid-cols-[1fr_repeat(6,4fr)] border rounded-md overflow-hidden list-none p-0 border-gray-600 max-w-6xl text-center">
      <li key="header" className="contents font-bold text-gray-900">
        <div className="p-2 bg-gray-400">{t("Nr")}</div>
        <div className="p-2 bg-gray-400">{t("Name")}</div>
        <div className="p-2 bg-gray-400">{t("Surname")}</div>
        <div className="p-2 bg-gray-400">{t("Username")}</div>
        <div className="p-2 bg-gray-400">{t("Role")}</div>
        <div className="p-2 bg-gray-400">{t("User details")}</div>
        <div className="p-2 bg-gray-400">
          {viewMode ? tCommon("Remove") : tCommon("Add")}
        </div>
      </li>
      {filteredData.map((user, index) => (
        <DataRow
          key={user.id}
          user={user}
          index={index}
          viewMode={viewMode}
          addUserToGroupAction={addUserToGroupAction}
          removeUserFromGroupAction={removeUserFromGroupAction}
        />
      ))}
    </ul>
  );
}

function DataRow({
  user,
  index,
  viewMode,
  addUserToGroupAction,
  removeUserFromGroupAction,
}: {
  user: IUser;
  index: number;
  viewMode: boolean;
  addUserToGroupAction: (userId: string) => Promise<IResponse<IGroup>>;
  removeUserFromGroupAction: (userId: string) => Promise<IResponse<IGroup>>;
}) {
  const [makeAction, setMakeAction] = useState(false);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("Pages.UserPages");
  const tCommon = useTranslations("Common");
  const bgColour = index % 2 === 0 ? "bg-gray-100" : "bg-gray-200";

  const handleConfirmClick = async () => {
    startTransition(async () => {
      if (viewMode) {
        const response: IResponse<IGroup> = await removeUserFromGroupAction(
          user.id
        );
        console.log(response);
        if (!response.success) return;
      } else {
        const response: IResponse = await addUserToGroupAction(user.id);
        if (!response.success) return;
      }
      setMakeAction(false);
    });
  };

  return (
    <li key={user.id} className="contents bg-gray-800 font-bold text-gray-700">
      <div className={`p-2 ${bgColour}`}>{index + 1}</div>
      <div className={`p-2 ${bgColour}`}>{user.name}</div>
      <div className={`p-2 ${bgColour}`}>{user.surname}</div>
      <div className={`p-2 ${bgColour}`}>{user.username}</div>
      <div className={`p-2 ${bgColour}`}>{t(user.role)}</div>
      {!makeAction ? (
        <Link
          className={`p-2 ${bgColour} hover:bg-gray-300 hover:text-gray-900`}
          href={`/view-user-details/${user.id}`}
        >
          {t("View")}
        </Link>
      ) : (
        <button
          onClick={handleConfirmClick}
          className={`p-2 ${bgColour} hover:bg-gray-300 ${
            viewMode ? "hover:text-red-500" : "hover:text-lime-700"
          }`}
          disabled={isPending}
        >
          {isPending
            ? viewMode
              ? tCommon("Removing")
              : tCommon("Adding")
            : tCommon("Confirm")}
        </button>
      )}

      {!makeAction ? (
        <button
          onClick={() => setMakeAction(true)}
          className={`p-2 ${bgColour} hover:bg-gray-300 ${
            viewMode ? "hover:text-red-500" : "hover:text-lime-700"
          }`}
        >
          {viewMode ? tCommon("Remove") : tCommon("Add")}
        </button>
      ) : (
        <button
          onClick={() => setMakeAction(false)}
          className={`p-2 ${bgColour} hover:bg-gray-300 ${
            !viewMode ? "hover:text-red-500" : "hover:text-lime-700"
          }`}
        >
          {tCommon("Cancel")}
        </button>
      )}
    </li>
  );
}
