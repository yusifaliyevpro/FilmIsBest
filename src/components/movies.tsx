"use client";

import { useQueryState } from "nuqs";
import { ViewTransition, useDeferredValue } from "react";
import MovieCard from "@/components/movie-card";
import { searchParams } from "@/lib/searchParams";
import type { MoviesQueryResult } from "@/sanity/types";

export default function Movies({ movies }: { movies: MoviesQueryResult }) {
  const [pageQuery] = useQueryState("p", searchParams.p);
  const deferredPageQuery = useDeferredValue(pageQuery);
  const paginatedMovies = movies.slice((deferredPageQuery - 1) * 20, deferredPageQuery * 20);

  return (
    <>
      {paginatedMovies.map((movie, i) => (
        <ViewTransition key={movie._id} default="none" enter="movie-fade" exit="movie-fade">
          <MovieCard movie={movie} isLazyLoad={i >= 4} />
        </ViewTransition>
      ))}
    </>
  );
}
