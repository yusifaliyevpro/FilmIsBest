import CookiesConsent from "../../../components/Cookies";
import "./globals.css";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import MobileNavbar from "@/src/components/MobileNavbar";
import { Providers } from "@/src/components/Providers";
import { BASE_URL } from "@/src/lib/constants";
import { I18nProviderClient } from "@/src/locales/client";
import { getCurrentLocale } from "@/src/locales/server";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "swiper/css";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  metadataBase: new URL(BASE_URL),
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
    "og:site_name": "FilmIsBest",
  },
};

export default function RootLayout({ children }) {
  const locale = getCurrentLocale();
  return (
    <html lang={locale} className="min-h-screen bg-gray-100 text-white dark">
      <body className={inter.className}>
        <Providers>
          <I18nProviderClient locale={locale}>
            <Header locale={locale} />
          </I18nProviderClient>
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
          {children}
          <I18nProviderClient locale={locale}>
            <MobileNavbar locale={locale} />
            <Footer locale={locale} />
          </I18nProviderClient>
        </Providers>
      </body>
    </html>
  );
}
