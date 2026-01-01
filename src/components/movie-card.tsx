import SanityImage from "@/components/sanity-image";
import { Link } from "@/i18n/navigation";
import { Skeleton } from "@heroui/skeleton";
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
        className="justify-content-center relative mt-10 inline-block min-h-10 w-66 scale-100 items-center justify-center rounded-xl bg-gray-900 text-center"
        href={`/movies/${movie.slug}`}
        prefetch={false}
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
          className="aspect-2/3 rounded-xl"
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
    </motion.div>
  );
}

export function MovieCardSkeleton() {
  return (
    <div className="justify-content-center relative mt-10 inline-block min-h-10 w-66 scale-100 items-center justify-center rounded-xl bg-gray-900 text-center">
      <Skeleton className="aspect-2/3 w-full rounded-xl bg-gray-700 before:via-gray-600" />
      <div className="justify-content-center relative flex min-h-12.5 w-62.5 flex-col items-center justify-center text-center">
        <Skeleton className="h-6 w-52.5 rounded-lg bg-gray-700 before:via-gray-600" />
      </div>
    </div>
  );
}
