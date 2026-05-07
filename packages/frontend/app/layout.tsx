import React from "react";
import { inter } from "./fonts";
import Navbar from "./components/layout/Navbar";
import "./globals.css";
import Aside from "./components/layout/Aside";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.className} dark`}>
      <body>
        <Navbar />
        <Aside />
        <main>{children}</main>
      </body>
    </html>
  );
}
