"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import React from "react";

export default function RecentlyMoviesSkeleton() {
  return (
    <div className="relative mx-12 sm:mx-20">
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
        {Array(10)
          .fill()
          .map((i) => (
            <SwiperSlide>
              <div
                key={i}
                className="justify-content-center w-[260px]select-none relative inline-block min-h-10 items-center justify-center rounded-xl bg-gray-200 text-center"
              >
                <div>
                  <div className="relative">
                    <div className=" h-[380px] w-[260px] animate-pulse rounded-10 bg-gray-100 opacity-0"></div>
                  </div>
                  <div className="justify-content-center relative flex min-h-13 w-[250px] flex-col items-center justify-center text-center">
                    <p className="ml-2 w-[200px] animate-pulse truncate rounded-10 bg-gray-100 text-lg font-bold text-gray-100">
                      Movie Name
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
