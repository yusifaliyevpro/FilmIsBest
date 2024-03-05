import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import "react-icons/bi";
import "swiper/css";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CookiesConsent from "./components/cookies";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { azAZ } from "./lib/az-AZ";
import { IconContext } from "react-icons";
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
    locale: "az_AZ",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="az" className="bg-gray-100 dark">
      <head>
        <meta name="google-adsense-account" content="ca-pub-7613480628428091" />
        <meta
          name="google-site-verification"
          content="GSSl61QhJ471RU6KIbd2fSzwNN_6KYQsjA1-PumXcPs"
        />
      </head>
      <body className={inter.className}>
        <ClerkProvider
          localization={azAZ}
          appearance={{
            layout: {
              socialButtonsPlacement: "bottom",
              socialButtonsVariant: "iconButton",
            },
            elements: {
              logoBox: "justify-center",
            },
            baseTheme: dark,
            variables: { colorPrimary: "#007bff" },
          }}
        >
          <Header />
          <Toaster
            toastOptions={{
              className: "",
              style: {
                border: "1px solid #007bff",
                color: "#000",
              },
            }}
            position="bottom-right"
          />
          <main className="min-h-screen  text-white dark">{children}</main>
          <SpeedInsights />
          <Analytics />
          <CookiesConsent />
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
