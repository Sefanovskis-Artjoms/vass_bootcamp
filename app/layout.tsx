// app/layout.tsx
import "./globals.css";
import Navigation from "./components/Navigation";

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
        {children}
      </body>
    </html>
  );
}
