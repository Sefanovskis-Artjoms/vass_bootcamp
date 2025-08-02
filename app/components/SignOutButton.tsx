"use client";

import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

export default function SignOutButton({
  signOutAction,
}: {
  signOutAction: (options: { redirectTo: string }) => void;
}) {
  const locale = useLocale();
  const t = useTranslations("Common");
  return (
    <a
      onClick={() => {
        signOutAction({ redirectTo: `/${locale}/login` });
      }}
      className="shadow-md text-gray-800 font-semibold bg-gray-300 hover:bg-gray-400 hover:text-gray-900 py-2 px-4 rounded-md transition-colors duration-300"
    >
      {t("Log-out")}
    </a>
  );
}
