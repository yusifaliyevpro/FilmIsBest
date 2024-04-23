import LottieComponent from "../components/LottieAnimation";
import RecentlyMovies from "../components/recentlyMovies";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { Suspense } from "react";
import { BiSolidChevronRight } from "react-icons/bi";
import { BASE_URL } from "../lib/constants";
import { Motion } from "../components/Motion";
import { getScopedI18n, getStaticParams } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";
import AnimatedText from "../components/animatedText";

export async function generateMetadata({ params: { locale } }) {
  const t = await getScopedI18n("MetaData.Home");
  return {
    title: {
      absolute: `FilmIsBest | ${t("title")}`,
    },
    url: `${BASE_URL}/`,
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}`,
      languages: {
        en: `${BASE_URL}/en`,
        "az-AZ": `${BASE_URL}/az`,
        "tr-TR": `${BASE_URL}/tr`,
      },
    },
    openGraph: {
      description: t("description"),
      images: [
        {
          url: `${BASE_URL}/api/og?title=${encodeURI(t("title"))}`,
          width: 1200,
          height: 1000,
          alt: `FilmIsBest | ${t("title")} | OpenGraph-Image`,
          type: "image/png",
        },
      ],
      title: `FilmIsBest | ${t("title")}`,
      url: `${BASE_URL}/`,
    },
  };
}

/**
 * Retrieves data from the database for the top 10 movies based on creation date.
 * @returns {Promise} A promise that resolves to an array of objects containing filmName, poster, slug, imdbpuan, and releaseDate.
 */
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

export function generateStaticParams() {
  return getStaticParams();
}

export default async function Home({ params: { locale } }) {
  setStaticParamsLocale(locale);
  const movies = await getData();
  const t = await getScopedI18n("Home");
  return (
    <>
      <div className="relative mt-8 flex flex-col items-center justify-between pl-20 pr-20 lg:flex-row">
        <Motion
          initial={{ y: 30, opacity: 0.1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <>
            <h1 className=" relative mt-6 flex-col text-wrap  text-center  text-2xl font-bold no-underline  lg:mt-0 lg:text-nowrap lg:text-4xl">
              {t("cta")}
              <br />
              <p className="inline-block text-wrap bg-gradient-to-r from-[rgba(0,67,181,1)] from-0% via-[rgba(10,107,222,1)] via-50%  to-[rgba(0,123,255,1)] to-100% bg-clip-text text-transparent">
                {t("ctaUrl", { url: "filmisbest.com" })}
              </p>
            </h1>
            <div className="relative flex flex-row items-center justify-center gap-x-8">
              <Motion
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1, 0.9, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  delay: 1.5,
                  repeatDelay: 4,
                }}
              >
                <Link
                  href={"/movies"}
                  className="relative mt-7 flex w-fit select-none items-center rounded-[15px] bg-blue-600 p-3 text-center text-2xl font-bold hover:bg-blue-700"
                >
                  <p>{t("movies")}</p> <BiSolidChevronRight />
                </Link>
              </Motion>
            </div>
          </>
        </Motion>
        <Motion
          initial={{ y: 0 }}
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
          className="relative flex h-76 w-76 lg:mt-0 lg:h-100 lg:w-100"
        >
          <Suspense fallback={<p>...Loading</p>}>
            <LottieComponent animationPath="/Movieanm.lottie" />
          </Suspense>
        </Motion>
      </div>
      <Suspense fallback={<p>...Loading</p>}>
        <AnimatedText
          once
          text={t("recentlyAdded")}
          className=" mt-48  w-full text-center text-3xl font-bold"
        />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <RecentlyMovies movies={movies} />
      </Suspense>
    </>
  );
}
