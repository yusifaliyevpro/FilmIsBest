import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { getMovie } from "@/data/sanity/movies/get";
import type { Locale } from "@/i18n/routing";
import { BASE_URL } from "@/lib/constants";
import { sanityLoader } from "@/lib/imageLoader";

export const alt = "Movie Poster";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { slug } = await params;
  const [movie, poppinsSemiBold] = await Promise.all([
    getMovie(slug),
    readFile(join(process.cwd(), "assets/fonts/Poppins-SemiBold.ttf")),
  ]);

  if (!movie) notFound();

  const genres = movie.genre?.slice(0, 3) ?? [];

  return new ImageResponse(
    <div
      tw="relative flex h-full w-full flex-row items-center bg-gray-800"
      style={{
        backgroundImage:
          "radial-gradient(circle at 78% 28%, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0) 45%), linear-gradient(135deg, #111827 0%, #1f2937 55%, #111827 100%)",
      }}
    >
      {/* Poster (left) */}
      <div tw="flex h-full items-center pl-14">
        {/* oxlint-disable-next-line next/no-img-element */}
        <img
          src={sanityLoader({ src: movie.poster, width: 600, height: 900, quality: 100 })}
          width={356}
          height={534}
          tw="rounded-2xl"
          style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.6)" }}
          alt={movie.filmName || ""}
        />
      </div>

      {/* Info (right) */}
      <div tw="relative flex flex-1 flex-col justify-center px-14 py-12">
        <h1 tw="flex text-6xl font-bold text-white" style={{ lineHeight: 1.1 }}>
          {movie.filmName}
        </h1>

        {/* Meta badges */}
        <div tw="mt-7 flex flex-row items-center">
          <div tw="flex items-center rounded-lg bg-[#ffc107] px-4 py-2 text-2xl font-bold text-gray-900">
            IMDb {movie.imdbpuan?.toFixed(1)}
          </div>
          <div tw="ml-4 flex items-center rounded-lg bg-gray-900/70 px-4 py-2 text-2xl font-bold text-gray-200">
            {movie.releaseDate}
          </div>
          {movie.movieTime ? (
            <div tw="ml-4 flex items-center rounded-lg bg-gray-900/70 px-4 py-2 text-2xl font-bold text-gray-200">
              {movie.movieTime} min
            </div>
          ) : null}
        </div>

        {/* Genres */}
        {genres.length > 0 ? (
          <div tw="mt-5 flex flex-row items-center">
            {genres.map((g) => (
              <div
                key={g}
                tw="mr-3 flex items-center rounded-full border-2 border-blue-600 px-4 py-1 text-xl font-bold text-blue-400"
              >
                {g}
              </div>
            ))}
          </div>
        ) : null}

        {/* CTA */}
        <div tw="mt-10 flex">
          <div
            tw="flex rounded-xl bg-blue-600 px-10 py-5 text-4xl font-bold text-white"
            style={{ boxShadow: "0 12px 30px rgba(37,99,235,0.5)" }}
          >
            Watch it Now!
          </div>
        </div>

        {/* Brand */}
        <div tw="mt-14 flex flex-row items-center">
          {/* oxlint-disable-next-line next/no-img-element */}
          <img alt="FilmIsBest Logo" height={56} src={`${BASE_URL}/icon.png`} width={56} />
          <p tw="ml-3 flex text-4xl font-bold text-white">
            Film<span tw="text-blue-600">Is</span>Best
          </p>
        </div>
      </div>
    </div>,
    {
      fonts: [
        {
          name: "Poppins",
          data: poppinsSemiBold,
          style: "normal",
          weight: 600,
        },
      ],
      height: size.height,
      width: size.width,
    },
  );
}
