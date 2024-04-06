import LottieComponent from "./components/LottieAnimation";
import RecentlyMovies from "./components/recentlyMovies";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { Suspense } from "react";
import RecentlyMoviesSkeleton from "./components/recentlyMoviesSkeleton";
import { BiSolidChevronRight } from "react-icons/bi";
import { baseURL } from "./lib/bases";
import { MotionDiv } from "./components/motionDiv";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: "MetaData.Home" });
  return {
    title: {
      absolute: `FilmIsBest | ${t("title")}`,
    },
    url: `${baseURL}/`,
    description: t("description"),
    alternates: {
      canonical: `${baseURL}`,
      languages: {
        "en-US": `${baseURL}/en`,
        "en-GB": `${baseURL}/en`,
        "az-AZ": `${baseURL}/az`,
        "tr-TR": `${baseURL}/tr`,
      },
    },
    openGraph: {
      description: t("description"),
      images: [
        {
          url: `${baseURL}/${locale}/api/og?title=${encodeURI(t("title"))}`,
          width: 1200,
          height: 1000,
          alt: `FilmIsBest | ${t("title")} | OpenGraph-Image`,
          type: "image/png",
        },
      ],
      title: `FilmIsBest | ${t("title")}`,
      url: `${baseURL}/${locale}`,
    },
  };
}

export async function getData() {
  const query = `*[_type=='Movie-studio']|order(_createdAt desc)
    {filmName, poster, "slug": slug.current, imdbpuan, releaseDate}[0...10]`;
  const data = await client.fetch(
    query,
    { cache: "force-cache" },
    { next: { revalidate: 3600 } },
  );
  return data;
}

export default async function Home() {
  const movies = await getData();
  const t = await getTranslations("Home");
  return (
    <main>
      <div className="relative mt-6 flex flex-col items-center justify-between pl-20 pr-20 lg:flex-row">
        <MotionDiv
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
        >
          <div>
            <h1 className=" relative mt-6 flex-col text-wrap  text-center  text-2xl font-bold no-underline  lg:mt-0 lg:text-nowrap lg:text-4xl">
              {t("cta")}
              <br />
              <p className="inline-block text-wrap bg-gradient-to-r from-[rgba(0,67,181,1)] from-0% via-[rgba(10,107,222,1)] via-50%  to-[rgba(0,123,255,1)] to-100% bg-clip-text text-transparent">
                {t("ctaUrl", { url: "filmisbest.com" })}
              </p>
            </h1>
            <div className="relative flex flex-row items-center justify-center gap-x-8">
              <Link
                href={"/movies"}
                className="relative mt-7 flex w-fit select-none items-center rounded-[15px] bg-blue-600 p-3 text-center text-2xl font-bold hover:bg-blue-700"
              >
                <p>{t("movies")}</p> <BiSolidChevronRight />
              </Link>
            </div>
          </div>
        </MotionDiv>
        <MotionDiv
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 0.7 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 110,
            delay: 0.2,
          }}
          className="relative flex h-74 w-74 lg:mt-0 lg:h-100 lg:w-100"
        >
          <MotionDiv
            initial={{ y: 0 }}
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 1.1 }}
            className="relative flex h-74 w-74 lg:mt-0 lg:h-100 lg:w-100"
          >
            <LottieComponent animationPath="/Movieanm.lottie" />
          </MotionDiv>
        </MotionDiv>
      </div>
      <h2 className=" mt-20  w-full text-center text-3xl font-bold">
        {t("recentlyAdded")}
      </h2>
      <MotionDiv
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-auto w-full"
      >
        <Suspense fallback={<RecentlyMoviesSkeleton />}>
          <RecentlyMovies movies={movies} />
        </Suspense>
      </MotionDiv>
    </main>
  );
}
