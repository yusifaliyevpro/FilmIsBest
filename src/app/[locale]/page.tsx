import AnimatedText from "@/components/AnimatedText";
import LottieComponent from "@/components/LottieAnimation";
import RecentlyAddedMovies from "@/components/RecentlyAddedMovies";
import LoadingRecentlyAddedMovies from "@/components/SuspenseFallBacks/LoadingRecentlyAddedMovies";
import { getRecentlyAddedMovies } from "@/data-access/sanity/movies/get";
import { locales, Locale } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { BASE_URL } from "@/lib/constants";
import * as motion from "motion/react-client";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { isMobile } from "react-device-detect";
import { BiSolidChevronRight } from "react-icons/bi";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("MetaData.Home");
  return {
    metadataBase: new URL(BASE_URL),
    title: {
      absolute: `FilmIsBest | ${t("title")}`,
    },
    description: t("description"),
    alternates: {
      canonical: ``,
      languages: {
        en: `/en`,
        "az-AZ": `/az`,
        "tr-TR": `/tr`,
      },
    },
    openGraph: {
      description: t("description"),
      images: [
        {
          url: `/api/og?title=${encodeURI(t("title"))}`,
          width: 1200,
          height: 1000,
          alt: `FilmIsBest | ${t("title")} | OpenGraph-Image`,
          type: "image/png",
        },
      ],
      title: `FilmIsBest | ${t("title")}`,
      url: `/`,
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  setRequestLocale((await params).locale);
  const recentlyAddedMoviesPromise = getRecentlyAddedMovies();
  const t = await getTranslations("Home");
  return (
    <>
      <div className="relative mt-8 flex flex-col items-center justify-between pr-20 pl-20 text-white lg:flex-row">
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          initial={isMobile ?? { y: 30, opacity: 0.1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <>
            <h1 className="relative mt-6 flex-col gap-y-10 text-center text-2xl font-bold text-wrap no-underline lg:mt-0 lg:text-5xl lg:text-nowrap">
              <p>{t("cta")}</p>
              <p className="inline-block bg-linear-to-r from-[rgba(0,67,181,1)] from-0% via-[rgba(10,107,222,1)] via-50% to-[rgba(0,123,255,1)] to-100% bg-clip-text text-wrap text-transparent">
                {t("ctaUrl", { url: "filmisbest.com" })}
              </p>
            </h1>
            <div className="relative flex flex-row items-center justify-center gap-x-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1, 0.9, 1] }}
                initial={{ scale: 1 }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  delay: 1.5,
                  repeatDelay: 4,
                }}
              >
                <Link
                  className="relative mt-7 flex w-fit items-center rounded-[15px] bg-blue-600 p-3 text-center text-2xl font-bold select-none hover:bg-blue-700"
                  href={"/movies"}
                >
                  <p>{t("movies")}</p> <BiSolidChevronRight />
                </Link>
              </motion.div>
            </div>
          </>
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          className="relative mt-8 flex h-76 w-76 lg:mt-0 lg:h-100 lg:w-100"
          initial={{ y: 0 }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
        >
          <LottieComponent src="/HomePageAnimation.lottie" />
        </motion.div>
      </div>
      <AnimatedText
        once
        className="mt-72 w-full text-center text-3xl font-bold text-white"
        text={t("recentlyAdded")}
      />
      <Suspense fallback={<LoadingRecentlyAddedMovies />}>
        <RecentlyAddedMovies recentlyAddedMoviesPromise={recentlyAddedMoviesPromise} />
      </Suspense>
    </>
  );
}
