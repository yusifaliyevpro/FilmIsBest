import { client } from "@/sanity/lib/client";
import { baseURL } from "./lib/bases";

export default async function Sitemap() {
  async function getData() {
    const query = `*[_type=='Movie-studio']
      {"slug": slug.current, _updatedAt}`;
    const data = await client.fetch(query);
    return data;
  }
  const moviess = await getData();

  const enMovies = moviess.map((movie) => ({
    url: `${baseURL}/en/movie/${movie.slug}`,
    lastModified: movie._updatedAt,
  }));

  const azMovies = moviess.map((movie) => ({
    url: `${baseURL}/az/movie/${movie.slug}`,
    lastModified: movie._updatedAt,
  }));

  const routes = [
    `/en`,
    `/en/movies`,
    `/en/about`,
    `/az`,
    `/az/movies`,
    `/az/about`,
  ].map((route) => ({
    url: `${baseURL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...enMovies, ...azMovies];
}
