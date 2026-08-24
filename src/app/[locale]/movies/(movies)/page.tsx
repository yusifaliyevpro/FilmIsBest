import { Pagination } from "@heroui/pagination";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import Movies from "@/components/movies";
import PaginationUI from "@/components/pagination";
import Search from "@/components/search";
import { getMovies } from "@/data/sanity/movies/get";
import { locales } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("MetaData.Movies");
  return buildMetadata({
    locale,
    path: "/movies",
    title: t("title"),
    description: t("description"),
    ogImageTitle: t("title"),
  });
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
      <div className="duration-[1.45s] ease-spring-55 spring-up">
        <div className="justify-content-center mx-2.5 flex min-h-[60vh] flex-wrap items-center justify-center gap-x-10">
          <Suspense>
            <Movies movies={movies} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
