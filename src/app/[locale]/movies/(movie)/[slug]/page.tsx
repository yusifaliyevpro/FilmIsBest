import MovieBar from "@/components/movie-bar";
import MovieInfo from "@/components/movie-info";
import Sequel from "@/components/sequel";
import { getMovie } from "@/data-access/sanity/movies/get";
import { getSequel } from "@/data-access/sanity/sequel/get";
import { Locale } from "@/i18n/routing";
import { BASE_URL } from "@/lib/constants";
import { Button } from "@heroui/button";
import * as motion from "motion/react-client";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const Share = dynamic(() => import("@/components/share"), {
  loading: () => <Button color="primary" className="h-10 w-28" />,
});

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const movie = await getMovie(slug);
  if (!movie) return notFound();

  return {
    metadataBase: new URL(BASE_URL),
    title: movie.filmName,
    description: movie.description,
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

type MoviePageProps = { params: Promise<{ locale: Locale; slug: string }> };
export default async function Page({ params }: MoviePageProps) {
  const { locale, slug } = await params;
  const [movie, sequel] = await Promise.all([getMovie(slug), getSequel(slug)]);
  if (!movie) return notFound();

  return (
    <>
      <div className="sm:relative sm:flex sm:w-auto sm:flex-col sm:items-center">
        <h1 className="text-shadow rounded-10 shadow-small relative top-0 z-0 m-auto mx-5 mt-14 w-auto bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 p-3 text-center text-3xl font-bold text-white drop-shadow-2xl sm:mx-auto sm:w-200">
          {movie.filmName}
        </h1>
        <motion.div
          animate={{ y: 0 }}
          initial={{ y: 600 }}
          transition={{ type: "spring", duration: 0.3, stiffness: 50 }}
        >
          <MovieBar movie={movie} />
          <Share locale={locale} movie={movie} />
        </motion.div>
      </div>
      <motion.div
        animate={{ y: 0 }}
        initial={{ y: 600 }}
        transition={{ type: "spring", duration: 0.3, stiffness: 50 }}
      >
        <Sequel currentSlug={movie.slug} sequel={sequel} />
        <MovieInfo movie={movie} />
      </motion.div>
    </>
  );
}
