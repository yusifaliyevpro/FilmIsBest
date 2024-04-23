import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import Movies from "@/app/components/movies";
import PaginationUI from "@/app/components/pagination";
import Search from "@/app/components/search";
import SearchSkeleton from "@/app/components/searchSkeleton";
import PaginationSkeleton from "@/app/components/paginationSkeleton";
import { baseURL } from "@/app/lib/bases";
import { MotionDiv } from "@/app/components/motionDiv";
import { getScopedI18n, getStaticParams } from "@/locales/server";
import { I18nProviderClient } from "@/locales/client";
import { setStaticParamsLocale } from "next-international/server";

export async function generateMetadata({ params }) {
  const locale = params.locale;
  const t = await getScopedI18n("MetaData.Movies");
  return {
    title: t("title"),
    url: `${baseURL}/movies`,
    description: t("description"),
    alternates: {
      canonical: `${baseURL}/movies`,
      languages: {
        "en-US": `${baseURL}/en/movies`,
        "en-GB": `${baseURL}/en/movies`,
        "az-AZ": `${baseURL}/az/movies`,
        "tr-TR": `${baseURL}/tr/movies`,
      },
    },
    openGraph: {
      description: t("description"),
      images: [
        {
          url: `${baseURL}/api/og?title=${encodeURI(t("title"))}`,
          width: 1200,
          height: 1000,
          alt: `FilmIsBest | ${t("title")} | OpenGraph-Image`,
          type: "image/png",
        },
      ],
      title: `FilmIsBest | ${t("title")}`,
      url: `${baseURL}/movies`,
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
          <Suspense fallback={<SearchSkeleton />}>
            <Search
              searchQuery={search}
              resultCount={resultCount}
              pageQuery={page}
              locale={locale}
            />
          </Suspense>
        </I18nProviderClient>
        <Suspense fallback={<PaginationSkeleton />}>
          <PaginationUI
            searchQuery={search}
            resultCount={resultCount}
            pageQuery={page}
            count={count}
            locale={locale}
          />
        </Suspense>
      </div>
      <MotionDiv
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
      </MotionDiv>
    </section>
  );
}
