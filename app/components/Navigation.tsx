"use client";

import SignOutButton from "./SignOutButton";
import LanguageSwithcer from "./LanguageSwitcher";
import { IUser } from "@/types";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Navigation({
  isLoggedIn,
  user,
  signOut,
}: {
  isLoggedIn: boolean;
  user: IUser | null;
  signOut: (options: { redirectTo: string }) => void;
}) {
  const t = useTranslations();

  return (
    <nav className="flex items-center justify-between bg-gray-200 p-4 rounded-md shadow-md border border-slate-500 mb-4">
      <ul className="flex space-x-6">
        {!isLoggedIn && (
          <li>
            <Link
              href="/login"
              className="shadow-md text-gray-800 font-semibold bg-gray-300 hover:bg-gray-400 hover:text-gray-900 py-2 px-4 rounded-md transition-colors duration-300"
            >
              {t("Common.Log-in")}
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <>
            <li>
              <Link
                href="/"
                className="shadow-md text-gray-800 font-semibold bg-gray-300 hover:bg-gray-400 hover:text-gray-900 py-2 px-4 rounded-md transition-colors duration-300"
              >
                {t("Navigation.To do list")}
              </Link>
            </li>
            {user?.role === "Admin" && (
              <>
                <li>
                  <Link
                    href="/add-card"
                    className="shadow-md text-gray-800 font-semibold bg-gray-300 hover:bg-gray-400 hover:text-gray-900 py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    {t("Navigation.Add to do item")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/view-users"
                    className="shadow-md text-gray-800 font-semibold bg-gray-300 hover:bg-gray-400 hover:text-gray-900 py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    {t("Navigation.View all users")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/view-groups"
                    className="shadow-md text-gray-800 font-semibold bg-gray-300 hover:bg-gray-400 hover:text-gray-900 py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    {t("Navigation.View groups")}
                  </Link>
                </li>
              </>
            )}
          </>
        )}
      </ul>
      <div className="flex items-center gap-x-10">
        <LanguageSwithcer />
        {isLoggedIn && (
          <>
            {user && (
              <div className="font-bold text-lg text-gray-700">
                {t("Navigation.Hi")} {user.name} {user.surname}
              </div>
            )}
            <SignOutButton signOutAction={signOut} />
          </>
        )}
      </div>
    </nav>
  );
}
