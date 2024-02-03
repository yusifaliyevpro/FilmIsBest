import { Inter } from "next/font/google";
import "./globals.css";
import "boxicons/css/boxicons.min.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Suspense } from "react";
import Loading from "./loading";
import "swiper/css";
import CookiesConsent from "./components/cookies";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  category: "movie",
  icons: {
    icon: "https://filmisbest.com/icon.png",
    shortcut: "https://filmisbest.com/icon.png",
    apple: "https://filmisbest.com/icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "https://filmisbest.com/icon.png",
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
  creator: "Yusif Aliyev",
  publisher: "Yusif Aliyev",
  applicationName: "FilmIsBest",
  generator: "FilmIsBest",
  authors: [{ name: "Yusif Aliyev", url: "https://yusifaliyevpro.com" }],
  siteName: "FilmIsBest",
  openGraph: {
    type: "website",
    siteName: "FilmIsBest",
    locale: "az_AZ",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-gray-100 dark">
      <body className={inter.className}>
        <Header />
        <Suspense fallback={<Loading />}>
          <main className="min-h-screen">{children}</main>
        </Suspense>
        <CookiesConsent />
        <Footer />
      </body>
    </html>
  );
}
