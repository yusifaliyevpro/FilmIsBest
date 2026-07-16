import { cacheLife } from "next/cache";
import { GENRE_LIST, type Genre } from "@/lib/genres";
import { client } from "@/sanity/lib/client";
import { getMovie } from "./get";

/**
 * Every field the MCP tools can return. Declared as a const tuple so it can back
 * both the GROQ projection map and a `z.literal` in the route.
 */
export const MOVIE_FIELD_NAMES = [
  "filmName",
  "slug",
  "series",
  "imdbID",
  "imdbpuan",
  "releaseDate",
  "genre",
  "directed",
  "movieTime",
  "actors",
  "country",
  "description",
  "poster",
] as const;
export type MovieField = (typeof MOVIE_FIELD_NAMES)[number];

/**
 * Maps each field to its GROQ projection snippet. The AI picks which of these it
 * wants per request, so responses stay small and we can return the whole
 * catalogue without blowing the token budget.
 */
const MOVIE_FIELDS: Record<MovieField, string> = {
  filmName: "filmName",
  slug: '"slug": slug.current',
  imdbID: "imdbID",
  imdbpuan: "imdbpuan",
  releaseDate: "releaseDate",
  genre: "genre",
  directed: "directed",
  movieTime: "movieTime",
  actors: "actors",
  country: "country",
  description: "description",
  poster: '"poster": poster.asset->url',
  series: "series",
};

/** The fixed genre set, shared with the Studio schema and OMDb autofill. */
export const MOVIE_GENRES = GENRE_LIST;
type MovieGenre = Genre;

export const MOVIE_SORTS = ["recent", "rating", "year"] as const;
type MovieSort = (typeof MOVIE_SORTS)[number];

const SORT_ORDERS: Record<MovieSort, string> = {
  recent: "_createdAt desc",
  rating: "imdbpuan desc",
  year: "releaseDate desc",
};

type MovieRecord = Partial<Record<MovieField, unknown>>;

/** Builds a GROQ projection from the requested fields (ignoring unknown ones). */
function buildProjection(fields: MovieField[]): string {
  const valid = fields.filter((f) => f in MOVIE_FIELDS);
  const selected = valid.length > 0 ? valid : (["filmName", "slug"] as MovieField[]);
  return selected.map((f) => MOVIE_FIELDS[f]).join(", ");
}

/** GROQ predicate shared by list_movies and count_movies. */
const MOVIE_FILTER = `_type == 'Movie-studio'
      && ($genres == null || count((genre[])[@ in $genres]) > 0)
      && ($minImdbRating == null || imdbpuan >= $minImdbRating)
      && ($fromYear == null || releaseDate >= $fromYear)
      && ($toYear == null || releaseDate <= $toYear)
      && ($nameQuery == null || filmName match $nameQuery)
      && ($series == null || coalesce(series, false) == $series)`;

export type MovieFilterParams = {
  genres?: MovieGenre[];
  minImdbRating?: number;
  fromYear?: number;
  toYear?: number;
  nameQuery?: string;
  series?: boolean;
};

/** Normalizes the filter inputs into the GROQ params MOVIE_FILTER expects. */
function buildFilterParams(params: MovieFilterParams) {
  const hasGenres = Array.isArray(params.genres) && params.genres.length > 0;
  return {
    genres: hasGenres ? params.genres! : null,
    minImdbRating: params.minImdbRating ?? null,
    fromYear: params.fromYear ?? null,
    toYear: params.toYear ?? null,
    nameQuery: params.nameQuery?.trim() ? `${params.nameQuery.trim()}*` : null,
    // undefined means "either" — null disables the predicate for both movies and series.
    series: params.series ?? null,
  };
}

export type ListMoviesForMCPParams = MovieFilterParams & {
  fields: MovieField[];
  sort?: MovieSort;
  limit?: number;
};

export async function listMoviesForMCP(params: ListMoviesForMCPParams) {
  "use cache";
  cacheLife("hours");

  // Default to the whole catalogue; only cap to keep a single response sane.
  const limit = Math.min(Math.max(params.limit ?? 1000, 1), 1000);
  const projection = buildProjection(params.fields);
  // `order` comes from a fixed map keyed by a validated sort value, so it's safe
  // to interpolate (GROQ can't parameterize ordering).
  const order = SORT_ORDERS[params.sort ?? "recent"];

  const query = `
    *[${MOVIE_FILTER}]
      | order(${order})[0...$limit] {
        ${projection}
      }
  `;

  const movies = await client.fetch<MovieRecord[]>(query, {
    ...buildFilterParams(params),
    limit,
  });

  return movies;
}

export async function countMoviesForMCP(params: MovieFilterParams = {}) {
  "use cache";
  cacheLife("hours");

  const query = `count(*[${MOVIE_FILTER}])`;
  return client.fetch<number>(query, buildFilterParams(params));
}

export async function getRecentlyAddedForMCP(fields: MovieField[], limit = 10) {
  "use cache";
  cacheLife("hours");

  const capped = Math.min(Math.max(limit, 1), 100);
  const projection = buildProjection(fields);

  const query = `
    *[_type == 'Movie-studio']
      | order(_createdAt desc)[0...$limit] {
        ${projection}
      }
  `;

  const movies = await client.fetch<MovieRecord[]>(query, { limit: capped });
  return movies;
}

export async function getMovieDetailForMCP(slug: string, fields?: MovieField[]): Promise<MovieRecord | null> {
  const movie = await getMovie(slug);
  if (!movie) return null;

  const selected = fields && fields.length > 0 ? fields : MOVIE_FIELD_NAMES;
  const result: MovieRecord = {};
  for (const field of selected) {
    if (field in movie) result[field] = (movie as Record<string, unknown>)[field];
  }
  return result;
}
