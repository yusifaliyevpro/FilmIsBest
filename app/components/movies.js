import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@nextui-org/skeleton";

async function getData() {
  const query = `*[_type=='Movie-studio']|order(_createdAt desc){filmName, "poster": poster.asset->url, slug, imdbpuan, releaseDate}`;
  const data = await client.fetch(
    query,
    { cache: "force-cache" },
    { next: { revalidate: 3600 } },
  );
  return data;
}

export default async function Movies() {
  const movies = await getData();
  return (
    <div className="justify-content-center mx-2.5 flex flex-wrap items-center justify-center">
      {movies.map((movie, index) => (
        <Link
          key={index}
          href={`movies/${movie.slug.current}`}
          className="justify-content-center relative ml-10 mt-10 inline-block min-h-10 w-[260px] select-none items-center justify-center rounded-xl bg-gray-200 text-center"
        >
          <div>
            <Skeleton className="rounded-10" isLoaded={true}>
              <div className="relative">
                <Image
                  src={movie.poster}
                  alt={movie.filmName}
                  width={260}
                  height={400}
                  className="h-[400px] rounded-10 transition-transform duration-300 ease-in-out hover:scale-110"
                />
                <div className="absolute top-2.5 flex w-[260px] flex-row justify-around gap-36 p-2.5">
                  <div className="rounded-3xl bg-rdate px-1 text-center text-xs font-bold text-white">
                    {movie.releaseDate}
                  </div>
                  <div className="w-8 rounded-3xl bg-imdb text-xs font-bold text-gray-100">
                    {movie.imdbpuan}
                  </div>
                </div>
              </div>
            </Skeleton>
            <div className="justify-content-center relative flex min-h-13 w-[250px] flex-col items-center justify-center text-center">
              <Skeleton isLoaded={true} className="h-7 w-[200px] rounded-lg">
                <h2
                  className="w-[200px] truncate text-lg font-bold text-white hover:text-blue-800"
                  title={movie.filmName}
                >
                  {movie.filmName}
                </h2>
              </Skeleton>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
