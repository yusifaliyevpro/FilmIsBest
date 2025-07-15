import MovieBar from "@/components/MovieBar";
import MovieInfo from "@/components/MovieInfo";
import Sequels from "@/components/Sequels";
import Share from "@/components/Share";
import { LoadingButton } from "@/components/SuspenseFallBacks/LoadingButton";
import { LoadingMovieBar } from "@/components/SuspenseFallBacks/LoadingMovieBar";
import { LoadingMovieInfo } from "@/components/SuspenseFallBacks/LoadingMovieInfo";
import { LoadingSequel } from "@/components/SuspenseFallBacks/LoadingSequel";
import { getMovie } from "@/data-access/sanity/movies/get";
import { getSequel } from "@/data-access/sanity/sequel/get";
import { Locale } from "@/i18n/routing";
import { BASE_URL } from "@/lib/constants";
import * as motion from "motion/react-client";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function Movie({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const movie = await getMovie(slug);
  if (!movie) return notFound();
  const sequelPromise = getSequel(movie._id);

  return (
    <>
      <div className="sm:relative sm:flex sm:w-auto sm:flex-col sm:items-center">
        <h1 className="text-shadow relative top-0 z-0 m-auto mx-5 mt-14 w-auto rounded-10 bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 p-3 text-center text-3xl font-bold text-white shadow-small drop-shadow-2xl sm:mx-auto sm:w-200">
          {movie.filmName}
        </h1>
        <motion.div
          animate={{ y: 0 }}
          initial={{ y: 600 }}
          transition={{ type: "spring", duration: 0.3, stiffness: 50 }}
        >
          <Suspense fallback={<LoadingMovieBar />}>
            <MovieBar movie={movie} />
          </Suspense>
          <Suspense fallback={<LoadingButton color="primary" />}>
            <Share locale={locale} movie={movie} />
          </Suspense>
        </motion.div>
      </div>
      <motion.div
        animate={{ y: 0 }}
        initial={{ y: 600 }}
        transition={{ type: "spring", duration: 0.3, stiffness: 50 }}
      >
        <Suspense fallback={<LoadingSequel />}>
          <Sequels currentSlug={movie.slug} sequelPromise={sequelPromise} />
        </Suspense>
        <Suspense fallback={<LoadingMovieInfo />}>
          <MovieInfo movie={movie} />
        </Suspense>
      </motion.div>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const movie = await getMovie(slug);
  if (!movie) {
    return notFound();
  }
  return {
    metadataBase: new URL(BASE_URL),
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
