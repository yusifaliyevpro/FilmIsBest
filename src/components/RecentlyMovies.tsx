"use client";

import { motion, useInView } from "motion/react";
import { Link } from "@/i18n/routing";
import React, { useRef } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { RECENT_MOVIES_QUERYResult } from "../../sanity.types";
import SanityImage from "./SanityImage";

export default function RecentlyMovies({
  movies,
}: {
  movies: RECENT_MOVIES_QUERYResult;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });
  if (!movies) return null;
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              scale: 1,
            }
          : {
              opacity: 0,
              scale: 0.9,
            }
      }
      transition={{ duration: 0.6 }}
      className="relative h-auto w-full text-white"
    >
      <div className="relative mx-12 flex h-auto sm:mx-16">
        <Swiper
          slidesPerView={1}
          breakpoints={{
            650: {
              slidesPerView: 2,
            },
            770: {
              slidesPerView: 3,
            },
            1100: {
              slidesPerView: 4,
            },
          }}
          loop
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mb-32 mt-10 px-10"
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={index} className="my-5 w-auto pl-6">
              <motion.div
                key={index}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.2, type: "spring", stiffness: 110 }}
              >
                <Link
                  href={`/movies/${movie.slug}`}
                  className="justify-content-center relative mx-auto inline-block min-h-10 w-[260px] select-none items-center justify-center rounded-xl bg-gray-200 text-center"
                >
                  <div className="relative">
                    <SanityImage
                      src={movie.poster as string}
                      alt={movie.filmName + " movie poster"}
                      width={260}
                      height={380}
                      quality={60}
                      placeholder="blur"
                      blurDataURL={movie.posterlqip as string}
                      className="h-[380px] rounded-10"
                    />
                    <div className="absolute top-2.5 flex w-[260px] flex-row justify-around gap-36 p-2.5">
                      <div className="rounded-3xl bg-rdate px-1 text-center text-xs font-bold text-white">
                        {movie.releaseDate}
                      </div>
                      <div className="w-8 rounded-3xl bg-imdb text-center text-xs font-bold text-gray-100">
                        {movie.imdbpuan}
                      </div>
                    </div>
                  </div>
                  <div className="justify-content-center relative flex min-h-13 w-[250px] flex-col items-center justify-center text-center">
                    <p
                      className="w-[200px] truncate text-lg font-bold text-white hover:text-blue-800"
                      title={movie.filmName || ""}
                    >
                      {movie.filmName}
                    </p>
                  </div>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.div>
  );
}
