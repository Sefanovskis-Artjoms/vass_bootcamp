"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  toggleSearchField,
  resetSearchFields,
  toggleFilterRole,
  resetFilterRoles,
} from "@/store/userSearchSlice";
import { RootState } from "@/store/store";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";

export default function UserSearchBar({ namespace }: { namespace: string }) {
  return (
    <div className="bg-gray-200 flex items-center space-x-6 mb-4 rounded-md shadow-md border border-slate-300">
      <SearchInput namespace={namespace} />
      <SearchFieldDropdown namespace={namespace} />
      <FilterRoleDropdown namespace={namespace} />
    </div>
  );
}

function SearchInput({ namespace }: { namespace: string }) {
  const t = useTranslations("Pages.UserPages");
  const dispatch = useDispatch();
  const [localSearch, setLocalSearch] = useState("");

  const onSearch = () => {
    dispatch(setSearchQuery({ namespace, query: localSearch }));
  };

  return (
    <div className="flex flex-grow items-center">
      <button
        onClick={onSearch}
        className="py-2 px-4 bg-gray-300 hover:bg-gray-400 flex items-center rounded-l-md"
      >
        <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
        {t("Search")}
      </button>
      <input
        type="text"
        placeholder={t("Search")}
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="p-2 flex-grow shadow-[inset_0_0_0_1px_#D1D5DB]"
      />
    </div>
  );
}

function SearchFieldDropdown({ namespace }: { namespace: string }) {
  const t = useTranslations("Pages.UserPages");
  const dispatch = useDispatch();
  const searchFields = useSelector(
    (state: RootState) => state.userSearch[namespace].searchFields
  );
  const [isOpen, setIsOpen] = useState(false);
  const options = ["name", "surname", "username"];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="px-4 py-2 bg-gray-300 cursor-pointer hover:bg-gray-400">
        {t("Search by fields")}
      </div>
      {isOpen && (
        <div className="absolute right-0 min-w-full bg-gray-300 border border-gray-200 min-w-full">
          <div
            onClick={() => dispatch(resetSearchFields({ namespace }))}
            className="block px-4 py-2 hover:bg-gray-400 cursor-pointer min-w-max"
          >
            {t("Reset selection")}
          </div>
          {options.map((field) => (
            <label
              key={field}
              className="flex items-center px-4 py-2 hover:bg-gray-400 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={searchFields.includes(field)}
                onChange={() =>
                  dispatch(toggleSearchField({ namespace, field }))
                }
                className="mr-2"
              />
              {t(field.charAt(0).toUpperCase() + field.slice(1))}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterRoleDropdown({ namespace }: { namespace: string }) {
  const t = useTranslations("Pages.UserPages");
  const dispatch = useDispatch();
  const filterRoles = useSelector(
    (state: RootState) => state.userSearch[namespace].filterRoles
  );
  const [isOpen, setIsOpen] = useState(false);
  const roles = ["User", "Manager", "Admin"];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="px-4 py-2 bg-gray-300 cursor-pointer hover:bg-gray-400 rounded-r-md">
        {t("Filter by role")}
      </div>
      {isOpen && (
        <div className="absolute right-0 bg-gray-300 border border-gray-200 min-w-full">
          <div
            onClick={() => dispatch(resetFilterRoles({ namespace }))}
            className="block px-4 py-2 hover:bg-gray-400 cursor-pointer min-w-max"
          >
            {t("Reset selection")}
          </div>
          {roles.map((role) => (
            <label
              key={role}
              className="flex items-center px-4 py-2 hover:bg-gray-400 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filterRoles.includes(role)}
                onChange={() => dispatch(toggleFilterRole({ namespace, role }))}
                className="mr-2"
              />
              {t(role)}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
