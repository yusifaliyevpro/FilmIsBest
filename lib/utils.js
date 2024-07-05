import { BASE_URL } from "./constants";
import { client } from "@/sanity/lib/client";

export async function getSlugs() {
  const query = `*[_type=='Movie-studio']|order(_createdAt desc)
      {"slug": slug.current}`;
  const data = await client.fetch(
    query,
    { cache: "force-cache" },
    { next: { revalidate: 3600 } },
  );
  return data;
}

export async function getSitemapData() {
  const query = `*[_type=='Movie-studio']
      {"slug": slug.current, _updatedAt}`;
  const data = await client.fetch(
    query,
    { cache: "force-cache" },
    { next: { revalidate: 3600 } },
  );
  return data;
}

export async function getRecentMovies() {
  const query = `*[_type=='Movie-studio']|order(_createdAt desc)
      {filmName, poster, "slug": slug.current, imdbpuan, releaseDate}[0...10]`;
  const data = await client.fetch(
    query,
    { cache: "force-cache" },
    { next: { revalidate: 3600 } },
  );
  return data;
}

export async function getCount() {
  const query = `count(*[_type == "Movie-studio"])`;
  const data = await client.fetch(
    query,
    { cache: "force-cache" },
    { next: { revalidate: 3600 } },
  );
  return data;
}

export async function getMovies() {
  const query = `*[_type=='Movie-studio']|order(_createdAt desc){filmName, "poster": poster.asset->url, slug, _id, imdbpuan, imdbID, releaseDate}`;
  const data = await client.fetch(
    query,
    { cache: "force-cache" },
    { next: { revalidate: 3600 } },
  );
  return data;
}

export async function getMovie({ params }) {
  const query = `*[_type=='Movie-studio' && slug.current=='${params.slug}']
      {filmName, "poster": poster.asset->url, "slug": slug.current, imdbpuan, releaseDate, genre, description, _id, directed, country, movieTime, imdbID, EnglishLink, EnglishSubtitleLink, FraqmanLink, TurkishLink, TurkishSubtitleLink, actors}[0]`;
  const data = await client.fetch(
    query,
    { cache: "force-cache" },
    { next: { revalidate: 3600 } },
  );
  return data;
}

export async function getSequel({ movieID }) {
  const query = `*[_type == "sequel" && references("${movieID}")] {
          name,
          "movies": movies[]->{
            filmName,
            "slug": slug.current,
            "poster": poster.asset->url,
          }
        }`;
  const data = await client.fetch(
    query,
    { cache: "force-cache" },
    { next: { revalidate: 3600 } },
  );
  return data[0];
}

export const getRequests = async ({ password }) => {
  if (password === process.env.ADMIN_PASSWORD) {
    try {
      const res = await fetch(`${BASE_URL}/api/movierequests`, {
        next: { tags: ["MovieRequests"] },
        method: "GET",
        headers: { password: password },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    } catch (error) {
      console.log("Error loading products: ", error);
    }
  } else return null;
};
