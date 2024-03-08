"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { MotionDiv } from "./motionDiv";

export default function RecentlyMovies({ movies }) {
  return (
    <div className="relative mx-12 h-auto sm:mx-20">
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
        className="mb-32 mt-10"
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index} className="my-5 w-auto">
            <MotionDiv initial={{ scale: 1 }} whileHover={{ scale: 1.09 }}>
              <Link
                href={`movie/${movie.slug}`}
                className="justify-content-center relative mx-auto inline-block min-h-10 w-[260px] select-none items-center justify-center rounded-xl bg-gray-200 text-center"
              >
                <div className="relative">
                  <Image
                    src={movie.poster}
                    alt={movie.filmName + " movie poster"}
                    width={260}
                    height={380}
                    quality={60}
                    priority={true}
                    fetchPriority="high"
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
                    title={movie.filmName}
                  >
                    {movie.filmName}
                  </p>
                </div>
              </Link>
            </MotionDiv>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
