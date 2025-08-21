import "../globals.css";
import { Providers } from "@/components/Providers";
import "@/lib/env";
import { inter, poppins } from "@/lib/fonts";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";

export default async function RootLayout({ children }: { children: Readonly<ReactNode> }) {
  const messages = await getMessages();

  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${poppins.variable} min-h-screen bg-gray-100 text-white`}
    >
      <NextIntlClientProvider messages={messages}>
        <Providers>
          <main className="relative flex min-h-screen flex-col items-center justify-start bg-white text-black">
            {children}
          </main>
        </Providers>
      </NextIntlClientProvider>
    </html>
  );
}
