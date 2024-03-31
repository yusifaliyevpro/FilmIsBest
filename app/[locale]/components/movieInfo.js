import Image from "next/image";
import translationMap from "../lib/translationMap";
import { MotionDiv } from "./motionDiv";
import { useLocale, useTranslations } from "next-intl";

export default function MovieInfo({ movie }) {
  const translatedGenres = movie.genre.map(
    (genre) => translationMap[genre] || genre,
  );
  const locale = useLocale();
  const t = useTranslations("Movie");

  return (
    <div className="relative  mx-3 mb-20 flex h-auto w-fit flex-col items-center justify-center rounded-10 border border-solid border-slate-400 p-4 sm:mx-auto  sm:flex-row sm:items-start sm:justify-between">
      <MotionDiv
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", duration: 0.1, stiffness: 110 }}
        className="relative mx-16 flex h-auto w-auto items-start justify-between justify-items-start  sm:mx-0 sm:h-76 sm:w-60"
      >
        <Image
          src={movie.poster}
          alt={movie.filmName + " movie poster"}
          width={240}
          height={360}
          priority
          placeholder="blur"
          blurDataURL="data:..."
          className="relative h-auto w-auto select-none rounded-10  sm:h-76 sm:w-60"
        />
      </MotionDiv>
      <div className="relative mx-auto w-auto list-none rounded-10 tracking-normal sm:ml-5 sm:w-105">
        <li className="mt-4 w-fit font-bold text-slate-400 ">
          {t("movieName")}{" "}
          <span className="text-white">{movie.filmName.trim()}</span>
        </li>
        <li className="mt-4 w-fit font-bold text-slate-400">
          {t("stars")}{" "}
          <span className="text-white">
            {movie.actors.trim().replace(/!/g, "•")}
          </span>
        </li>
        <li className="mt-4 w-fit font-bold text-slate-400">
          {t("category")}{" "}
          <span className="text-white">
            {locale === "az"
              ? translatedGenres.join(", ")
              : movie.genre.join(", ")}
          </span>
        </li>
        <li className="mt-4 w-fit font-bold text-slate-400">
          {t("director")}{" "}
          <span className="text-white">{movie.directed.trim()}</span>
        </li>
        <div className="relative mt-4 flex w-fit flex-row items-center gap-4">
          <Image
            src="/imdb.svg"
            width={40}
            height={40}
            alt="Imdb Logo"
            className="select-none"
          />
          <span className="font-bold text-white">{movie.imdbpuan}</span>
        </div>
        <li className="mt-4 w-auto font-bold text-slate-400 sm:w-fit">
          {t("MovieInfo.movieDescription")}{" "}
          <span className="text-white">{movie.description.trim()}</span>
        </li>

        <div className="left-0 mb-9 box-border flex list-none flex-row justify-around pt-12 text-left sm:mb-0 sm:p-12">
          <li className=" box-border text-left font-bold text-slate-400 sm:px-12">
            {t("MovieInfo.time")}
            <br />
            <span className="text-nowrap text-white">
              {movie.movieTime} {t("MovieInfo.min")}
            </span>
          </li>
          <li className=" box-border w-max text-left font-bold text-slate-400 sm:px-12">
            {t("MovieInfo.year")}
            <br />
            <span className="text-white">{movie.releaseDate}</span>
          </li>
          <li className=" box-border w-max text-balance text-left font-bold text-slate-400 sm:px-8">
            {t("MovieInfo.country")}
            <br />
            <span className="text-white">{movie.country}</span>
          </li>
        </div>
      </div>
    </div>
  );
}
