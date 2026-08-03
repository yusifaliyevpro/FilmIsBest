import { Button } from "@heroui/button";
import type { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import MovieBar from "@/components/movie-bar";
import MovieInfo from "@/components/movie-info";
import Sequel from "@/components/sequel";
import { getMovie, getRecentlyAddedMovies } from "@/data/sanity/movies/get";
import { getSequel } from "@/data/sanity/sequel/get";
import { routing, validateLocale } from "@/i18n/routing";
import { cacheTags } from "@/lib/cache-tags";
import { BASE_URL } from "@/lib/constants";

const Share = dynamic(() => import("@/components/share"), {
  loading: () => <Button color="primary" className="h-10 w-28" />,
});

export async function generateMetadata({ params }: PageProps<"/[locale]/movies/[slug]">): Promise<Metadata> {
  "use cache";
  cacheLife("max");

  const { slug } = await params;
  cacheTag(cacheTags.movie(slug));
  const movie = await getMovie(slug);
  if (!movie) return notFound();

  return {
    metadataBase: BASE_URL,
    title: movie.filmName,
    description: movie.description,
    keywords: [
      "FilmIsBest",
      "Film",
      "Filmlər səhifəsi",
      "Movie",
      "filmisbest.vercel.app",
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
      movie.filmName,
      movie.actors?.join(" • "),
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
  const movies = await getRecentlyAddedMovies();
  return routing.locales.map((locale) => movies.map((movie) => ({ locale, slug: movie.slug }))).flat();
}

export default async function Page({ params }: PageProps<"/[locale]/movies/[slug]">) {
  "use cache";
  cacheLife("max");

  const { locale, slug } = await params;
  validateLocale(locale);
  // `sequels` so a sequel-doc change busts this page (it renders <Sequel/>).
  cacheTag(cacheTags.movie(slug), cacheTags.sequels);
  const [movie, sequel] = await Promise.all([getMovie(slug), getSequel(slug)]);
  if (!movie) return notFound();

  return (
    <>
      <div className="sm:relative sm:flex sm:w-auto sm:flex-col sm:items-center">
        <h1 className="text-shadow relative top-0 z-0 m-auto mx-5 mt-14 w-auto rounded-xl bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 p-3 text-center text-3xl font-bold text-white shadow-small drop-shadow-2xl sm:mx-auto sm:w-209">
          {movie.filmName}
        </h1>
        <div className="duration-[1.45s] ease-spring-50 spring-up">
          <MovieBar movie={movie}>
            <Share locale={locale} movie={movie} />
          </MovieBar>
        </div>
      </div>
      <div className="duration-[1.45s] ease-spring-50 spring-up">
        <Sequel currentSlug={movie.slug} sequel={sequel} />
        <MovieInfo movie={movie} />
      </div>
    </>
  );
}
