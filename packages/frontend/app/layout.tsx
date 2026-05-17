import React from "react";
import { inter } from "./fonts";
import Aside from "./components/BaseLayout/Aside";
import Navbar from "./components/BaseLayout/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.className} dark`}>
      <body>
        <Navbar />
        <Aside />
        <main className="h-[calc(100vh-40px)] ml-20 mt-10 overflow-y-auto p-4 bg-gray-300">
          {children}
        </main>
      </body>
    </html>
  );
}
