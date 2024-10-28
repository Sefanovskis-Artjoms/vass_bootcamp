import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-gray-200 p-4 rounded-md shadow-md border border-slate-500 mb-8">
      <ul className="flex space-x-6">
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
      </ul>
    </nav>
  );
}
