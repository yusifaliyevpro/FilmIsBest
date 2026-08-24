import { Button } from "@heroui/button";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { cacheLife, cacheTag } from "next/cache";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import MovieBar from "@/components/movie-bar";
import MovieInfo from "@/components/movie-info";
import Sequel from "@/components/sequel";
import { getMovie, getRecentlyAddedMovies } from "@/data/sanity/movies/get";
import { getSequel } from "@/data/sanity/sequel/get";
import { routing } from "@/i18n/routing";
import { cacheTags } from "@/lib/cache-tags";
import { BASE_URL } from "@/lib/constants";
import { buildMetadata, movieJsonLd } from "@/lib/seo";

const Share = dynamic(() => import("@/components/share"), {
  loading: () => <Button color="primary" className="h-10 w-28" />,
});

export async function generateMetadata({ params }: PageProps<"/[locale]/movies/[slug]">): Promise<Metadata> {
  "use cache";
  cacheLife("max");

  const [locale, { slug }] = await Promise.all([getLocale(), params]);
  cacheTag(cacheTags.movie(slug));
  const movie = await getMovie(slug);
  if (!movie) return notFound();

  return buildMetadata({
    locale,
    path: `/movies/${movie.slug}`,
    title: movie.filmName,
    description: movie.description,
    keywords: [
      movie.filmName,
      `watch ${movie.filmName} online`,
      `${movie.filmName} trailer`,
      `${movie.filmName} full movie`,
      ...(movie.genre ?? []),
      ...(movie.actors ?? []),
    ],
  });
}

export async function generateStaticParams() {
  const movies = await getRecentlyAddedMovies();
  return routing.locales.map((locale) => movies.map((movie) => ({ locale, slug: movie.slug }))).flat();
}

export default async function Page({ params }: PageProps<"/[locale]/movies/[slug]">) {
  "use cache";
  cacheLife("max");

  const [locale, { slug }] = await Promise.all([getLocale(), params]);
  cacheTag(cacheTags.movie(slug), cacheTags.sequels);
  const [movie, sequel] = await Promise.all([getMovie(slug), getSequel(slug)]);
  if (!movie) return notFound();

  const jsonLd = movieJsonLd(movie, `${BASE_URL}/${locale}/movies/${movie.slug}`);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
