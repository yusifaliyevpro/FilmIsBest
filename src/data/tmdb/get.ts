"use server";

import { createClient } from "next-sanity";
import { isSanityProjectMember } from "@/sanity/lib/verifyUser";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_BASE = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/original";

/** How many poster variants to upload to the asset library at most. */
const MAX_POSTERS = 5;

export type TmdbResult<T> =
  | { status: "ok"; data: T }
  | { status: "unauthorized" }
  | { status: "not-found" }
  | { status: "error"; message: string };

type TmdbMovie = { id: number; poster_path: string | null };

type TmdbVideo = {
  key: string;
  site: string;
  type: string;
  official: boolean;
  name: string;
};

/** Resolves a TMDB movie from an IMDb ID via the /find endpoint. */
async function findTmdbMovie(imdbID: string): Promise<TmdbMovie | null> {
  const res = await fetch(
    `${TMDB_API_BASE}/find/${imdbID}?external_source=imdb_id&api_key=${TMDB_API_KEY}`,
    { cache: "no-store" },
  );
  if (!res.ok) {
    console.error("[tmdb] find failed:", res.status, await res.text());
    return null;
  }
  const data = (await res.json()) as { movie_results?: TmdbMovie[] };
  return data.movie_results?.[0] ?? null;
}

/**
 * Finds the official YouTube trailer ID for a film. Prefers a video flagged as
 * an official "Trailer", then any trailer, then a teaser, then anything.
 */
export async function getMovieTrailerId(
  imdbID: string,
  token: string,
): Promise<TmdbResult<string>> {
  if (!TMDB_API_KEY) {
    console.error("[tmdb] TMDB_API_KEY is not set");
    return { status: "error", message: "TMDB_API_KEY is not configured on the server." };
  }

  const isMember = await isSanityProjectMember(token);
  if (!isMember) return { status: "unauthorized" };

  const movie = await findTmdbMovie(imdbID);
  if (!movie) return { status: "not-found" };

  const res = await fetch(`${TMDB_API_BASE}/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("[tmdb] videos failed:", res.status, await res.text());
    return { status: "error", message: "Failed to fetch videos from TMDB." };
  }

  const data = (await res.json()) as { results?: TmdbVideo[] };
  const youtube = (data.results ?? []).filter((v) => v.site === "YouTube");

  const pick =
    youtube.find((v) => v.type === "Trailer" && v.official) ??
    youtube.find((v) => v.type === "Trailer") ??
    youtube.find((v) => v.type === "Teaser") ??
    youtube[0];

  if (!pick) return { status: "not-found" };

  console.log("[tmdb] picked trailer:", pick.name, pick.key);
  return { status: "ok", data: pick.key };
}

/**
 * Downloads the TMDB poster for a film and uploads it as a Sanity image asset
 * using the caller's token. The download and upload both happen server-side, so
 * no image bytes have to cross CORS in the browser.
 *
 * TMDB usually has several poster variants per film, so we upload up to
 * MAX_POSTERS of them to the asset library — they become selectable via the
 * field's built-in "Select" browser. The first asset id is returned so the
 * caller can patch it into the field straight away (so it's never empty).
 */
export async function uploadMoviePosters(
  imdbID: string,
  token: string,
  filmName?: string,
): Promise<TmdbResult<{ assetIds: string[] }>> {
  if (!TMDB_API_KEY) {
    console.error("[tmdb] TMDB_API_KEY is not set");
    return { status: "error", message: "TMDB_API_KEY is not configured on the server." };
  }

  const isMember = await isSanityProjectMember(token);
  if (!isMember) return { status: "unauthorized" };

  const movie = await findTmdbMovie(imdbID);
  if (!movie) return { status: "not-found" };

  // Pull all poster variants; fall back to the single primary poster.
  let posterPaths: string[] = [];
  const imagesRes = await fetch(
    `${TMDB_API_BASE}/movie/${movie.id}/images?api_key=${TMDB_API_KEY}&include_image_language=en,null`,
    { cache: "no-store" },
  );
  if (imagesRes.ok) {
    const data = (await imagesRes.json()) as { posters?: { file_path: string }[] };
    posterPaths = (data.posters ?? []).map((p) => p.file_path);
  } else {
    console.error("[tmdb] images failed:", imagesRes.status);
  }
  if (posterPaths.length === 0 && movie.poster_path) posterPaths = [movie.poster_path];
  if (posterPaths.length === 0) return { status: "not-found" };

  const selected = posterPaths.slice(0, MAX_POSTERS);
  const writeClient = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

  // Upload in order; keep successful asset ids in the same order so index 0 is
  // TMDB's top-ranked poster.
  const results = await Promise.all(
    selected.map(async (path, i) => {
      try {
        const imgRes = await fetch(`${TMDB_IMAGE_BASE}${path}`);
        if (!imgRes.ok) {
          console.error("[tmdb] poster download failed:", path, imgRes.status);
          return null;
        }
        const buffer = Buffer.from(await imgRes.arrayBuffer());
        const asset = await writeClient.assets.upload("image", buffer, {
          filename: `${imdbID}-${i + 1}.jpg`,
          title: filmName ? `${filmName} — poster ${i + 1}` : `${imdbID} poster ${i + 1}`,
          contentType: imgRes.headers.get("content-type") ?? "image/jpeg",
        });
        return asset._id;
      } catch (err) {
        console.error("[tmdb] poster upload failed:", path, err);
        return null;
      }
    }),
  );

  const assetIds = results.filter((id): id is string => Boolean(id));
  if (assetIds.length === 0) {
    return { status: "error", message: "Failed to upload posters to Sanity." };
  }

  console.log("[tmdb] uploaded poster assets:", assetIds);
  return { status: "ok", data: { assetIds } };
}
