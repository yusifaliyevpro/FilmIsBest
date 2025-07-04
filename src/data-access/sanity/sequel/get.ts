import { client } from "@/sanity/lib/client";
import { SequelQueryResult } from "@/sanity/types";
import { defineQuery } from "next-sanity";

export async function getSequel(movieID: string) {
  const SequelQuery = defineQuery(`
    *[_type == "sequel" && references($movieID)][0] {
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

  const data = await client.fetch<SequelQueryResult>(SequelQuery, { movieID });
  return data;
}
