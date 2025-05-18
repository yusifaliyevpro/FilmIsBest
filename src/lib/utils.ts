"use server";

import prisma from "./prisma";
import { client } from "@/sanity/lib/client";
import type { RECENT_MOVIES_QUERYResult, MOVIES_QUERYResult, SEQUEL_QUERYResult, MOVIE_QUERYResult } from "@/sanity/types";
import { groq } from "next-sanity";
import { cache } from "react";

export async function getRecentlyAddedMovies() {
  const RECENT_MOVIES_QUERY = groq`*[_type=='Movie-studio']|order(_createdAt desc)
      {filmName, "poster": poster.asset->url, "posterlqip": (poster.asset->metadata).lqip, 
      "slug": slug.current, imdbpuan, releaseDate}[0...10]`;
  const data = await client.fetch<RECENT_MOVIES_QUERYResult>(
    RECENT_MOVIES_QUERY,
    {},
    { next: { revalidate: 3600 }, cache: "force-cache" },
  );
  return data;
}

export async function getMovies() {
  const MOVIES_QUERY = groq`*[_type=='Movie-studio']|order(_createdAt desc){filmName, "poster": poster.asset->url, 
          "posterlqip": (poster.asset->metadata).lqip, "slug": slug.current, 
          _id, imdbpuan,_updatedAt, imdbID, releaseDate}`;
  const data = await client.fetch<MOVIES_QUERYResult>(MOVIES_QUERY, {}, { next: { revalidate: 3600 }, cache: "force-cache" });
  return data;
}

export const getMovie = cache(async (slug: string) => {
  const MOVIE_QUERY = groq`*[_type=='Movie-studio' && slug.current==$slug]
      {filmName, "poster": poster.asset->url, "posterlqip": (poster.asset->metadata).lqip, "slug": slug.current, 
      imdbpuan, releaseDate, genre, description, _id, directed, 
      country, movieTime, imdbID, EnglishLink, EnglishSubtitleLink, 
      FraqmanLink, TurkishLink, TurkishSubtitleLink, actors}[0]`;

  return await client.fetch<MOVIE_QUERYResult>(MOVIE_QUERY, { slug });
});

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

  return await client.fetch<SEQUEL_QUERYResult>(SEQUEL_QUERY, { movieID });
}

export async function getAllMovieRequests() {
  return await prisma.movieRequests.findMany();
}
