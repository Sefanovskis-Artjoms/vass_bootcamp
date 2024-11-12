// app/layout.tsx
import "./globals.css";
import Navigation from "./components/Navigation";
import connectDB from "@/lib/mongodb";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connectDB();
  return (
    <html lang="en">
      <body className="p-8 bg-slate-50">
        {/* The same navigation is present across all pages */}
        <Navigation />
        {children}
      </body>
    </html>
  );
}
