"use server";

import { client } from "@/sanity/lib/client";
import { MovieQueryResult, MoviesQueryResult, RecentlyAddedMoviesQueryResult } from "@/sanity/types";
import { defineQuery } from "next-sanity";
import { cacheLife } from "next/cache";

export async function getMovies() {
  "use cache";
  cacheLife("hours");

  const MoviesQuery = defineQuery(`
    *[_type == 'Movie-studio'] 
      | order(_createdAt desc) {
        filmName,
        "poster": poster.asset->url,
        "posterlqip": poster.asset->metadata.lqip,
        "slug": slug.current,
        _id,
        imdbpuan,
        _updatedAt,
        imdbID,
        releaseDate
      }
  `);

  const data = await client.fetch<MoviesQueryResult>(MoviesQuery, {});

  return data;
}

export async function getMovie(slug: string) {
  "use cache";
  cacheLife("hours");

  const MovieQuery = defineQuery(`
    *[_type == 'Movie-studio' && slug.current == $slug][0] {
      filmName,
      "poster": poster.asset->url,
      "posterlqip": poster.asset->metadata.lqip,
      "slug": slug.current,
      imdbpuan,
      releaseDate,
      genre,
      description,
      _id,
      directed,
      country,
      movieTime,
      imdbID,
      EnglishLink,
      EnglishSubtitleLink,
      FraqmanLink,
      TurkishLink,
      TurkishSubtitleLink,
      actors
    }
  `);

  const data = await client.fetch<MovieQueryResult>(MovieQuery, { slug });

  return data;
}

export async function getRecentlyAddedMovies() {
  "use cache";
  cacheLife("hours");

  const RecentlyAddedMoviesQuery = defineQuery(`
    *[_type == 'Movie-studio'] 
      | order(_createdAt desc)[0...10] {
        filmName,
        "poster": poster.asset->url,
        "posterlqip": poster.asset->metadata.lqip,
        "slug": slug.current,
        imdbpuan,
        releaseDate
      }
  `);

  const data = await client.fetch<RecentlyAddedMoviesQueryResult>(RecentlyAddedMoviesQuery, {});

  return data;
}
