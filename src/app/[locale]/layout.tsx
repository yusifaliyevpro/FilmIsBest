import "../globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileNavbar from "@/components/MobileNavbar";
import { Providers } from "@/components/Providers";
import { Locale } from "@/i18n/routing";
import { BASE_URL } from "@/lib/constants";
import { inter, poppins } from "@/lib/fonts";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import "swiper/css";

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html
      lang={locale}
      className={`dark ${inter.variable} ${poppins.variable} min-h-screen bg-gray-100 text-white`}
    >
      <body className="font-inter">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header locale={locale} />
            {children}
            <MobileNavbar locale={locale} />
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

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
