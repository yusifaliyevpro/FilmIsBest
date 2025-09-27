"use client";

import MovieCard from "@/components/movie-card";
import { RecentlyAddedMoviesQueryResult } from "@/sanity/types";
import { motion } from "motion/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function RecentlyAddedMovies({ movies }: { movies: RecentlyAddedMoviesQueryResult }) {
  return (
    <motion.div
      className="relative h-auto w-full px-20 text-white"
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
    >
      <Swiper
        loop
        className="mt-10 mb-32 px-10"
        modules={[Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          450: { slidesPerView: 1 },
          650: { slidesPerView: 2 },
          770: { slidesPerView: 3 },
          1100: { slidesPerView: 4 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.slug} className="my-5 w-auto pl-6">
            <MovieCard key={movie.slug} movie={movie} isLazyLoad={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
