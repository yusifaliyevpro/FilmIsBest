import { groq } from "next-sanity";
import prisma from "./prisma";
import { client } from "@/sanity/lib/client";
import {
  SLUGS_QUERYResult,
  RECENT_MOVIES_QUERYResult,
  COUNT_QUERYResult,
  MOVIES_QUERYResult,
  SITEMAP_DATA_QUERYResult,
  SEQUEL_QUERYResult,
  MOVIE_QUERYResult,
} from "./../../sanity.types";
export async function getSlugs() {
  const SLUGS_QUERY = groq`*[_type=='Movie-studio']|order(_createdAt desc)
      {"slug": slug.current}`;
  const data = await client.fetch<SLUGS_QUERYResult>(
    SLUGS_QUERY,
    {},
    { next: { revalidate: 3600 } },
  );
  return data;
}

export async function getSitemapData() {
  const SITEMAP_DATA_QUERY = groq`*[_type=='Movie-studio']
      {"slug": slug.current, _updatedAt}`;
  const data = await client.fetch<SITEMAP_DATA_QUERYResult>(
    SITEMAP_DATA_QUERY,
    {},
    { next: { revalidate: 3600 } },
  );
  return data;
}

export async function getRecentMovies() {
  const RECENT_MOVIES_QUERY = groq`*[_type=='Movie-studio']|order(_createdAt desc)
      {filmName, poster, "slug": slug.current, imdbpuan, releaseDate}[0...10]`;
  const data = await client.fetch<RECENT_MOVIES_QUERYResult>(
    RECENT_MOVIES_QUERY,
    {},
    { next: { revalidate: 3600 } },
  );
  return data;
}

export async function getCount() {
  const COUNT_QUERY = groq`count(*[_type == "Movie-studio"])`;
  const data = await client.fetch<COUNT_QUERYResult>(
    COUNT_QUERY,
    {},
    { next: { revalidate: 3600 } },
  );
  return data;
}

export async function getMovies() {
  const MOVIES_QUERY = groq`*[_type=='Movie-studio']|order(_createdAt desc){filmName, "poster": poster.asset->url, slug, _id, imdbpuan, imdbID, releaseDate}`;
  const data = await client.fetch<MOVIES_QUERYResult>(
    MOVIES_QUERY,
    {},
    { next: { revalidate: 3600 } },
  );
  return data;
}

export async function getMovie(slug: string) {
  const MOVIE_QUERY = groq`*[_type=='Movie-studio' && slug.current==$slug]
      {filmName, "poster": poster.asset->url, "slug": slug.current, imdbpuan, releaseDate, genre, description, _id, directed, country, movieTime, imdbID, EnglishLink, EnglishSubtitleLink, FraqmanLink, TurkishLink, TurkishSubtitleLink, actors}[0]`;
  const data = await client.fetch<MOVIE_QUERYResult>(
    MOVIE_QUERY,
    { slug },
    { next: { revalidate: 3600 } },
  );
  return data;
}

export async function getSequel({ movieID }: { movieID: string }) {
  const SEQUEL_QUERY = groq`*[_type == "sequel" && references($movieID)] {
          name,
          "movies": movies[]->{
            filmName,
            "slug": slug.current,
            "poster": poster.asset->url,
          }
        }`;
  const data = await client.fetch<SEQUEL_QUERYResult>(
    SEQUEL_QUERY,
    { movieID },
    { next: { revalidate: 3600 } },
  );
  return data[0];
}

export async function getAllMovieRequests() {
  try {
    const movieRequests = await prisma?.movieRequests.findMany();
    return movieRequests;
  } catch (e) {
    console.log(e);
  }
}
