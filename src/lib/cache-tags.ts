// Centralized Next.js cache tags. Keep these in sync with the Sanity
// revalidation webhook (src/app/api/sanity/revalidate/route.ts), which busts
// these same tags when a document is created, updated, or deleted.
export const cacheTags = {
  movies: "movies",
  movie: (slug: string) => `movie-${slug}`,
  sequels: "sequels",
} as const;

// Sanity `_type` values mapped to the tags that must be revalidated when a
// document of that type changes.
export function tagsForSanityDocument(type: string, slug?: string): string[] {
  switch (type) {
    case "Movie-studio":
      return slug ? [cacheTags.movies, cacheTags.movie(slug)] : [cacheTags.movies];
    case "sequel":
      return [cacheTags.sequels];
    default:
      return [];
  }
}
