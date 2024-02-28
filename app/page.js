import LottieComponent from "./components/LottieAnimation";
import RecentlyMovies from "./components/recentlyMovies";
import { client } from "../sanity/lib/client";
import Link from "next/link";
import { Suspense } from "react";
import RecentlyMoviesSkeleton from "./components/recentlyMoviesSkeleton";
import { BiLoaderAlt, BiSolidChevronRight } from "react-icons/bi";
import { ClerkLoaded, ClerkLoading, SignedIn, auth } from "@clerk/nextjs";

const ogImage = {
  url: "https://filmisbest.com/FilmIsBest.png",
  width: 1080,
  height: 1080,
  alt: "FilmIsBest",
  type: "image/png",
};

export const metadata = {
  title: {
    absolute: "FilmIsBest | Ana Səhifə",
  },
  url: "https://filmisbest.com/",
  description:
    "FilmIsBest.com YusifAliyevPro tərəfindən yaradılmışdır. İstədiyiniz bütün filmləri İngiliscə, Türkçə və hər iki dildə altyazı seçimləri ilə izləyə bilərsiz. Həmçinin Film Fraqmanlarınada baxmaq mümkündür.",
  openGraph: {
    description:
      "FilmIsBest.com YusifAliyevPro tərəfindən yaradılmışdır. İstədiyiniz bütün filmləri İngiliscə, Türkçə və hər iki dildə altyazı seçimləri ilə izləyə bilərsiz. Həmçinin Film Fraqmanlarınada baxmaq mümkündür.",
    images: [ogImage],
    title: "FilmIsBest | Ana Səhifə",
    url: "https://filmisbest.com/",
  },
};

export async function getData() {
  const query = `*[_type=='Movie-studio']|order(_createdAt desc)
    {filmName, "poster": poster.asset->url, "slug": slug.current, imdbpuan, releaseDate}[0...10]`;
  const data = await client.fetch(
    query,
    { cache: "force-cache" },
    { next: { revalidate: 3600 } },
  );
  return data;
}

export default async function Home() {
  const movies = await getData();
  const { userId } = auth();
  return (
    <main>
      <div className="relative mt-8 flex flex-col items-center justify-between pl-20 pr-20 lg:flex-row">
        <div>
          <h1 className=" relative mt-6 flex-col  text-nowrap  text-center text-2xl font-bold  no-underline lg:mt-0 lg:text-4xl">
            Axtardığın bütün filmlər &nbsp;
            <br />
            <p className="inline-block bg-gradient-to-r from-[rgba(0,67,181,1)] from-0% via-[rgba(10,107,222,1)] via-50%  to-[rgba(0,123,255,1)] to-100% bg-clip-text text-transparent">
              filmisbest.com-da
            </p>
          </h1>
          <ClerkLoading>
            <div
              href={"/movies"}
              className="relative mx-auto mt-7 flex h-[56px] w-[128px] items-center justify-center rounded-[15px] bg-blue-600 p-3 text-center text-2xl font-bold hover:bg-blue-700"
            >
              <BiLoaderAlt className="animate-spin text-3xl" />
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <div className="relative flex flex-row items-center justify-center gap-x-8">
              <Link
                href={"/movies"}
                className="relative mt-7 flex w-fit items-center rounded-[15px] bg-blue-600 p-3 text-center text-2xl font-bold hover:bg-blue-700"
              >
                <p>Filmlər</p> <BiSolidChevronRight />
              </Link>
              <SignedIn>
                {userId === process.env.CLERK_ADMIN_DEV_ID ||
                userId === process.env.CLERK_ADMIN_PROD_ID ? (
                  <Link
                    href={"/studio"}
                    className="relative mt-7 flex w-fit items-center rounded-[15px] bg-blue-600 p-3 text-center text-2xl font-bold hover:bg-blue-700"
                  >
                    <p>Studio</p> <BiSolidChevronRight />
                  </Link>
                ) : (
                  ""
                )}
              </SignedIn>
            </div>
          </ClerkLoaded>
        </div>
        <div className="relative mt-12 flex h-74 w-74 lg:mt-0 lg:h-100 lg:w-100">
          <Suspense
            fallback={
              <div className="relative mt-12 flex h-74 w-74 animate-pulse rounded-full bg-gray-200 lg:mt-0 lg:h-100 lg:w-100"></div>
            }
          >
            <LottieComponent animationPath="/Movieanm.lottie" />
          </Suspense>
        </div>
      </div>
      <h2 className=" mt-10 w-full text-center text-3xl font-bold">
        Ən Son Əlavə Olunanlar
      </h2>
      <div className="relative w-full">
        <Suspense fallback={<RecentlyMoviesSkeleton />}>
          <RecentlyMovies movies={movies} />
        </Suspense>
      </div>
    </main>
  );
}
