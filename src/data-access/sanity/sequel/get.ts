import { client } from "@/sanity/lib/client";
import { SequelQueryResult } from "@/sanity/types";
import { defineQuery } from "next-sanity";

export async function getSequel(movieSlug: string) {
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

  const data = await client.fetch<SequelQueryResult>(
    SequelQuery,
    { slug: movieSlug },
    { next: { revalidate: 3600 } },
  );
  return data;
}
