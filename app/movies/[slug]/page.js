import MovieBar from "@/app/components/movieBar";
import MovieInfo from "@/app/components/movieInfo";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

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
  const ogImage1 = [
    {
      url: `https://next.filmisbest.com/_next/image?url=${movie.poster}&w=640&q=75`,
      width: 1200,
      height: 630,
      alt: movie.filmName,
    },
    {
      url: movie.poster,
      width: 1200,
      height: 630,
      alt: movie.filmName,
    },
  ];
  return {
    title: `FilmIsBest | ${movie.filmName}`,
    description: movie.description,
    openGraph: {
      images: ogImage1,
      description: movie.description,
      type: "website",
      url: `https://next.filmisbest.com/movies/${movie.slug}`,
    },
  };
}

export default async function Movie({ params }) {
  const movie = await getData({ params });
  return (
    <main>
      <MovieBar movie={movie}/>
      <MovieInfo movie={movie}/>
    </main>
  );
}
