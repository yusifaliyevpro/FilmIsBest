import MovieInfo from "../../components/movieInfo";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Share from "../../components/share";
import SuspenseButton from "../../components/suspenseButton";
import MovieInfoSuspense from "../../components/movieInfoSuspense";
import MovieBar from "../../components/movieBar";
import MovieBarSuspense from "../../components/movieBarSuspense";
import { baseURL } from "../..//lib/bases";
import { MotionDiv } from "../../components/motionDiv";

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
  const locale = params.locale;

  if (!movie) {
    return notFound();
  }
  return {
    title: `${movie.filmName}`,
    url: `${baseURL}/${locale}/movie/${movie.slug}`,
    description: movie.description,
    alternates: {
      canonical: `${baseURL}/movie/${movie.slug}`,
      languages: {
        "en-US": `${baseURL}/en/movie/${movie.slug}`,
        "en-GB": `${baseURL}/en/movie/${movie.slug}`,
        "az-AZ": `${baseURL}/az/movie/${movie.slug}`,
        "tr-TR": `${baseURL}/tr/movie/${movie.slug}`,
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
      url: `${baseURL}/${locale}/movie/${movie.slug}`,
      description: movie.description,
      type: "website",
    },
  };
}

export default async function Movie({ params, searchParams }) {
  const movie = await getData({ params });
  const locale = params.locale;
  const activeKey =
    typeof searchParams.activekey === "string"
      ? searchParams.activekey
      : "english";

  if (!movie) {
    return notFound();
  }

  return (
    <main>
      <div className="sm:relative sm:flex sm:w-auto sm:flex-col sm:items-center">
        <h1 className="relative top-0 z-0 m-auto mx-5 mt-14 w-auto rounded-10 bg-namebg p-3 text-center text-2xl font-bold text-white sm:mx-auto sm:w-200">
          {movie.filmName}
        </h1>
        <MotionDiv
          initial={{ y: 600 }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            duration: 0.3,
            stiffness: 50,
          }}
        >
          <Suspense fallback={<MovieBarSuspense />}>
            <MovieBar movie={movie} query={activeKey} />
          </Suspense>
          <div className="relative mx-3 my-6 flex w-auto flex-row justify-end sm:w-200">
            <Suspense fallback={<SuspenseButton />}>
              <Share movie={movie} locale={locale} />
            </Suspense>
          </div>
        </MotionDiv>
      </div>
      <MotionDiv
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
      </MotionDiv>
    </main>
  );
}
