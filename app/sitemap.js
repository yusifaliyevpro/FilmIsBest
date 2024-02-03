import { client } from "@/sanity/lib/client";
const BASE_URL = "https://filmisbest.com";

export default async function sitemap() {
  async function getData() {
    const query = `*[_type=='Movie-studio']
      {"slug": slug.current, _updatedAt}`;
    const data = await client.fetch(query);
    return data;
  }
  const moviess = await getData();

  const movies = moviess.map((movie) => ({
    url: `${BASE_URL}/movies/${movie.slug}`,
    lastModified: movie._updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const routes = ["", "/movies"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.99,
  }));

  return [...routes, ...movies];
}
