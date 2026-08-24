import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { routing } from "@/i18n/routing";
import { SITE_KEYWORDS } from "@/lib/constants";
import type { MovieQueryResult } from "@/sanity/types";

const HREFLANG: Record<Locale, string> = {
  en: "en",
  az: "az-AZ",
  tr: "tr-TR",
};

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  az: "az_AZ",
  tr: "tr_TR",
};

function alternates(locale: Locale, path = ""): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[HREFLANG[l]] = `/${l}${path}`;
  languages["x-default"] = `/${routing.defaultLocale}${path}`;

  return { canonical: `/${locale}${path}`, languages };
}

function ogImage(title: string) {
  return {
    url: `/api/og?title=${encodeURIComponent(title)}`,
    width: 1200,
    height: 1000,
    alt: `FilmIsBest | ${title} | OpenGraph-Image`,
    type: "image/png",
  } as const;
}

type BuildMetadataArgs = {
  locale: Locale;
  path?: string;
  title: string | { absolute: string };
  description: string;
  ogTitle?: string;
  ogImageTitle?: string;
  keywords?: string[];
};

export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  ogTitle,
  ogImageTitle,
  keywords,
}: BuildMetadataArgs): Metadata {
  const plainTitle = typeof title === "string" ? title : title.absolute;

  return {
    title,
    description,
    keywords: keywords ? [...keywords, ...SITE_KEYWORDS] : [...SITE_KEYWORDS],
    alternates: alternates(locale, path),
    openGraph: {
      title: ogTitle ?? `FilmIsBest | ${plainTitle}`,
      description,
      url: `/${locale}${path}`,
      siteName: "FilmIsBest",
      locale: OG_LOCALE[locale],
      type: "website",
      ...(ogImageTitle ? { images: [ogImage(ogImageTitle)] } : {}),
    },
  };
}

export function movieJsonLd(movie: NonNullable<MovieQueryResult>, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.filmName,
    url,
    image: movie.poster,
    description: movie.description,
    ...(movie.releaseDate ? { datePublished: String(movie.releaseDate) } : {}),
    ...(movie.genre?.length ? { genre: movie.genre } : {}),
    ...(movie.country ? { countryOfOrigin: movie.country } : {}),
    ...(movie.movieTime ? { duration: `PT${movie.movieTime}M` } : {}),
    ...(movie.imdbID ? { sameAs: `https://www.imdb.com/title/${movie.imdbID}/` } : {}),
    ...(movie.directed?.length ? { director: movie.directed.map((name) => ({ "@type": "Person", name })) } : {}),
    ...(movie.actors?.length ? { actor: movie.actors.map((name) => ({ "@type": "Person", name })) } : {}),
    ...(movie.imdbpuan
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: movie.imdbpuan,
            bestRating: 10,
            worstRating: 1,
            ratingCount: 1,
          },
        }
      : {}),
  };
}
