import { Inter } from "next/font/google";
import "./globals.css";
import "boxicons/css/boxicons.min.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Suspense } from "react";
import Loading from "./loading";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import CookiesConsent from "./components/cookies";

const inter = Inter({ subsets: ["latin"] });
const ogImage = {
  url: "/FilmIsBest.png",
  width: 1200,
  height: 630,
  alt: "FilmIsBest",
  type: "image/png",
};
export const metadata = {
  title: "FilmIsBest | Ana Səhifə",
  description: "FilmIsBest.com will move to Next.JS as soon as possible",
  creator: "Yusif Aliyev",
  url: "https://filmisbest.com",
  siteName: "FilmIsBest",
  openGraph: {
    images: [ogImage],
    description: "FilmIsBest.com will move to Next.JS as soon as possible",
    type: "website",
    url: "https://filmisbest.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-gray-100 dark">
      <head>
      <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <Header />
        <Suspense fallback={<Loading />}>  <MantineProvider>{children}</MantineProvider></Suspense>
        <CookiesConsent />
        <Footer />
      </body>
    </html>
  );
}
