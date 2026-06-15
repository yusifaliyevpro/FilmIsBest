"use client";

import Fuse from "fuse.js";
import { AnimatePresence, domAnimation, LazyMotion, m } from "motion/react";
import { useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import { MoviesQueryResult } from "@/sanity/types";
import MovieCard from "@/components/movie-card";
import { searchParams } from "@/lib/searchParams";

export default function Movies({ movies }: { movies: MoviesQueryResult }) {
  const [searchQuery] = useQueryState("q", searchParams.q);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [pageQuery] = useQueryState("p", searchParams.p);

  const fuse = new Fuse(movies, {
    keys: ["filmName", "imdbID"],
    threshold: 0.4,
  });

  let filteredMovies: MoviesQueryResult;

  if (!debouncedSearchQuery) filteredMovies = movies.slice((pageQuery - 1) * 20, pageQuery * 20);
  else {
    const matchedMovies = fuse.search(debouncedSearchQuery);
    filteredMovies = matchedMovies.map((r) => r.item);
  }

  if (filteredMovies.length === 0) {
    return (
      <div className="justify-content-center mx-2.5 flex min-h-[60dvh] flex-wrap items-center justify-center gap-x-10 text-3xl">
        There is no match for your search
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence initial={false}>
        {filteredMovies.map((movie, i) => (
          <m.div
            key={movie._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeIn",
              type: "spring",
            }}
          >
            <MovieCard movie={movie} isLazyLoad={i >= 4} />
          </m.div>
        ))}
      </AnimatePresence>
    </LazyMotion>
  );
}
