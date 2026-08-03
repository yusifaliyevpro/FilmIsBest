import { defineQuery } from "next-sanity";
import { cacheLife, cacheTag } from "next/cache";
import { cacheTags } from "@/lib/cache-tags";
import { client } from "@/sanity/lib/client";
import type {
  AllMoviesQueryResult,
  MovieQueryResult,
  MoviesQueryResult,
  RecentlyAddedMoviesQueryResult,
} from "@/sanity/types";

// Lean projection used only by the search dropdown. Cached for an hour so that
// every keystroke-driven search reuses the same dataset instead of refetching.
export async function getAllMoviesForSearch() {
  "use cache";
  cacheLife("max");
  cacheTag(cacheTags.movies);

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
  cacheLife("max");
  cacheTag(cacheTags.movies);

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
  cacheLife("max");
  cacheTag(cacheTags.movie(slug));

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
  cacheLife("max");
  cacheTag(cacheTags.movies);

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
