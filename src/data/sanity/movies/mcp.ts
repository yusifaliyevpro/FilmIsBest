import "server-only";
import { cacheLife } from "next/cache";
import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import { getMovie, getRecentlyAddedMovies } from "./get";

export type MCPMovieListItem = {
  filmName: string;
  slug: string;
  imdbID: string;
  imdbpuan: number;
  releaseDate: number;
  genre: string[];
  directed: string;
  movieTime: number;
};

export type ListMoviesForMCPParams = {
  genres?: string[];
  minImdbRating?: number;
  fromYear?: number;
  toYear?: number;
  nameQuery?: string;
  limit?: number;
};

export async function listMoviesForMCP(params: ListMoviesForMCPParams = {}) {
  "use cache";
  cacheLife("hours");

  const limit = Math.min(Math.max(params.limit ?? 50, 1), 200);
  const hasGenres = Array.isArray(params.genres) && params.genres.length > 0;
  const genres = hasGenres ? params.genres! : null;
  const minImdbRating = params.minImdbRating ?? null;
  const fromYear = params.fromYear ?? null;
  const toYear = params.toYear ?? null;
  const nameQuery = params.nameQuery?.trim() ? `${params.nameQuery.trim()}*` : null;

  const query = defineQuery(`
    *[_type == 'Movie-studio'
      && ($genres == null || count((genre[])[@ in $genres]) > 0)
      && ($minImdbRating == null || imdbpuan >= $minImdbRating)
      && ($fromYear == null || releaseDate >= $fromYear)
      && ($toYear == null || releaseDate <= $toYear)
      && ($nameQuery == null || filmName match $nameQuery)
    ]
      | order(_createdAt desc)[0...$limit] {
        filmName,
        "slug": slug.current,
        imdbID,
        imdbpuan,
        releaseDate,
        genre,
        directed,
        movieTime
      }
  `);

  return client.fetch<MCPMovieListItem[]>(query, {
    genres,
    minImdbRating,
    fromYear,
    toYear,
    nameQuery,
    limit,
  });
}

export async function getMovieDetailForMCP(slug: string) {
  const movie = await getMovie(slug);
  if (!movie) return null;
  return {
    filmName: movie.filmName,
    slug: movie.slug,
    imdbID: movie.imdbID,
    imdbpuan: movie.imdbpuan,
    releaseDate: movie.releaseDate,
    genre: movie.genre,
    directed: movie.directed,
    actors: movie.actors,
    country: movie.country,
    movieTime: movie.movieTime,
    description: movie.description,
  };
}

export async function getRecentlyAddedForMCP(limit = 10) {
  const capped = Math.min(Math.max(limit, 1), 50);
  const movies = await getRecentlyAddedMovies();
  return movies.slice(0, capped).map((m) => ({
    filmName: m.filmName,
    slug: m.slug,
    imdbpuan: m.imdbpuan,
    releaseDate: m.releaseDate,
  }));
}
