import MovieInfo from "@/app/components/movieInfo";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Share from "@/app/components/share";
import SuspenseButton from "@/app/components/suspenseButton";
import MovieInfoSuspense from "@/app/components/movieInfoSuspense";
import MovieBar from "@/app/components/movieBar";
import { BASE_URL } from "@/app/lib/constants";
import { Motion } from "@/app/components/Motion";
import { I18nProviderClient } from "@/locales/client";

/**
 * Fetches data for a movie studio based on the provided slug parameter.
 * @param {Object} params - An object containing parameters for the query.
 * @returns {Promise<Object>} - A promise that resolves to the fetched data.
 */
export async function getData({ params }) {
  const query = `*[_type=='Movie-studio' && slug.current=='${params.slug}']
    {filmName, "poster": poster.asset->url, "slug": slug.current, imdbpuan, releaseDate, genre, description, directed, country, movieTime, imdbID, EnglishLink, EnglishSubtitleLink, FraqmanLink, TurkishLink, TurkishSubtitleLink, actors}[0]`;
  const data = await client.fetch(
    query,
    { cache: "force-cache" },
    { next: { revalidate: 3600 } },
  );
  return data;
}

export async function generateMetadata({ params }) {
  const movie = await getData({ params });
  if (!movie) {
    return notFound();
  }
  return {
    title: `${movie.filmName}`,
    url: `${BASE_URL}/movie/${movie.slug}`,
    description: movie.description,
    alternates: {
      canonical: `${BASE_URL}/movie/${movie.slug}`,
      languages: {
        "en-US": `${BASE_URL}/en/movie/${movie.slug}`,
        "en-GB": `${BASE_URL}/en/movie/${movie.slug}`,
        "az-AZ": `${BASE_URL}/az/movie/${movie.slug}`,
        "tr-TR": `${BASE_URL}/tr/movie/${movie.slug}`,
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
      `${movie.actors.trim().replace(/!/g, "•")}`,
    ],
    openGraph: {
      title: `FilmIsBest | ${movie.filmName}`,
      url: `${BASE_URL}/movie/${movie.slug}`,
      description: movie.description,
      type: "website",
    },
  };
}

export default async function Movie({ params, searchParams }) {
  const movie = await getData({ params });
  const locale = params.locale;

  if (!movie) {
    return notFound();
  }
  return (
    <>
      <div className="sm:relative sm:flex sm:w-auto sm:flex-col sm:items-center">
        <h1 className="relative top-0 z-0 m-auto mx-5 mt-14 w-auto rounded-10 bg-namebg p-3 text-center text-2xl font-bold text-white sm:mx-auto sm:w-200">
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
              <Suspense fallback={<SuspenseButton />}>
                <Share movie={movie} locale={locale} />
              </Suspense>
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
        <Suspense fallback={<MovieInfoSuspense />}>
          <MovieInfo movie={movie} />
        </Suspense>
      </Motion>
    </>
  );
}
