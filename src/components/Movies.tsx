"use client";

import SanityImage from "./SanityImage";
import { Link } from "@/i18n/routing";
import useStore from "@/lib/store";
import type { MOVIES_QUERYResult } from "@/sanity/types";
import Fuse from "fuse.js";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { use, useEffect } from "react";

export default function Movies({ moviesPromise }: { moviesPromise: Promise<MOVIES_QUERYResult> }) {
  const movies = use(moviesPromise);
  const search = useStore((state) => state.search);
  const page = useStore((state) => state.page);
  const setResultCount = useStore((state) => state.setResultCount);
  const imdbIDPattern = /^tt\d+$/;
  let renderedMovies = movies;
  let options;
  if (search) {
    if (imdbIDPattern.test(search)) {
      options = {
        keys: ["imdbID"],
        threshold: 0.0,
      };
    } else {
      options = {
        keys: ["filmName"],
        threshold: 0.4,
      };
    }
    const fuse = new Fuse(movies, options);
    const result = fuse.search(search);
    renderedMovies = result.map(({ item }) => item);
  } else {
    renderedMovies = movies.slice((page - 1) * 20, page * 20);
  }
  useEffect(() => {
    setResultCount(renderedMovies.length);
  }, [renderedMovies, setResultCount]);

  if (renderedMovies.length === 0) {
    return (
      <div className="justify-content-center mx-2.5 flex min-h-[60dvh] flex-wrap items-center justify-center gap-x-10 text-3xl">
        There is no match for your search
      </div>
    );
  }
  return (
    <div className="justify-content-center mx-2.5 flex min-h-[60dvh] flex-wrap items-center justify-center gap-x-10">
      <AnimatePresence mode="wait">
        {renderedMovies.map((movie) => (
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
            <motion.div
              initial={{ scale: 1 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 110 }}
              whileHover={{ scale: 1.08 }}
            >
              <Link
                className="justify-content-center relative mt-10 inline-block min-h-10 w-[260px] select-none items-center justify-center rounded-xl bg-gray-200 text-center"
                href={`movies/${movie.slug}`}
              >
                <div>
                  <div className="relative">
                    <SanityImage
                      alt={`${movie.filmName} movie poster`}
                      blurDataURL={movie.posterlqip as string}
                      className="h-[380px] rounded-10"
                      height={380}
                      placeholder="blur"
                      src={movie.poster as string}
                      width={260}
                    />
                    <div className="absolute top-2.5 flex w-[260px] flex-row justify-around gap-36 p-2.5">
                      <div className="rounded-3xl bg-gray-200 p-[3px] text-center text-xs font-bold text-white opacity-80">
                        {movie.releaseDate}
                      </div>
                      <div className="flex w-8 items-center justify-center rounded-3xl bg-imdb text-center text-xs font-bold text-gray-100">
                        {parseFloat(String(movie.imdbpuan)).toFixed(1)}
                      </div>
                    </div>
                  </div>
                  <div className="justify-content-center relative flex min-h-13 w-[250px] flex-col items-center justify-center text-center">
                    <p
                      className="w-fit max-w-[210px] truncate text-lg font-bold text-white hover:text-blue-800"
                      title={movie.filmName}
                    >
                      {movie.filmName}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
