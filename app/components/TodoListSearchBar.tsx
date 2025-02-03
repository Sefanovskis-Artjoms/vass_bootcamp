"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  setSortOrder,
  toggleFilterType,
  resetFilterTypes,
  toggleFilterStatus,
  resetFilterStatuses,
} from "@/store/todoSearchSlice";
import { useState } from "react";
import { RootState } from "@/store/store";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";

export default function TodoListSearchBar() {
  return (
    <div className="bg-gray-200 flex items-center space-x-6 mb-4 rounded-md shadow-md">
      <SearchInput />
      <SortDropdown />
      <FilterTypeDropdown />
      <FilterStatusDropdown />
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
        className="py-2 px-4 bg-gray-300 hover:bg-gray-400 rounded-l-md flex items-center"
      >
        <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
        {t("Pages.ToDoPages.Search")}
      </button>
      <input
        type="text"
        placeholder={t("Pages.ToDoPages.Search")}
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="p-2 flex-grow shadow-[inset_0_0_0_1px_#D1D5DB]"
      />
    </div>
  );
}

function SortDropdown() {
  const t = useTranslations();
  const dispatch = useDispatch();
  const sortOrder = useSelector(
    (state: RootState) => state.todoSearch.sortOrder
  );
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="px-4 py-2 bg-gray-300 cursor-pointer hover:bg-gray-400">
        {sortOrder === "newest"
          ? t("Pages.ToDoPages.Newest first")
          : t("Pages.ToDoPages.Oldest first")}
      </div>
      {isOpen && (
        <div className="absolute right-0 bg-gray-300 border border-gray-200 min-w-full">
          <div
            onClick={() => {
              dispatch(setSortOrder("newest"));
              setIsOpen(false);
            }}
            className="block px-4 py-2 hover:bg-gray-400 cursor-pointer min-w-max"
          >
            {t("Pages.ToDoPages.Newest first")}
          </div>
          <div
            onClick={() => {
              dispatch(setSortOrder("oldest"));
              setIsOpen(false);
            }}
            className="block px-4 py-2 hover:bg-gray-400 cursor-pointer min-w-max"
          >
            {t("Pages.ToDoPages.Oldest first")}
          </div>
        </div>
      )}
    </div>
  );
}

function FilterTypeDropdown() {
  const t = useTranslations();
  const dispatch = useDispatch();
  const filterTypes = useSelector(
    (state: RootState) => state.todoSearch.filterTypes
  );
  const [isOpen, setIsOpen] = useState(false);
  const types = ["Feature", "Bug", "Story", "Other"];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="px-4 py-2 bg-gray-300 cursor-pointer hover:bg-gray-400">
        {t("Pages.ToDoPages.Filter by type")}
      </div>
      {isOpen && (
        <div className="absolute right-0 bg-gray-300 border border-gray-200 min-w-full">
          <div
            onClick={() => dispatch(resetFilterTypes())}
            className="block px-4 py-2 hover:bg-gray-400 cursor-pointer min-w-max"
          >
            {t("Pages.ToDoPages.Reset selection")}
          </div>
          {types.map((type) => (
            <label
              key={type}
              className="flex items-center px-5 py-2 hover:bg-gray-400 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filterTypes.includes(type)}
                onChange={() => dispatch(toggleFilterType(type))}
                className="mr-2"
              />
              {t("Pages.ToDoPages." + type)}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterStatusDropdown() {
  const t = useTranslations();
  const dispatch = useDispatch();
  const filterStatuses = useSelector(
    (state: RootState) => state.todoSearch.filterStatuses
  );
  const [isOpen, setIsOpen] = useState(false);
  const statuses = ["In progress", "Done", "To do"];

  return (
    <div
      className="relative inline-block text-left "
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="px-4 py-2 bg-gray-300 cursor-pointer hover:bg-gray-400 rounded-r-md">
        {t("Pages.ToDoPages.Filter by status")}
      </div>
      {isOpen && (
        <div className="absolute right-0 bg-gray-300 border border-gray-200 min-w-full">
          <div
            onClick={() => dispatch(resetFilterStatuses())}
            className="block px-4 py-2 hover:bg-gray-400 cursor-pointer min-w-max"
          >
            {t("Pages.ToDoPages.Reset selection")}
          </div>
          {statuses.map((status) => (
            <label
              key={status}
              className="flex items-center px-4 py-2 hover:bg-gray-400 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filterStatuses.includes(status)}
                onChange={() => dispatch(toggleFilterStatus(status))}
                className="mr-2"
              />
              {t("Pages.ToDoPages." + status)}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
