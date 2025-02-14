"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/store/groupSearchSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";

export default function GroupSearchBar() {
  return (
    <div className="max-w-3xl bg-gray-200 flex items-center space-x-6 mb-4 rounded-md shadow-md ">
      <SearchInput />
    </div>
  );
}

function SearchInput() {
  const t = useTranslations("Pages.UserPages");
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
        {t("Search")}
      </button>
      <input
        type="text"
        placeholder={t("Search")}
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="p-2 flex-grow rounded-r-md shadow-[inset_0_0_0_1px_#D1D5DB]"
      />
    </div>
  );
}
