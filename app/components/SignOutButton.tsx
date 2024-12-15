"use client";

import { signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";

export default function SignOutButton() {
  // const router = useRouter();
  return (
    <a
      onClick={() => {
        signOut({ callbackUrl: "/login" });
        // router.push("/login");
      }}
      className="text-gray-800 font-semibold bg-gray-300 hover:bg-gray-400 hover:text-gray-900 py-2 px-4 rounded-md transition-colors duration-300"
    >
      Log-Out
    </a>
  );
}
