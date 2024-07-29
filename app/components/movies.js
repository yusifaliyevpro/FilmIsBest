"use client";

import LottieComponent from "./LottieAnimation";
import { Motion } from "./Motion";
import useStore from "@/lib/store";
import { AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Movies({ movies }) {
  const search = useStore((state) => state.search);
  const page = useStore((state) => state.page);
  const setResultCount = useStore((state) => state.setResultCount);
  const imdbIDPattern = /^tt\d+$/;
  let renderedMovies;
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
  }, [renderedMovies]);
  return (
    <div className="justify-content-center mx-2.5 flex min-h-[60dvh] flex-wrap items-center justify-center gap-x-10">
      <AnimatePresence mode="wait">
        {renderedMovies.length !== 0 ? (
          renderedMovies.map((movie, i) => (
            <Motion
              key={i + 20 * (page - 1)}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <Motion
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.2, type: "spring", stiffness: 110 }}
              >
                <Link
                  href={`movies/${movie.slug.current}`}
                  className="justify-content-center relative mt-10 inline-block min-h-10 w-[260px] select-none items-center justify-center rounded-xl bg-gray-200 text-center"
                >
                  <div>
                    <div className="relative">
                      <Image
                        src={movie.poster}
                        alt={movie.filmName + " movie poster"}
                        width={260}
                        height={380}
                        priority
                        className="h-[380px] rounded-10"
                      />
                      <div className="absolute top-2.5 flex w-[260px] flex-row justify-around gap-36 p-2.5">
                        <div className="rounded-3xl bg-gray-200 p-[3px] text-center text-xs font-bold text-white opacity-80">
                          {movie.releaseDate}
                        </div>
                        <div className="flex w-8 items-center justify-center rounded-3xl bg-imdb text-center text-xs font-bold text-gray-100">
                          {parseFloat(movie.imdbpuan).toFixed(1)}
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
              </Motion>
            </Motion>
          ))
        ) : (
          <div className="max-w-[30rem]">
            <LottieComponent animationPath={"/noResult.lottie"} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
