"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ButtonBack() {
  const router = useRouter();
  const t = useTranslations("Common");

  return (
    <button
      onClick={() => router.back()}
      className="h-fit text-gray-800 font-semibold bg-gray-300 border border-slate-500 hover:bg-gray-400 hover:text-gray-900 py-2 px-4 rounded-md transition-colors duration-300"
    >
      {t("Back")}
    </button>
  );
}
