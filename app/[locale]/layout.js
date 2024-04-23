import { Inter } from "next/font/google";
import Header from "../components/header";
import Footer from "../components/footer";
import "./globals.css";
import "react-icons/bi";
import "swiper/css";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CookiesConsent from "../components/cookies";
import ScrollTop from "../components/scrollTop";
import { I18nProviderClient } from "@/locales/client";
import { Providers } from "../components/providers";
import BatteryLevel from "../components/battery";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  category: "movie",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/icon.png",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  title: {
    default: "FilmIsBest",
    template: "FilmIsBest | %s",
  },
  keywords: [
    "FilmİsBest",
    "Film",
    "Filmlər səhifəsi",
    "Movie",
    "Filmisbest.com",
    "yusifaliyevpro",
    "yusifaliyevpro.com",
    "Azfilm",
    "Türkçə film",
    "İngiliscə film",
    "Türkçə altyazılı film",
    "İngiliscə altyazılı film",
    "Azərbaycan film",
    "Film izle",
    "Türkçə dublaj",
    "Film dublajı",
    "Filmlər",
    "Movies",
    "hd",
    "hd film",
    "full film",
    "1080p film",
    "filmifullizle",
    "film izle türk",
    "Netflix film",
    "sinema",
    "film sineması",
    "Azəri film",
    "yusifaliyev",
    "yusif",
    "aliyev",
  ],
  creator: "YusifAliyevPro",
  publisher: "YusifAliyevPro",
  applicationName: "FilmIsBest",
  generator: "FilmIsBest",
  authors: [{ name: "YusifAliyevPro", url: "https://yusifaliyevpro.com" }],
  siteName: "FilmIsBest",
  openGraph: {
    type: "website",
    siteName: "FilmIsBest",
  },
};

export default function RootLayout({ children, params }) {
  const locale = params.locale;
  return (
    <html lang={locale} className="bg-gray-100 dark">
      <head>
        <meta name="google-adsense-account" content="ca-pub-7613480628428091" />
        <meta
          name="google-site-verification"
          content="GSSl61QhJ471RU6KIbd2fSzwNN_6KYQsjA1-PumXcPs"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <I18nProviderClient locale={locale}>
            <Header locale={locale} />
          </I18nProviderClient>
          <Suspense>
            <BatteryLevel />
          </Suspense>
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
          <main className="min-h-screen  text-white dark">{children}</main>
          <SpeedInsights />
          <Analytics />
          <CookiesConsent />
          <ScrollTop />
          <I18nProviderClient locale={locale}>
            <Footer />
          </I18nProviderClient>
        </Providers>
      </body>
    </html>
  );
}
