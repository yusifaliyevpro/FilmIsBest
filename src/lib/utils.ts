import { groq } from "next-sanity";
import prisma from "./prisma";
import { client } from "@/sanity/lib/client";
import {
  RECENT_MOVIES_QUERYResult,
  MOVIES_QUERYResult,
  SEQUEL_QUERYResult,
  MOVIE_QUERYResult,
} from "./../../sanity.types";

export async function getRecentMovies() {
  const RECENT_MOVIES_QUERY = groq`*[_type=='Movie-studio']|order(_createdAt desc)
      {filmName, "poster": poster.asset->url, "posterlqip": (poster.asset->metadata).lqip, "slug": slug.current, imdbpuan, releaseDate}[0...10]`;
  const data = await client.fetch<RECENT_MOVIES_QUERYResult>(
    RECENT_MOVIES_QUERY,
    {},
    { next: { revalidate: 3600 }, cache: "force-cache" },
  );
  return data;
}

export async function getMovies() {
  const MOVIES_QUERY = groq`*[_type=='Movie-studio']|order(_createdAt desc){filmName, "poster": poster.asset->url, "posterlqip": (poster.asset->metadata).lqip, "slug": slug.current, _id, imdbpuan,_updatedAt, imdbID, releaseDate}`;
  const data = await client.fetch<MOVIES_QUERYResult>(
    MOVIES_QUERY,
    {},
    { next: { revalidate: 3600 }, cache: "force-cache" },
  );
  return data;
}

export async function getMovie(slug: string) {
  const MOVIE_QUERY = groq`*[_type=='Movie-studio' && slug.current==$slug]
      {filmName, "poster": poster.asset->url, "posterlqip": (poster.asset->metadata).lqip, "slug": slug.current, imdbpuan, releaseDate, genre, description, _id, directed, country, movieTime, imdbID, EnglishLink, EnglishSubtitleLink, FraqmanLink, TurkishLink, TurkishSubtitleLink, actors}[0]`;
  const data = await client.fetch<MOVIE_QUERYResult>(
    MOVIE_QUERY,
    { slug },
    { next: { revalidate: 3600 }, cache: "force-cache" },
  );
  return data;
}

export async function getSequel(movieID: string) {
  const SEQUEL_QUERY = groq`*[_type == "sequel" && references($movieID)] {
          name,
          "movies": movies[]->{
            filmName,
            "slug": slug.current,
            "poster": poster.asset->url,
            "posterlqip": (poster.asset->metadata).lqip
          }| order(releaseDate desc)
        }[0]`;
  const data = await client.fetch<SEQUEL_QUERYResult>(
    SEQUEL_QUERY,
    { movieID },
    { next: { revalidate: 3600 }, cache: "force-cache" },
  );
  return data;
}

export async function getAllMovieRequests() {
  try {
    const movieRequests = await prisma?.movieRequests.findMany();
    return movieRequests;
  } catch (e) {
    console.log(e);
  }
}
