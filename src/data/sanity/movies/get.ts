// import "server-only";
import { cacheLife } from "next/cache";
import { client } from "@/sanity/lib/client";
import {
  AllMoviesQueryResult,
  MovieQueryResult,
  MoviesQueryResult,
  RecentlyAddedMoviesQueryResult,
} from "@/sanity/types";
import { defineQuery } from "next-sanity";

// Lean projection used only by the search dropdown. Cached for an hour so that
// every keystroke-driven search reuses the same dataset instead of refetching.
export async function getAllMovies() {
  "use cache";
  cacheLife("hours");

  const AllMoviesQuery = defineQuery(`
    *[_type == 'Movie-studio']
      | order(_createdAt desc) {
        filmName,
        "poster": poster.asset->url,
        "posterlqip": poster.asset->metadata.lqip,
        "slug": slug.current,
        releaseDate,
        imdbID
      }
  `);

  const data = await client.fetch<AllMoviesQueryResult>(AllMoviesQuery, {});

  return data;
}

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
      series,
      tmdbId,
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
      FraqmanLink,
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
