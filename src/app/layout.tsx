import "./globals.css";
import "@/lib/env";
import { inter, poppins } from "@/lib/fonts";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: Readonly<ReactNode> }) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${poppins.variable} min-h-screen bg-gray-100 text-white`}
    >
      <body className="font-inter">{children}</body>
    </html>
  );
}
