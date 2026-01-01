import { MovieCardSkeleton } from "@/components/movie-card";
import Movies from "@/components/movies";
import PaginationUI from "@/components/pagination";
import Search from "@/components/search";
import { getMovies } from "@/data/sanity/movies/get";
import { locales, validateLocale } from "@/i18n/routing";
import { BASE_URL } from "@/lib/constants";
import { Pagination } from "@heroui/pagination";
import { Skeleton } from "@heroui/skeleton";
import * as motion from "motion/react-client";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({ params }: PageProps<"/[locale]/movies">): Promise<Metadata> {
  const { locale } = await params;
  validateLocale(locale);
  setRequestLocale(locale);

  const t = await getTranslations("MetaData.Movies");
  return {
    metadataBase: new URL(BASE_URL),
    title: t("title"),
    description: t("description"),
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

export default async function MoviesPage({ params }: PageProps<"/[locale]/movies">) {
  const { locale } = await params;
  validateLocale(locale);
  setRequestLocale(locale);
  const movies = await getMovies();
  return (
    <section className="justify-content-center relative mx-auto mt-6 mb-20 flex flex-col items-center justify-center">
      <div className="relative flex w-full flex-col items-center justify-center">
        <Suspense fallback={<Skeleton className="mx-auto mt-6 mb-4 h-11.5 w-full rounded-3xl sm:w-125" />}>
          <Search />
        </Suspense>

        <Suspense
          fallback={
            <Skeleton className="mt-5 rounded-lg px-1">
              <Pagination page={1} total={15} />
            </Skeleton>
          }
        >
          <PaginationUI count={movies.length} />
        </Suspense>
      </div>
      <motion.div
        initial={{ y: 600 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 55 }}
      >
        <div className="justify-content-center mx-2.5 flex min-h-[60vh] flex-wrap items-center justify-center gap-x-10">
          <Suspense
            fallback={Array.from({ length: 20 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
          >
            <Movies movies={movies} />
          </Suspense>
        </div>
      </motion.div>
    </section>
  );
}
