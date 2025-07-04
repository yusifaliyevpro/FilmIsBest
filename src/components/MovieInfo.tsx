import SanityImage from "./SanityImage";
import { MovieQueryResult } from "@/sanity/types";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function MovieInfo({ movie }: { movie: MovieQueryResult }) {
  if (!movie) return null;
  const t = await getTranslations("Movie");
  const translatedGenres = movie.genre?.map(
    (genre) => t(`Genres.${genre.toLowerCase()}` as "Genres.historical") || genre,
  );
  const hours = (movie.movieTime || 0) >= 60 ? Math.floor((movie.movieTime || 0) / 60) : 0;
  const minutes = (movie.movieTime || 0) - hours * 60;
  return (
    <div className="relative mx-3 mb-20 flex h-auto w-fit flex-col items-center justify-center rounded-10 border border-solid border-slate-400 p-4 sm:mx-auto sm:flex-row sm:items-start sm:justify-between">
      <div className="relative mx-16 flex h-auto w-auto items-start justify-between justify-items-start sm:mx-0 sm:h-76 sm:w-60">
        <SanityImage
          alt={`${movie.filmName} movie poster`}
          blurDataURL={movie.posterlqip as string}
          className="relative h-auto w-auto select-none rounded-10 sm:h-76 sm:w-60"
          height={360}
          placeholder="blur"
          src={movie.poster as string}
          width={240}
        />
      </div>
      <div className="relative mx-auto w-auto list-none rounded-10 tracking-normal sm:ml-5 sm:w-105">
        <li className="mt-4 w-fit font-bold text-slate-400">
          {t("movieName")} <span className="text-white">{movie.filmName?.trim()}</span>
        </li>
        <li className="mt-4 line-clamp-1 w-fit font-bold text-slate-400">
          {t("stars")}{" "}
          <span className="text-white" title={movie.actors?.trim().replace(/!/g, "•")}>
            {movie.actors?.trim().replace(/!/g, "•")}
          </span>
        </li>
        <li className="mt-4 w-fit font-bold text-slate-400">
          {t("category")} <span className="text-white">{translatedGenres?.join(" • ")}</span>
        </li>
        <li className="mt-4 w-fit font-bold text-slate-400">
          {t("director")} <span className="text-white">{movie.directed?.trim()}</span>
        </li>
        <div className="relative mt-4 flex w-fit flex-row items-center gap-4">
          <Image alt="Imdb Logo" className="select-none" height={40} src="/imdb.svg" width={40} />
          <span className="font-bold text-white">{parseFloat(String(movie.imdbpuan)).toFixed(1)}</span>
        </div>
        <li className="mt-4 w-auto font-bold text-slate-400 sm:w-fit">
          {t("MovieInfo.movieDescription")} <span className="text-white">{movie.description?.trim()}</span>
        </li>
        <div className="relative flex flex-nowrap items-center justify-end px-3 text-lg">
          <div className="relative mt-3 flex items-center gap-x-1 text-nowrap py-2 font-sans font-bold lg:mt-2">
            <span className="bg-gradient-to-r from-sky-400 via-blue-600 to-violet-500 bg-clip-text text-transparent">
              {t("MovieInfo.createdByChatGPT")}
            </span>
            <Image
              unoptimized
              alt="DeepSeek Logo"
              className="rounded-xl bg-white"
              height={40}
              src={"/DeepSeek.png"}
              width={40}
            />
          </div>
        </div>

        <div className="left-0 mb-9 box-border flex list-none flex-row justify-around pt-12 text-left sm:mb-0 sm:p-12">
          <li className="text-left font-bold text-slate-400">
            {t("MovieInfo.time")}
            <br />
            <span className="text-nowrap text-white">
              {hours !== 0 && hours + t("MovieInfo.hour")}
              {minutes !== 0 && " " + minutes + t("MovieInfo.min")}
            </span>
          </li>
          <li className="text-left font-bold text-slate-400">
            {t("MovieInfo.year")}
            <br />
            <span className="text-white">{movie.releaseDate}</span>
          </li>
          <li className="text-balance text-left font-bold text-slate-400">
            {t("MovieInfo.country")}
            <br />
            <span className="line-clamp-1 max-w-[7rem] text-white" title={movie.country || "None"}>
              {movie.country}
            </span>
          </li>
        </div>
      </div>
    </div>
  );
}
