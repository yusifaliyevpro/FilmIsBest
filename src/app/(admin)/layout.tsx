import "./admin.css";
import { Providers } from "@/components/Providers";
import { BASE_URL } from "@/lib/constants";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "FilmIsBest",
    template: "FilmIsBest | %s",
  },
};

export default async function RootLayout({ children }: { children: Readonly<ReactNode> }) {
  const messages = await getMessages();
  return (
    <html className="a bg-gray-100 dark" lang="az">
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <main className="relative flex min-h-screen flex-col items-center justify-start bg-white text-black">{children}</main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
