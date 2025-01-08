import "./admin.css";
import { Providers } from "@/components/Providers";
import { BASE_URL } from "@/lib/constants";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "FilmIsBest",
    template: "FilmIsBest | %s",
  },
};

export default async function RootLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  const messages = await getMessages();
  return (
    <html lang="az" className="a bg-gray-100 dark">
      <body className={inter.className}>
        <Providers>
          <Toaster
            toastOptions={{
              className: "",
              style: {
                borderRadius: "30px",
                border: "2px solid #007bff",
                color: "#fff",
                background: "#191e25",
              },
              iconTheme: {
                primary: "#007bff",
                secondary: "#FFFAEE",
              },
            }}
            position="bottom-right"
            reverseOrder={false}
          />
          <NextIntlClientProvider messages={messages}>
            <main className="min-h-screen bg-white text-black">{children}</main>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
