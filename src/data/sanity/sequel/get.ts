import { defineQuery } from "next-sanity";
import { cacheLife, cacheTag } from "next/cache";
import { cacheTags } from "@/lib/cache-tags";
import { client } from "@/sanity/lib/client";
import type { SequelQueryResult } from "@/sanity/types";

export async function getSequel(movieSlug: string) {
  "use cache";
  cacheLife("max");
  // `sequels` busts on any sequel-doc change; the movie tag busts when this
  // specific movie changes (its poster/name shows in the sequel list).
  cacheTag(cacheTags.sequels, cacheTags.movie(movieSlug));

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
