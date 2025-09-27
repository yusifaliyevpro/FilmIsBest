import SanityImage from "@/components/sanity-image";
import { Link } from "@/i18n/navigation";
import * as motion from "motion/react-client";

type MovieCardProps = {
  filmName: string;
  poster: string | null;
  posterlqip: string | null;
  slug: string;
  imdbpuan: number;
  releaseDate: number;
};

export default function MovieCard({ movie, isLazyLoad }: { movie: MovieCardProps; isLazyLoad?: boolean }) {
  return (
    <motion.div
      key={movie.slug}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.09 }}
      transition={{ type: "spring", stiffness: 140, duration: 0.2 }}
    >
      <Link
        className="justify-content-center relative mt-10 inline-block min-h-10 w-66 scale-100 items-center justify-center rounded-xl bg-gray-200 text-center"
        href={`/movies/${movie.slug}`}
      >
        <SanityImage
          src={movie.poster!}
          width={625}
          height={910}
          quality={90}
          alt={`${movie.filmName} movie poster`}
          placeholder="blur"
          loading={isLazyLoad ? "lazy" : undefined}
          blurDataURL={movie.posterlqip!}
          className="rounded-10 aspect-[2/3]"
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
          <h2 className="w-fit max-w-[210px] truncate text-lg font-bold text-white hover:text-blue-800">
            {movie.filmName}
          </h2>
        </div>
      </Link>
    </motion.div>
  );
}
