import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { getMovies } from "@/data/sanity/movies/get";
import Movies from "@/components/movies";
import { BASE_URL } from "@/lib/constants";
import { locales } from "@/i18n/routing";
import { Pagination } from "@heroui/pagination";
import PaginationUI from "@/components/pagination";
import Search from "@/components/search";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("MetaData.Movies");
  return {
    metadataBase: BASE_URL,
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

export default async function MoviesPage() {
  const movies = await getMovies();
  return (
    <main className="justify-content-center relative mx-auto mt-6 mb-20 flex flex-col items-center justify-center">
      <div className="relative flex w-full flex-col items-center justify-center">
        <Search />
        <Suspense
          fallback={
            <div className="mt-5 rounded-lg px-1">
              <Pagination page={1} total={15} classNames={{ item: "bg-gray-900" }} />
            </div>
          }
        >
          <PaginationUI count={movies.length} />
        </Suspense>
      </div>
      <div className="spring-up ease-spring-55 duration-[1.45s]">
        <div className="justify-content-center mx-2.5 flex min-h-[60vh] flex-wrap items-center justify-center gap-x-10">
          <Suspense>
            <Movies movies={movies} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
