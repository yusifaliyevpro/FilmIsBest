import { client } from "@/sanity/lib/client";
import { BASE_URL } from "../constants";

export default async function generateSitemap() {
  async function getData() {
    const query = `*[_type=='Movie-studio']
      {"slug": slug.current, _updatedAt}`;
    const data = await client.fetch(query);
    return data;
  }
  const moviess = await getData();

  const Movies = moviess.map((movie) => ({
    url: `${BASE_URL}/movies/${movie.slug}`,
    lastModified: movie._updatedAt,
  }));

  const routes = [`/`, `/movies`, `/about`].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...Movies];
}
