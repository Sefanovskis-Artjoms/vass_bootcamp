import "../globals.css";
import Navigation from "../components/Navigation";
import connectDB from "@/lib/mongodb";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ReduxProvider from "../components/ReduxProvider";

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  await connectDB();

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="p-8 bg-slate-50">
        <ReduxProvider>
          <NextIntlClientProvider messages={messages}>
            <Navigation />
            {children}
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
