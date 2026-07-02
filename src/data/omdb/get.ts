"use server";

import { cacheLife } from "next/cache";
import { isSanityProjectMember } from "@/sanity/lib/verifyUser";
import { decodeOMDbStrings } from "./decode";

export async function getOMDBDataById(imdbID: string, token: string) {
  "use cache";
  cacheLife("hours");

  const isMember = await isSanityProjectMember(token);
  if (!isMember) return null;

  const OMDB_API_KEY = process.env.OMDB_API_KEY;
  const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`);
  const data: OMDbMovieData = await response.json();
  return decodeOMDbStrings(data);
}

export type OMDbSearchItem = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

/**
 * Searches OMDb by movie title. Returns at most `limit` movie results (poster,
 * title, year and imdbID) for the caller to pick from. Returns null when the
 * caller isn't a project member.
 */
export async function searchOMDBByTitle(query: string, token: string, limit = 5): Promise<OMDbSearchItem[] | null> {
  "use cache";
  cacheLife("hours");

  const isMember = await isSanityProjectMember(token);
  if (!isMember) return null;

  const OMDB_API_KEY = process.env.OMDB_API_KEY;
  const response = await fetch(
    `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&type=movie&apikey=${OMDB_API_KEY}`,
  );
  const data: { Search?: OMDbSearchItem[]; Response: string } = await response.json();
  if (data.Response === "False" || !data.Search) return [];
  return data.Search.slice(0, limit);
}

type OMDbMovieData = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};
