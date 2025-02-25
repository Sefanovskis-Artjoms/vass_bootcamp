"use client";

import { Link, routing, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useState } from "react";

export default function LanguageSwitcher() {
  const availableLocales = routing.locales;
  const currentPath = usePathname();
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const otherLocales = availableLocales.filter((loc) => loc !== currentLocale);
  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="px-4 py-2 bg-gray-300 shadow-md rounded cursor-pointer hover:bg-gray-400">
        {currentLocale.toUpperCase()}
      </div>

      {isOpen && (
        <div className="absolute bg-gray-300 border border-gray-200 rounded shadow-md z-10">
          {otherLocales.map((locale) => (
            <Link
              key={locale}
              href={currentPath}
              locale={locale}
              className="block px-4 py-2 hover:bg-gray-400 "
            >
              {locale.toUpperCase()}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
