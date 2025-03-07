"use client";

import { IGroup, IResponse, IUser } from "@/types";
import { PlusIcon, EyeIcon } from "@heroicons/react/20/solid";
import ButtonBack from "@/app/components/ButtonBack";
import UserTable from "../components/UserTable";
import UserSearchBar from "@/app/components/UserSearchBar";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ClientPage({
  userData,
  groupData,
  addUserToGroupAction,
  removeUserFromGroupAction,
}: {
  userData: IUser[];
  groupData: IGroup;
  addUserToGroupAction: (userId: string) => Promise<IResponse<IGroup>>;
  removeUserFromGroupAction: (userId: string) => Promise<IResponse<IGroup>>;
}) {
  const [isViewMode, setIsViewMode] = useState(true);
  const t = useTranslations("Pages.GroupPages");
  const usersInGroup: IUser[] = [];
  const usersNotInGroup: IUser[] = [];
  userData.forEach((user) => {
    if (groupData.users?.includes(user.id)) {
      usersInGroup.push(user);
      return;
    }
    usersNotInGroup.push(user);
  });
  const finalUserData = isViewMode ? usersInGroup : usersNotInGroup;

  return (
    <div className="max-w-6xl bg-gray-100 p-6 pb-10 bg-gray-200 rounded-md shadow-md border border-slate-500">
      <div className="mb-6 flex justify-between">
        <h2 className="text-2xl text-gray-800 ">
          <span className="font-semibold">{groupData.name}</span>{" "}
          {t("group details")}
        </h2>
        <ButtonBack />
      </div>
      {isViewMode ? (
        <button
          onClick={() => setIsViewMode((prevMode) => !prevMode)}
          className="h-fit w-fit mb-6 flex items-center font-semibold bg-gray-300 border border-slate-500 text-slate-700  hover:text-lime-700 hover:border-lime-700 hover:bg-gray-400 py-2 px-4 rounded-md transition-colors duration-300"
        >
          <PlusIcon className="h-8 w-8 mr-1" /> {t("Add new user to the group")}
        </button>
      ) : (
        <button
          onClick={() => setIsViewMode((prevMode) => !prevMode)}
          className="h-fit w-fit mb-6 flex items-center font-semibold bg-gray-300 border border-slate-500 text-slate-700  hover:text-slate-800 hover:bg-gray-400 py-2 px-4 rounded-md transition-colors duration-300"
        >
          <EyeIcon className="h-8 w-8 mr-3" /> {t("View users in the group")}
        </button>
      )}

      <UserSearchBar namespace="viewGroupDetails" />
      <UserTable
        data={finalUserData}
        viewMode={isViewMode}
        addUserToGroupAction={addUserToGroupAction}
        removeUserFromGroupAction={removeUserFromGroupAction}
      />
    </div>
  );
}
