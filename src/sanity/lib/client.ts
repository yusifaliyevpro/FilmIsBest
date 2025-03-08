import { apiVersion, dataset, projectId } from "../env";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

export const availableGenres = [
  "Action",
  "Adventure",
  "Drama",
  "Thriller",
  "Animation",
  "Comedy",
  "Family",
  "Sci-Fi",
  "Fantasy",
  "Horror",
  "Mystery",
  "Documentary",
  "War",
  "Crime",
  "Historical",
];
