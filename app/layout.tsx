// app/layout.tsx
import "./globals.css";
import Navigation from "./components/Navigation";
import { TodoProvider } from "../context/TodoContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="p-8 bg-slate-50">
        {/* The same navigation is present across all pages */}
        <Navigation />
        {/* TodoProvider is a temporary feature to allow working with the same data across multiple pages */}
        <TodoProvider>{children}</TodoProvider>
      </body>
    </html>
  );
}
