export const BASE_URL =
  process.env.NODE_ENV === "production" ? "https://filmisbest.vercel.app" : "http://localhost:3000";

// Shared, deduplicated keyword set describing what FilmIsBest actually is:
// a free site to watch movies online with English / Turkish / Azerbaijani
// subtitle options and trailers. Reused across metadata so the list lives in
// one place instead of being copy-pasted per route.
export const SITE_KEYWORDS = [
  "FilmIsBest",
  "watch movies online",
  "free movies online",
  "watch movies free",
  "HD movies",
  "movies with subtitles",
  "movie trailers",
  "English subtitles",
  "Turkish subtitles",
  "Azerbaijani subtitles",
  // Turkish
  "film izle",
  "online film izle",
  "Türkçe altyazılı film",
  "Türkçe dublaj film",
  "İngilizce altyazılı film",
  // Azerbaijani
  "film izlə",
  "onlayn film izlə",
  "pulsuz film",
  "Azərbaycan dilində film",
  "altyazılı film",
] as const;
