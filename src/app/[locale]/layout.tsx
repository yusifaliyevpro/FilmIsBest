import "../globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import MobileNavbar from "@/components/mobile-navbar";
import Providers from "@/components/providers";
import { assertIsValidLocale } from "@/i18n/routing";
import { BASE_URL } from "@/lib/constants";
import { inter, poppins } from "@/lib/fonts";
import { NextIntlClientProvider } from "next-intl";
import { Suspense } from "react";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "FilmIsBest",
    template: "FilmIsBest | %s",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
    other: { rel: "apple-touch-icon-precomposed", url: "/icon.png" },
  },
  alternates: {
    canonical: ``,
    languages: {
      en: `/en`,
      "az-AZ": `/az`,
      "tr-TR": `/tr`,
    },
  },

  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  keywords: [
    "FilmIsBest",
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
  },
};

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  assertIsValidLocale(locale);

  return (
    <html
      lang={locale}
      className={`dark ${inter.variable} ${poppins.variable} min-h-screen bg-gray-100 text-white`}
    >
      <body className="font-inter">
        <NextIntlClientProviderWrapper>
          <Providers>
            <Suspense>
              <Header locale={locale} />
            </Suspense>
            {children}
            <Suspense>
              <MobileNavbar locale={locale} />
            </Suspense>
            <Footer />
          </Providers>
        </NextIntlClientProviderWrapper>
      </body>
    </html>
  );
}

function NextIntlClientProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </Suspense>
  );
}
