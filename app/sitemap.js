import { getSitemapData } from "@/lib/utils";
import { BASE_URL } from "@/lib/constants";

export default async function sitemap() {
  const moviess = await getSitemapData();

  const Movies = moviess.map((movie) => ({
    url: `${BASE_URL}/en/movies/${movie.slug}`,
    lastModified: movie._updatedAt,
  }));

  const routes = [``, `/movies`, `/about`].map((route) => ({
    url: `${BASE_URL}/en${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...Movies];
}
