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

export default function UserSearchBar() {
  return (
    <div className="bg-gray-200 flex items-center space-x-6 mb-4 rounded-md shadow-md ">
      <SearchInput />
      <SearchFieldDropdown />
      <FilterRoleDropdown />
    </div>
  );
}

function SearchInput() {
  const t = useTranslations();
  const dispatch = useDispatch();
  const [localSearch, setLocalSearch] = useState("");

  const onSearch = () => {
    dispatch(setSearchQuery(localSearch));
  };

  return (
    <div className="flex flex-grow items-center">
      <button
        onClick={onSearch}
        className="py-2 px-4 bg-gray-300 hover:bg-gray-400 flex items-center rounded-l-md"
      >
        <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
        {t("Pages.UserPages.Search")}
      </button>
      <input
        type="text"
        placeholder={t("Pages.UserPages.Search")}
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="p-2 flex-grow shadow-[inset_0_0_0_1px_#D1D5DB]"
      />
    </div>
  );
}

function SearchFieldDropdown() {
  const t = useTranslations();
  const dispatch = useDispatch();
  const searchFields = useSelector(
    (state: RootState) => state.userSearch.searchFields
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
        {t("Pages.UserPages.Search by fields")}
      </div>
      {isOpen && (
        <div className="absolute right-0 min-w-full bg-gray-300 border border-gray-200 min-w-full">
          <div
            onClick={() => dispatch(resetSearchFields())}
            className="block px-4 py-2 hover:bg-gray-400 cursor-pointer min-w-max"
          >
            {t("Pages.UserPages.Reset selection")}
          </div>
          {options.map((field) => (
            <label
              key={field}
              className="flex items-center px-4 py-2 hover:bg-gray-400 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={searchFields.includes(field)}
                onChange={() => dispatch(toggleSearchField(field))}
                className="mr-2"
              />
              {t(
                "Pages.UserPages." +
                  field.charAt(0).toUpperCase() +
                  field.slice(1)
              )}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterRoleDropdown() {
  const t = useTranslations();
  const dispatch = useDispatch();
  const filterRoles = useSelector(
    (state: RootState) => state.userSearch.filterRoles
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
        {t("Pages.UserPages.Filter by role")}
      </div>
      {isOpen && (
        <div className="absolute right-0 bg-gray-300 border border-gray-200 min-w-full">
          <div
            onClick={() => dispatch(resetFilterRoles())}
            className="block px-4 py-2 hover:bg-gray-400 cursor-pointer min-w-max"
          >
            {t("Pages.UserPages.Reset selection")}
          </div>
          {roles.map((role) => (
            <label
              key={role}
              className="flex items-center px-4 py-2 hover:bg-gray-400 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filterRoles.includes(role)}
                onChange={() => dispatch(toggleFilterRole(role))}
                className="mr-2"
              />
              {t("Pages.UserPages." + role)}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
