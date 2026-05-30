import React from "react";
// import { inter } from "./fonts";
import Aside from "./components/BaseLayout/Aside";
import Navbar from "./components/BaseLayout/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(inter.className, "font-sans", inter.variable)}
    >
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
