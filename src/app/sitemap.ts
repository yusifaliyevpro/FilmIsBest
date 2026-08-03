import type { MetadataRoute } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { getMovies } from "@/data/sanity/movies/get";
import { cacheTags } from "@/lib/cache-tags";
import { BASE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("max");
  cacheTag(cacheTags.movies);
  const moviesData = await getMovies();

  const staticRoutes: MetadataRoute.Sitemap = [``, `movies`, `about`].map((route) => ({
    url: `${BASE_URL}/en/${route}`,
    lastModified: new Date().toISOString(),
  }));

  const movies: MetadataRoute.Sitemap = moviesData.map((movie) => ({
    url: `${BASE_URL}/en/movies/${movie.slug}`,
    lastModified: movie._updatedAt,
  }));

  return [...staticRoutes, ...movies];
}
