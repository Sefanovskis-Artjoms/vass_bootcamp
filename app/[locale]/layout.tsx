import "../globals.css";
import Navigation from "../components/Navigation";
import connectDB from "@/utils/mongodb";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ReduxProvider from "../components/ReduxProvider";
import { auth } from "../../utils/auth";
import { signOut } from "next-auth/react";
import dataService from "@/services/dataService";
import { IResponse, IUser } from "@/types";

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  await connectDB();
  const session = await auth();

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  const messages = await getMessages();

  const getUserData = async (userID: string): Promise<IUser | null> => {
    const response: IResponse<IUser> = await dataService.getUserDetails(userID);
    if (!response.success) return null;
    return response.data;
  };
  const userData: IUser | null = await getUserData(session?.user?.id as string);

  return (
    <html lang={locale}>
      <body className="p-8 bg-slate-50">
        <ReduxProvider>
          <NextIntlClientProvider messages={messages}>
            <Navigation
              isLoggedIn={session ? true : false}
              user={userData}
              signOut={signOut}
            />
            {children}
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
