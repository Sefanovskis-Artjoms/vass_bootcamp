import dataService from "@/services/dataService";
import { IResponse, IUser } from "@/types";
import Link from "next/link";

export default async function ViewUsers() {
  async function fetchUserData(): Promise<IUser[] | null> {
    const getUserDataResponse: IResponse<IUser[]> =
      await dataService.getAllUsers();
    if (!getUserDataResponse.success) {
      return null;
    }
    return getUserDataResponse.data;
  }

  const userData: IUser[] | null = await fetchUserData();

  if (!userData) {
    return <p className="text-red-500">Error in fetching user data</p>;
  }

  return (
    <ul className="grid grid-cols-[1fr_repeat(5,4fr)] border rounded-md overflow-hidden list-none p-0 border border-gray-600 max-w-5xl text-center">
      <li key={0} className="contents font-bold text-gray-900">
        <div className="p-2 bg-gray-400">Nr</div>
        <div className="p-2 bg-gray-400">Name</div>
        <div className="p-2 bg-gray-400">Surname</div>
        <div className="p-2 bg-gray-400">Username</div>
        <div className="p-2 bg-gray-400">Role</div>
        <div className="p-2 bg-gray-400">View Details</div>
      </li>
      {userData.map((user, i) => {
        const bgColour = i % 2 === 0 ? "bg-gray-100" : "bg-gray-200";
        return (
          <li
            key={user.id}
            className="contents bg-gray-800 font-bold text-gray-700"
          >
            <div className={`p-2 ${bgColour}`}>{i + 1}</div>
            <div className={`p-2 ${bgColour}`}>{user.name}</div>
            <div className={`p-2 ${bgColour}`}>{user.surname}</div>
            <div className={`p-2 ${bgColour}`}>{user.username}</div>
            <div className={`p-2 ${bgColour}`}>{user.role}</div>
            <Link
              className={`p-2 ${bgColour} hover:bg-gray-300 hover:text-gray-800`}
              href={`/view-user-details/${user.id}`}
            >
              View
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
