/**
 * Single source of truth for movie genres.
 *
 * These are the movie-relevant IMDb/OMDb genres, spelled exactly as the OMDb
 * API returns them so autofilled values line up with the Studio options. The
 * pure TV/adult formats (Adult, Game-Show, News, Reality-TV, Talk-Show) are
 * intentionally excluded since this catalogue only holds films.
 *
 * Used by the Studio schema, the OMDb autofill filter and the MCP tools. The
 * localized display names live in `messages/*.json` under `Movie.Genres`, keyed
 * by the lowercased genre (e.g. "sci-fi", "film-noir").
 */
export const GENRE_LIST = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Thriller",
  "War",
  "Western",
] as const;

export type Genre = (typeof GENRE_LIST)[number];
