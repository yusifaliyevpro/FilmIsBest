import { getMovies } from "@/data-access/sanity/movies/get";
import { BASE_URL } from "@/lib/constants";

export default async function sitemap() {
  const moviesData = await getMovies();

  const staticRoutes = [``, `movies`, `about`].map((route) => ({
    url: `${BASE_URL}/en/${route}`,
    lastModified: new Date().toISOString(),
  }));

  const movies = moviesData.map((movie) => ({
    url: `${BASE_URL}/en/movies/${movie.slug}`,
    lastModified: movie._updatedAt,
  }));

  return [...staticRoutes, ...movies];
}
