import { taintUniqueValue } from "next/dist/server/app-render/rsc/taint";
import Navigation from "./_components/Navigation";
import { title } from "process";
import Logo from "./_components/Logo";

import "@/app/_styles/globals.css";

export const metadata = {
  title: "The Wild Oasis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-blue-900 text-gray-50 min-h-screen">
        <header>
          <Logo />
        </header>
        <Navigation />
        <main>{children}</main>
        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
