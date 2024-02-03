"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@nextui-org/skeleton";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function RecentlyMovies({ movies }) {
  return (
    <div className="mx-auto lg:mx-16">
      <Swiper
        centeredSlides={false}
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          770: {
            slidesPerView: 3,
          },
          1100: {
            slidesPerView: 4,
          },
        }}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mx-auto mb-32 mt-10 items-center justify-center gap-0"
      >
        {movies.map((movie, index) => (
          <div>
            <SwiperSlide className="mx-auto h-auto w-auto">
              <Link
                key={index}
                href={`movies/${movie.slug}`}
                className="justify-content-center relative ml-10 mt-10 inline-block min-h-10 w-[260px] select-none items-center justify-center rounded-xl bg-gray-200 text-center"
              >
                <Skeleton className="rounded-10" isLoaded={true}>
                  <div className="relative">
                    <Image
                      src={movie.poster}
                      alt={movie.filmName + " movie poster"}
                      width={260}
                      height={380}
                      className="h-[380px] rounded-10 transition-transform duration-300 ease-in-out hover:scale-110"
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
                </Skeleton>
                <div className="justify-content-center relative flex min-h-13 w-[250px] flex-col items-center justify-center text-center">
                  <Skeleton
                    isLoaded={true}
                    className="h-7 w-[200px] rounded-lg"
                  >
                    <p
                      className="w-[200px] truncate text-lg font-bold text-white hover:text-blue-800"
                      title={movie.filmName}
                    >
                      {movie.filmName}
                    </p>
                  </Skeleton>
                </div>
              </Link>
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </div>
  );
}
