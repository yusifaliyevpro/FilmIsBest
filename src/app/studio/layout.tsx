import { ReactNode, Suspense } from "react";
import React from "react";
import "@/lib/env";
import { inter, poppins } from "@/lib/fonts";
import "../globals.css";

export default function RootLayout({ children }: { children: Readonly<ReactNode> }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${poppins.variable} min-h-screen bg-gray-800 text-white`}>
      <body>
        <Suspense
          fallback={
            <div className="flex min-h-screen w-full items-center justify-center bg-gray-900">Loading Studio...</div>
          }
        >
          {children}
        </Suspense>
      </body>
    </html>
  );
}
