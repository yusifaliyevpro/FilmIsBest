import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import Movies from "@/app/components/movies";
import PaginationUI from "@/app/components/pagination";
import Search from "@/app/components/search";
import { BASE_URL } from "@/app/lib/constants";
import { Motion } from "@/app/components/Motion";
import { getScopedI18n, getStaticParams } from "@/locales/server";
import { I18nProviderClient } from "@/locales/client";
import { setStaticParamsLocale } from "next-international/server";

export async function generateMetadata({ params: { locale } }) {
  const t = await getScopedI18n("MetaData.Movies");
  return {
    title: t("title"),
    url: `${BASE_URL}/movies`,
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}/movies`,
      languages: {
        en: `${BASE_URL}/en/movies`,
        "az-AZ": `${BASE_URL}/az/movies`,
        "tr-TR": `${BASE_URL}/tr/movies`,
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
      url: `${BASE_URL}/movies`,
    },
  };
}

/**
 * Asynchronously fetches data based on the search criteria and limit provided.
 * @param {Object} search - The search criteria object.
 * @param {string} search - The search term to filter the data.
 * @param {number} limit - The maximum number of results to return.
 * @returns {Promise} A promise that resolves to the fetched data.
 */
async function getData({ search, limit }) {
  const query = `*[_type=='Movie-studio' ${search !== undefined ? "&& [filmName, imdbID] match " + `'${search}*'` : ""}]|order(_createdAt desc)${limit}{filmName, "poster": poster.asset->url, slug, _id, imdbpuan, releaseDate}`;
  const data = await client.fetch(
    query,
    { cache: "force-cache" },
    { next: { revalidate: 3600 } },
  );
  return data;
}

/**
 * Retrieves the count of Movie-studio documents from the database.
 * @returns {Promise<number>} A promise that resolves to the count of Movie-studio documents.
 */
export async function getCount() {
  const query = `count(*[_type == "Movie-studio"])`;
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

export default async function MoviesPage({ searchParams, params: { locale } }) {
  setStaticParamsLocale(locale);
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const count = await getCount();
  const limit = `[${page === 1 ? 0 : (page - 1) * 20}...${page === 1 ? 20 : page * 20}]`;
  const movies = await getData({ search, limit });
  const resultCount = movies.length;
  return (
    <section className="justify-content-center relative mx-auto mb-20 mt-6 flex flex-col items-center justify-center">
      <div className="sm:flx-row relative flex w-full flex-col items-center justify-center">
        <I18nProviderClient locale={locale}>
          <Suspense
            fallback={
              <div className=" mx-auto mb-4 mt-6 h-[44px] w-[300px] animate-pulse rounded-full bg-gray-200 sm:w-[500px]"></div>
            }
          >
            <Search
              searchQuery={search}
              resultCount={resultCount}
              pageQuery={page}
              locale={locale}
            />
          </Suspense>
        </I18nProviderClient>
        <Suspense
          fallback={
            <div className="relative mt-5 flex animate-pulse rounded-xl bg-gray-200">
              <div className="h-[36px] w-[76px]"></div>
            </div>
          }
        >
          <PaginationUI
            searchQuery={search}
            resultCount={resultCount}
            pageQuery={page}
            count={count}
            locale={locale}
          />
        </Suspense>
      </div>
      <Motion
        initial={{ y: 600 }}
        animate={{ y: 0 }}
        transition={{
          duration: 1.2,
          type: "spring",
          stiffness: 55,
        }}
      >
        <Suspense>
          <Movies movies={movies} />
        </Suspense>
      </Motion>
    </section>
  );
}
