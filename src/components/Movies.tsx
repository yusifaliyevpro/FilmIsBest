"use client";

import { MovieCard } from "./MovieCard";
import { MoviesQueryResult } from "@/sanity/types";
import Fuse from "fuse.js";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";

export default function Movies({ movies }: { movies: MoviesQueryResult }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.trim();
  const page = Number(searchParams.get("page")) || 1;
  const options = { keys: ["filmName", "imdbID"], threshold: 0.4 };

  if (search) {
    const fuse = new Fuse(movies, options);
    const result = fuse.search(search);
    movies = result.map(({ item }) => item);
  } else {
    movies = movies.slice((page - 1) * 20, page * 20);
  }

  if (movies.length === 0) {
    return (
      <div className="justify-content-center mx-2.5 flex min-h-[60dvh] flex-wrap items-center justify-center gap-x-10 text-3xl">
        There is no match for your search
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {movies.map((movie) => (
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
