import Movies from "@/components/Movies";
import PaginationUI from "@/components/Pagination";
import Search from "@/components/Search";
import { getMovies } from "@/data-access/sanity/movies/get";
import { Locale, locales } from "@/i18n/routing";
import { BASE_URL } from "@/lib/constants";
import * as motion from "motion/react-client";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

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

export default async function MoviesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const movies = await getMovies();
  return (
    <section className="justify-content-center relative mx-auto mt-6 mb-20 flex flex-col items-center justify-center">
      <div className="relative flex w-full flex-col items-center justify-center">
        <Search />
        <PaginationUI count={movies.length} />
      </div>
      <motion.div
        initial={{ y: 600 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 55 }}
      >
        <div className="justify-content-center mx-2.5 flex min-h-[300vh] flex-wrap items-center justify-center gap-x-10">
          <Movies movies={movies} />
        </div>
      </motion.div>
    </section>
  );
}
