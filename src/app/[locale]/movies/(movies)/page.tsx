import { Motion } from "@/components/Motion";
import Movies from "@/components/Movies";
import PaginationUI from "@/components/Pagination";
import Search from "@/components/Search";
import { routing } from "@/i18n/routing";
import { getCount, getMovies } from "@/lib/utils";
import { I18nProviderClient } from "@/locales/client";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  setRequestLocale((await params).locale);
  const t = await getTranslations("MetaData.Movies");
  return {
    title: t("title"),
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
  return routing.locales.map((locale) => ({ locale }));
}

export default async function MoviesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  setRequestLocale((await params).locale);
  const { locale } = await params;

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
            <Search />
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
