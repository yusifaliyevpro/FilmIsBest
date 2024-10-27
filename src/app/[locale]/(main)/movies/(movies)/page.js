import { Motion } from "@/src/components/Motion";
import Movies from "@/src/components/Movies";
import PaginationUI from "@/src/components/Pagination";
import Search from "@/src/components/Search";
import useStore from "@/src/lib/store";
import { getCount, getMovies } from "@/src/lib/utils";
import { I18nProviderClient } from "@/src/locales/client";
import { getScopedI18n, getStaticParams } from "@/src/locales/server";
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

export default async function MoviesPage({ params: { locale } }) {
  setStaticParamsLocale(locale);
  const movies = await getMovies();
  const count = await getCount();
  return (
    <section className="justify-content-center relative mx-auto mb-20 mt-6 flex flex-col items-center justify-center">
      <div className="sm:flx-row relative flex w-full flex-col items-center justify-center">
        <I18nProviderClient locale={locale}>
          <Suspense
            fallback={
              <div className="mx-auto mb-4 mt-6 h-[44px] w-[300px] animate-pulse rounded-full bg-gray-200 sm:w-[500px]"></div>
            }
          >
            <Search locale={locale} />
          </Suspense>
        </I18nProviderClient>
        <Suspense
          fallback={
            <div className="relative mt-5 flex animate-pulse rounded-xl bg-gray-200">
              <div className="h-[36px] w-[76px]"></div>
            </div>
          }
        >
          <PaginationUI count={count} />
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
          <Movies movies={movies} />
        </Suspense>
      </Motion>
    </section>
  );
}
