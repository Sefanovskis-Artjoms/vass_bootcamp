import { auth } from "@/auth";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import dataService from "@/services/dataService";

export default async function Navigation() {
  const session = await auth();

  let name, surname;
  if (session?.user?.id) {
    const user = await dataService.getUserDetails(session.user.id);
    name = user.name;
    surname = user.surname;
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
            <li>
              <Link
                href="/add-card"
                className="text-gray-800 font-semibold bg-gray-300 hover:bg-gray-400 hover:text-gray-900 py-2 px-4 rounded-md transition-colors duration-300"
              >
                Add todo item
              </Link>
            </li>
            <li></li>
          </>
        )}
      </ul>
      {session && (
        <div className="flex items-center gap-x-12">
          <div className="font-bold text-lg text-gray-700">
            Hi {name} {surname}
          </div>
          <SignOutButton />
        </div>
      )}
    </nav>
  );
}
