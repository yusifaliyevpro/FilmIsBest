import { client } from "@/sanity/lib/client";
import { baseURL } from "./lib/bases";
import { useLocale } from "next-intl";

export default async function sitemap() {
  async function getData() {
    const query = `*[_type=='Movie-studio']
      {"slug": slug.current, _updatedAt}`;
    const data = await client.fetch(query);
    return data;
  }
  const moviess = await getData();
  const locale = useLocale();

  const movies = moviess.map((movie) => ({
    url: `${baseURL}/${locale}/movie/${movie.slug}`,
    lastModified: movie._updatedAt,
  }));

  const routes = [`/${locale}`, `/${locale}/movies`, `/${locale}/about`].map(
    (route) => ({
      url: `${baseURL}${route}`,
      lastModified: new Date().toISOString(),
    }),
  );

  return [...routes, ...movies];
}
