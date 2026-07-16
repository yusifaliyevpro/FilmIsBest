import SanityImage from "@/components/sanity-image";
import { Link } from "@/i18n/navigation";
import type { MoviesQueryResult } from "@/sanity/types";

type Movie = Pick<
  MoviesQueryResult[number],
  "slug" | "poster" | "posterlqip" | "filmName" | "releaseDate" | "imdbpuan"
>;

export default function MovieCard({ movie, isLazyLoad }: { movie: Movie; isLazyLoad?: boolean }) {
  return (
    <div className="transition-transform duration-500 ease-spring-55 hover:scale-[1.09]">
      <Link
        className="justify-content-center relative mt-10 inline-block min-h-10 w-66 scale-100 items-center justify-center rounded-xl bg-gray-900 text-center"
        href={`/movies/${movie.slug}`}
        prefetch={false}
      >
        <SanityImage
          src={movie.poster!}
          width={625}
          preload={!isLazyLoad}
          height={910}
          quality={90}
          alt={`${movie.filmName} movie poster`}
          placeholder="blur"
          loading={isLazyLoad ? "lazy" : undefined}
          blurDataURL={movie.posterlqip!}
          className="aspect-2/3 rounded-xl"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 264px"
        />
        <div className="absolute top-2.5 flex w-65 flex-row justify-around gap-36 p-2.5">
          <div className="rounded-3xl bg-gray-900 p-0.75 text-center text-xs font-bold text-white opacity-80">
            {movie.releaseDate}
          </div>
          <div className="flex w-8 items-center justify-center rounded-3xl bg-[#ffc107] text-center text-xs font-bold text-gray-800">
            {movie.imdbpuan.toFixed(1)}
          </div>
        </div>
        <div className="justify-content-center relative flex min-h-12.5 w-62.5 flex-col items-center justify-center text-center">
          <h2 className="w-fit max-w-52.5 truncate text-lg font-bold text-white hover:text-blue-800">
            {movie.filmName}
          </h2>
        </div>
      </Link>
    </div>
  );
}
