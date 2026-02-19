import { ReactNode } from "react";
import React from "react";
import "@/lib/env";
import { inter, poppins } from "@/lib/fonts";
import "../globals.css";

export default function RootLayout({ children }: { children: Readonly<ReactNode> }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${poppins.variable} min-h-screen bg-gray-800 text-white`}>
      <body>{children}</body>
    </html>
  );
}
