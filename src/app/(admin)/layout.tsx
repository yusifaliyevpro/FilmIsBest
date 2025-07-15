import { Providers } from "@/components/Providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";

export default async function RootLayout({ children }: { children: Readonly<ReactNode> }) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <main className="relative flex min-h-screen flex-col items-center justify-start bg-white text-black">
          {children}
        </main>
      </Providers>
    </NextIntlClientProvider>
  );
}
