"use client";

import { IResponse, IUser } from "@/types";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ViewAndEditRole({
  user,
  handleEditAction,
}: {
  user: Partial<IUser>;
  handleEditAction: (user: Partial<IUser>) => Promise<IResponse>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newRole, setNewRole] = useState(user.role || "User");
  const [errorEditing, setErrorEditing] = useState(false);
  const t = useTranslations("Pages.UserPages");
  const tCommon = useTranslations("Common");

  const handleSave = async function () {
    const response = await handleEditAction({ id: user.id, role: newRole });
    if (response.success) {
      setIsEditing(false);
      setErrorEditing(false);
      return;
    }
    setErrorEditing(true);
  };

  if (!isEditing) {
    return (
      <div className="text-gray-700">
        {t("Role")}:{" "}
        <span className="font-semibold text-lg ml-2.5 mr-2.5">
          {t(user.role)}{" "}
        </span>
        <button
          className="text-gray-800 font-semibold bg-gray-300 border border-slate-500 hover:bg-gray-200 hover:text-orange-500 py-1 px-2 rounded-md transition-colors duration-300"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {tCommon("Edit")}
        </button>
      </div>
    );
  }
  return (
    <>
      <div className="text-gray-700">
        {t("Role")}:{" "}
        <select
          className="border border-gray-400 rounded-md px-2 py-1 ml-2.5"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        >
          <option value="User">{t("User")}</option>
          <option value="Manager">{t("Manager")}</option>
        </select>
        <button
          className="text-gray-800 font-semibold bg-gray-300 border border-slate-500 hover:bg-gray-200 hover:text-lime-700 py-1 px-2 rounded-md transition-colors duration-300 ml-2.5"
          onClick={() => handleSave()}
        >
          {tCommon("Save")}
        </button>
        <button
          className="text-gray-800 font-semibold bg-gray-300 border border-slate-500 hover:bg-gray-200 hover:text-red-500 py-1 px-2 rounded-md transition-colors duration-300 ml-2.5"
          onClick={() => setIsEditing(false)}
        >
          {tCommon("Cancel")}
        </button>
      </div>
      {errorEditing && (
        <div className="text-red-500">
          {t("Errors.Error in updating user role")}
        </div>
      )}
    </>
  );
}
