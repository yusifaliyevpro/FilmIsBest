import Movies from "@/components/Movies";
import PaginationUI from "@/components/Pagination";
import Search from "@/components/Search";
import { LoadingMovies, LoadingPagination, LoadingSearch } from "@/components/SuspenseLayouts";
import { Locales, locales } from "@/i18n/routing";
import { BASE_URL } from "@/lib/constants";
import { getMovies } from "@/lib/utils";
import * as motion from "motion/react-client";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locales }> }): Promise<Metadata> {
  setRequestLocale((await params).locale);
  const t = await getTranslations("MetaData.Movies");
  return {
    metadataBase: new URL(BASE_URL),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/en/movies`,
      languages: {
        "az-AZ": `/az/movies`,
        "tr-TR": `/tr/movies`,
      },
    },
    openGraph: {
      description: t("description"),
      images: [
        {
          url: `/api/og?title=${encodeURI(t("title"))}`,
          width: 1200,
          height: 1000,
          alt: `FilmIsBest | ${t("title")} | OpenGraph-Image`,
          type: "image/png",
        },
      ],
      title: `FilmIsBest | ${t("title")}`,
      url: `/movies`,
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function MoviesPage({ params }: { params: Promise<{ locale: Locales }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const movies = await getMovies();
  const count = movies.length;
  return (
    <section className="justify-content-center relative mx-auto mb-20 mt-6 flex flex-col items-center justify-center">
      <div className="sm:flx-row relative flex w-full flex-col items-center justify-center">
        <Suspense fallback={<LoadingSearch />}>
          <Search />
        </Suspense>
        <Suspense fallback={<LoadingPagination />}>
          <PaginationUI count={count} />
        </Suspense>
      </div>
      <motion.div
        animate={{ y: 0 }}
        initial={{ y: 600 }}
        transition={{
          duration: 1.2,
          type: "spring",
          stiffness: 55,
        }}
      >
        <Suspense fallback={<LoadingMovies />}>
          <Movies movies={movies} />
        </Suspense>
      </motion.div>
    </section>
  );
}
