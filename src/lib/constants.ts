export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://filmisbest.com"
    : "http://localhost:3000";
export type Locales = "az" | "en" | "tr";
export const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
