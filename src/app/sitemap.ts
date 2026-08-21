import type { MetadataRoute } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { getMovies } from "@/data/sanity/movies/get";
import { routing } from "@/i18n/routing";
import { cacheTags } from "@/lib/cache-tags";
import { BASE_URL } from "@/lib/constants";

const LAUNCH_DATE = "2024-01-01T00:00:00.000Z";

function languagesFor(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) languages[locale] = `${BASE_URL}/${locale}${path}`;
  return languages;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("max");
  cacheTag(cacheTags.movies);
  const moviesData = await getMovies();

  const staticRoutes: MetadataRoute.Sitemap = ["", "/movies", "/about"].flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: LAUNCH_DATE,
      alternates: { languages: languagesFor(path) },
    })),
  );

  const movies: MetadataRoute.Sitemap = moviesData.flatMap((movie) => {
    const path = `/movies/${movie.slug}`;
    return routing.locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: movie._updatedAt,
      alternates: { languages: languagesFor(path) },
    }));
  });

  return [...staticRoutes, ...movies];
}
