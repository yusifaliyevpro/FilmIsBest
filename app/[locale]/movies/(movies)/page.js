import { Motion } from "@/app/components/Motion";
import Movies from "@/app/components/Movies";
import PaginationUI from "@/app/components/Pagination";
import Search from "@/app/components/Search";
import { getCount, getMovies } from "@/lib/utils";
import { I18nProviderClient } from "@/locales/client";
import { getScopedI18n, getStaticParams } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";
import { Suspense } from "react";

export async function generateMetadata() {
  const t = await getScopedI18n("MetaData.Movies");
  return {
    title: t("title"),
    url: `/movies`,
    description: t("description"),
    alternates: {
      canonical: `/movies`,
      languages: {
        en: `/en/movies`,
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
  return getStaticParams();
}

export default async function MoviesPage({ searchParams, params: { locale } }) {
  setStaticParamsLocale(locale);
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const count = await getCount();
  const movies = await getMovies();
  let renderedMovies;
  if (search) {
    renderedMovies = movies.filter((movie) =>
      movie.filmName.toLowerCase().includes(search.toLowerCase()),
    );
  } else {
    renderedMovies = movies.slice((page - 1) * 20, page * 20);
  }
  return (
    <section className="justify-content-center relative mx-auto mb-20 mt-6 flex flex-col items-center justify-center">
      <div className="sm:flx-row relative flex w-full flex-col items-center justify-center">
        <I18nProviderClient locale={locale}>
          <Suspense
            fallback={
              <div className="mx-auto mb-4 mt-6 h-[44px] w-[300px] animate-pulse rounded-full bg-gray-200 sm:w-[500px]"></div>
            }
          >
            <Search
              resultCount={renderedMovies.length}
              searchQuery={search}
              pageQuery={page}
              locale={locale}
            />
          </Suspense>
        </I18nProviderClient>
        <Suspense
          fallback={
            <div className="relative mt-5 flex animate-pulse rounded-xl bg-gray-200">
              <div className="h-[36px] w-[76px]"></div>
            </div>
          }
        >
          <PaginationUI searchQuery={search} pageQuery={page} count={count} />
        </Suspense>
      </div>
      <Motion
        initial={{ y: 600 }}
        animate={{ y: 0 }}
        transition={{
          duration: 1.2,
          type: "spring",
          stiffness: 55,
        }}
      >
        <Suspense>
          <Movies movies={renderedMovies} search={search} page={page} />
        </Suspense>
      </Motion>
    </section>
  );
}
