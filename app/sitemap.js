import { client } from "../sanity/lib/client";
import { baseURL } from "./lib/bases";

export default async function sitemap() {
  async function getData() {
    const query = `*[_type=='Movie-studio']
      {"slug": slug.current, _updatedAt}`;
    const data = await client.fetch(query);
    return data;
  }
  const moviess = await getData();

  const movies = moviess.map((movie) => ({
    url: `${baseURL}/movie/${movie.slug}`,
    lastModified: movie._updatedAt,
  }));

  const routes = ["/", "/movies", "/about"].map((route) => ({
    url: `${baseURL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...movies];
}
