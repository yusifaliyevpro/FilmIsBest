/* eslint-disable @next/next/no-img-element */
import { getMovie } from "@/data-access/sanity/movies/get";
import { Locale } from "@/i18n/routing";
import { BASE_URL } from "@/lib/constants";
import sanityLoader from "@/lib/imageLoader";
import { readFile } from "fs/promises";
import { ImageResponse } from "next/og";
import { join } from "path";

export const alt = "Movie Poster";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { slug } = await params;
  const movie = await getMovie(slug);

  const interSemiBold = await readFile(join(process.cwd(), "assets/fonts/Poppins-SemiBold.ttf"));

  if (!!movie)
    return new ImageResponse(
      (
        <div tw="relative flex h-full w-full flex-col items-center justify-center bg-white">
          <div tw="relative flex h-full w-full flex-row justify-between">
            <div tw="flex py-5">
              <img
                src={sanityLoader({ src: movie.poster!, width: 450, quality: 100 })}
                tw="ml-10 h-full w-95 rounded-2xl shadow-2xl shadow-blue-900"
                alt={movie.filmName || ""}
              />
            </div>

            <div tw="relative flex w-190 flex-col items-center justify-around text-xl font-bold">
              <h1 tw="relative flex h-auto w-auto text-center text-7xl font-bold text-blue-600">
                {movie.filmName}
              </h1>
              <div tw="rounded-10 relative flex bg-blue-600 p-9 text-5xl font-bold text-white">
                Watch it Now!
              </div>
              <div tw="relative right-0 flex flex-row items-center justify-around">
                <img alt="FilmIsBest Logo" height={70} src={`${BASE_URL}/icon.png`} width={70} />
                <p tw="ml-2 text-6xl font-bold text-inherit">
                  Film<span tw="text-blue-600">Is</span>Best
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        fonts: [
          {
            name: "Inter",
            data: interSemiBold,
            style: "normal",
            weight: 400,
          },
        ],
        height: size.height,
        width: size.width,
      },
    );
}
