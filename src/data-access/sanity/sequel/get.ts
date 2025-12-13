"use server";

import { client } from "@/sanity/lib/client";
import { SequelQueryResult } from "@/sanity/types";
import { defineQuery } from "next-sanity";
import { cacheLife } from "next/cache";

export async function getSequel(movieSlug: string) {
  "use cache: remote";
  cacheLife("hours");

  const SequelQuery = defineQuery(`
    *[_type == "sequel" && references(*[_type == "Movie-studio" && slug.current == $slug][0]._id)][0] {
      name,
      "movies": movies[]-> 
        | order(releaseDate desc) {
          filmName,
          "slug": slug.current,
          "poster": poster.asset->url,
          "posterlqip": poster.asset->metadata.lqip
        }
    }
  `);

  const data = await client.fetch<SequelQueryResult>(SequelQuery, { slug: movieSlug });
  return data;
}
