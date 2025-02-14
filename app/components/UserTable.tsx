"use client";

import { IUser } from "@/types";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function UserTable({ data }: { data: IUser[] }) {
  const t = useTranslations("Pages.UserPages");
  const { searchQuery, searchFields, filterRoles } = useSelector(
    (state: RootState) => state.userSearch["viewUsers"]
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
    <ul className="grid grid-cols-[1fr_repeat(5,4fr)] border rounded-md overflow-hidden list-none p-0 border-gray-600 max-w-5xl text-center">
      <li key="header" className="contents font-bold text-gray-900">
        <div className="p-2 bg-gray-400">{t("Nr")}</div>
        <div className="p-2 bg-gray-400">{t("Name")}</div>
        <div className="p-2 bg-gray-400">{t("Surname")}</div>
        <div className="p-2 bg-gray-400">{t("Username")}</div>
        <div className="p-2 bg-gray-400">{t("Role")}</div>
        <div className="p-2 bg-gray-400">{t("User details")}</div>
      </li>
      {filteredData.map((user, i) => {
        const bgColour = i % 2 === 0 ? "bg-gray-100" : "bg-gray-200";
        return (
          <li
            key={user.id}
            className="contents bg-gray-800 font-bold text-gray-700"
          >
            <div className={`p-2 ${bgColour}`}>{i + 1}</div>
            <div className={`p-2 ${bgColour}`}>{user.name}</div>
            <div className={`p-2 ${bgColour}`}>{user.surname}</div>
            <div className={`p-2 ${bgColour}`}>{user.username}</div>
            <div className={`p-2 ${bgColour}`}>{t(user.role)}</div>
            <Link
              className={`p-2 ${bgColour} hover:bg-gray-300 hover:text-gray-800`}
              href={`/view-user-details/${user.id}`}
            >
              {t("View")}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
