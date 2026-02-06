"use client";

import MovieCard from "@/components/movie-card";
import { searchParams } from "@/lib/searchParams";
import { MoviesQueryResult } from "@/sanity/types";
import Fuse from "fuse.js";
import { AnimatePresence, motion } from "motion/react";
import { useQueryState } from "nuqs";
import { useMemo } from "react";
import { useDebounce } from "use-debounce";

export default function Movies({ movies }: { movies: MoviesQueryResult }) {
  const [searchQuery] = useQueryState("q", searchParams.q);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [pageQuery] = useQueryState("p", searchParams.p);

  const fuse = useMemo(
    () =>
      new Fuse(movies, {
        keys: ["filmName", "imdbID"],
        threshold: 0.4,
      }),
    [movies],
  );

  const filteredMovies = useMemo(() => {
    if (!debouncedSearchQuery) return movies.slice((pageQuery - 1) * 20, pageQuery * 20);

    const result = fuse.search(debouncedSearchQuery);
    return result.map((r) => r.item);
  }, [debouncedSearchQuery, movies, pageQuery, fuse]);

  if (filteredMovies.length === 0) {
    return (
      <div className="justify-content-center mx-2.5 flex min-h-[60dvh] flex-wrap items-center justify-center gap-x-10 text-3xl">
        There is no match for your search
      </div>
    );
  }

  return (
    <AnimatePresence initial={false}>
      {filteredMovies.map((movie, i) => (
        <motion.div
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
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
