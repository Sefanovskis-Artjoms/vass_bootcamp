import { auth } from "@/auth";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import dataService from "@/services/dataService";
import { IResponse, IUser } from "@/types";

export default async function Navigation() {
  const session = await auth();

  let name,
    surname: string = "";
  let userDataError: boolean = false;
  if (session?.user?.id) {
    const userDetailsResponse: IResponse<IUser> =
      await dataService.getUserDetails(session.user.id as string);
    if (!userDetailsResponse.success) {
      userDataError = true;
    } else {
      name = userDetailsResponse.data.name;
      surname = userDetailsResponse.data.surname;
    }
  }
  return (
    <nav className="flex items-center justify-between bg-gray-200 p-4 rounded-md shadow-md border border-slate-500 mb-8">
      <ul className="flex space-x-6">
        {!session && (
          <li>
            <Link
              href="/login"
              className="text-gray-800 font-semibold bg-gray-300 hover:bg-gray-400 hover:text-gray-900 py-2 px-4 rounded-md transition-colors duration-300"
            >
              Log-In
            </Link>
          </li>
        )}
        {session && (
          <>
            <li>
              <Link
                href="/"
                className="text-gray-800 font-semibold bg-gray-300 hover:bg-gray-400 hover:text-gray-900 py-2 px-4 rounded-md transition-colors duration-300"
              >
                To do list
              </Link>
            </li>
            {session.user.role === "Admin" && (
              <>
                <li>
                  <Link
                    href="/add-card"
                    className="text-gray-800 font-semibold bg-gray-300 hover:bg-gray-400 hover:text-gray-900 py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    Add todo item
                  </Link>
                </li>
                <li>
                  <Link
                    href="/view-users"
                    className="text-gray-800 font-semibold bg-gray-300 hover:bg-gray-400 hover:text-gray-900 py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    View all users
                  </Link>
                </li>
              </>
            )}
          </>
        )}
      </ul>
      {session && (
        <div className="flex items-center gap-x-12">
          {!userDataError && (
            <div className="font-bold text-lg text-gray-700">
              Hi {name} {surname}
            </div>
          )}
          <SignOutButton />
        </div>
      )}
    </nav>
  );
}
