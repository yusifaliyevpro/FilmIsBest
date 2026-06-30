"use server";

import Fuse from "fuse.js";
import { getAllMovies } from "@/data/sanity/movies/get";

// Runs the fuzzy search on the server against the hourly-cached movie list and
// returns only the matching results, so the client never receives the full set.
export async function searchMovies(query: string) {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const movies = await getAllMovies();

  const fuse = new Fuse(movies, {
    keys: ["filmName", "imdbID"],
    threshold: 0.4,
  });

  return fuse.search(trimmed, { limit: 8 }).map((result) => result.item);
}
