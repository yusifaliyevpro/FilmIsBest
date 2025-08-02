import SanityImage from "./SanityImage";
import { Link } from "@/i18n/routing";

type MovieCardProps = {
  filmName: string;
  poster: string | null;
  posterlqip: string | null;
  slug: string;
  imdbpuan: number;
  releaseDate: number;
};

export function MovieCard({ movie }: { movie: MovieCardProps }) {
  return (
    <Link
      className="justify-content-center relative mt-10 inline-block min-h-10 w-[260px] scale-100 items-center justify-center rounded-xl bg-gray-200 text-center transition-transform duration-200 ease-in-out select-none hover:scale-109"
      href={`/movies/${movie.slug}`}
    >
      <SanityImage
        src={movie.poster!}
        width={260}
        height={380}
        alt={`${movie.filmName} movie poster`}
        placeholder="blur"
        blurDataURL={movie.posterlqip!}
        className="rounded-10 h-[380px]"
      />
      <div className="absolute top-2.5 flex w-[260px] flex-row justify-around gap-36 p-2.5">
        <div className="rounded-3xl bg-gray-200 p-[3px] text-center text-xs font-bold text-white opacity-80">
          {movie.releaseDate}
        </div>
        <div className="bg-imdb flex w-8 items-center justify-center rounded-3xl text-center text-xs font-bold text-gray-100">
          {movie.imdbpuan.toFixed(1)}
        </div>
      </div>
      <div className="justify-content-center relative flex min-h-13 w-[250px] flex-col items-center justify-center text-center">
        <h4 className="w-fit max-w-[210px] truncate text-lg font-bold text-white hover:text-blue-800">
          {movie.filmName}
        </h4>
      </div>
    </Link>
  );
}
