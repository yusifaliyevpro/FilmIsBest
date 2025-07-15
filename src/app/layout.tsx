import "./globals.css";
import "@/lib/env";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: Readonly<ReactNode> }) {
  return (
    <html className="dark min-h-screen bg-gray-100 text-white">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
