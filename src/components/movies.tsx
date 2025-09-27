"use client";

import MovieCard from "@/components/movie-card";
import { MoviesQueryResult } from "@/sanity/types";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Movies({ movies }: { movies: MoviesQueryResult }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.trim();
  const page = Number(searchParams.get("page")) || 1;

  const [filteredMovies, setFilteredMovies] = useState(movies);

  useEffect(() => {
    if (!search) {
      setFilteredMovies(movies.slice((page - 1) * 20, page * 20));
      return;
    }

    const filterMovies = async () => {
      const Fuse = (await import("fuse.js")).default;
      const fuse = new Fuse(movies, {
        keys: ["filmName", "imdbID"],
        threshold: 0.4,
      });
      const result = fuse.search(search);
      setFilteredMovies(result.map((r) => r.item));
    };

    filterMovies();
  }, [search, page, movies]);

  if (filteredMovies.length === 0) {
    return (
      <div className="justify-content-center mx-2.5 flex min-h-[60dvh] flex-wrap items-center justify-center gap-x-10 text-3xl">
        There is no match for your search
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {filteredMovies.map((movie) => (
        <motion.div
          key={movie._id}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          initial={{ opacity: 0, y: 100 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        >
          <MovieCard movie={movie} />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
