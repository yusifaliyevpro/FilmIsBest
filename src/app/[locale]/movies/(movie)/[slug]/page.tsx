import { Motion } from "@/components/Motion";
import MovieBar from "@/components/MovieBar";
import MovieInfo from "@/components/MovieInfo";
import Sequels from "@/components/Sequels";
import Share from "@/components/Share";
import { MovieInfoSuspense } from "@/components/SuspenseLayouts";
import { Locales } from "@/lib/constants";
import { getMovie, getSlugs } from "@/lib/utils";
import { I18nProviderClient } from "@/locales/client";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locales; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const movie = await getMovie(slug);
  if (!movie) {
    return notFound();
  }
  return {
    title: movie.filmName,
    description: movie.description,
    alternates: {
      canonical: `/movies/${movie.slug}`,
      languages: {
        "en-US": `/en/movies/${movie.slug}`,
        "en-GB": `/en/movies/${movie.slug}`,
        "az-AZ": `/az/movies/${movie.slug}`,
        "tr-TR": `/tr/movies/${movie.slug}`,
      },
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
      `${movie.filmName}`,
      `${movie.actors?.trim().replace(/!/g, "•")}`,
    ],
    openGraph: {
      title: `FilmIsBest | ${movie.filmName}`,
      url: `/movies/${movie.slug}`,
      description: movie.description || "",
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const movieSlugs = await getSlugs();
  const staticParams = movieSlugs.flatMap((movieSlug) => [
    { locale: "az", slug: movieSlug.slug },
    { locale: "en", slug: movieSlug.slug },
    { locale: "tr", slug: movieSlug.slug },
  ]);
  return staticParams;
}

export default async function Movie({
  params,
}: {
  params: Promise<{ locale: Locales; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const movie = await getMovie(slug);
  if (!movie) {
    return notFound();
  }
  return (
    <>
      <div className="sm:relative sm:flex sm:w-auto sm:flex-col sm:items-center">
        <h1 className="text-shadow relative top-0 z-0 m-auto mx-5 mt-14 w-auto rounded-10 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-3 text-center text-3xl font-bold text-white shadow-small drop-shadow-2xl sm:mx-auto sm:w-200">
          {movie.filmName}
        </h1>
        <I18nProviderClient locale={locale}>
          <Motion
            initial={{ y: 600 }}
            animate={{ y: 0 }}
            transition={{
              type: "spring",
              duration: 0.3,
              stiffness: 50,
            }}
          >
            <Suspense
              fallback={
                <div className="relative mx-auto mt-12 flex h-auto w-auto flex-col rounded-10 px-3 sm:h-[560px] sm:w-200">
                  <div className="relative mb-1 h-[44px] min-w-max animate-pulse overflow-x-hidden rounded-2xl bg-gray-200 sm:mb-0 sm:w-[812px]"></div>
                  <div className="z-35 relative bottom-0 left-0 mx-auto mt-0 h-60 w-full animate-pulse select-none rounded-b-10 border-none bg-gray-200 sm:absolute sm:h-102 sm:w-200"></div>
                </div>
              }
            >
              <MovieBar movie={movie} />
            </Suspense>
            <div className="relative mx-3 my-6 flex w-auto flex-row justify-end sm:w-200">
              <Share movie={movie} locale={locale} />
            </div>
          </Motion>
        </I18nProviderClient>
      </div>
      <Motion
        initial={{ y: 600 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          duration: 0.3,
          stiffness: 50,
        }}
      >
        <Suspense fallback={<p>Loading...</p>}>
          <Sequels movieID={movie._id} currentSlug={movie.slug} />
        </Suspense>
        <Suspense fallback={<MovieInfoSuspense />}>
          <MovieInfo movie={movie} />
        </Suspense>
      </Motion>
    </>
  );
}
