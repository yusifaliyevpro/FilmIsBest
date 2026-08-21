import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileNavbar } from "@/components/mobile-navbar";
import { Providers } from "@/components/providers";
import { BASE_URL, SITE_KEYWORDS } from "@/lib/constants";
import { inter } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: BASE_URL,
  title: {
    default: "FilmIsBest",
    template: "FilmIsBest | %s",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
    other: [{ rel: "apple-touch-icon-precomposed", url: "/icon.png" }],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  keywords: [...SITE_KEYWORDS],
  category: "movie",
  creator: "YusifAliyevPro",
  publisher: "YusifAliyevPro",
  applicationName: "FilmIsBest",
  generator: "FilmIsBest",
  authors: [{ name: "YusifAliyevPro", url: "https://yusifaliyevpro.com" }],
  openGraph: {
    type: "website",
    siteName: "FilmIsBest",
  },
  other: {
    "google-adsense-account": "ca-pub-7613480628428091",
    "google-site-verification": "GSSl61QhJ471RU6KIbd2fSzwNN_6KYQsjA1-PumXcPs",
  },
};

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  const messages = await getMessages();
  const clientMessages = {
    Header: messages.Header,
    Footer: messages.Footer,
    Movies: messages.Movies,
    Movie: messages.Movie,
  };

  return (
    <html lang={locale} className={`dark ${inter.variable} min-h-screen bg-gray-800 text-white`}>
      <body className="font-inter">
        <NuqsAdapter>
          <NextIntlClientProvider messages={clientMessages}>
            <Providers>
              <Header />
              {children}
              <Suspense>
                <MobileNavbar />
              </Suspense>
              <Footer />
            </Providers>
          </NextIntlClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
