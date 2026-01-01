import { getMovies } from "@/data/sanity/movies/get";
import { BASE_URL } from "@/lib/constants";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
