/**
 * Interactive OMDb re-sync for the OMDb-sourced fields of every published
 * Movie-studio document.
 *
 * For each movie it fetches fresh OMDb data, computes the fields that come
 * straight from OMDb (filmName, imdbpuan, actors, directed, country,
 * releaseDate, movieTime, genre) and shows a colored diff of ONLY the fields
 * that actually changed:
 *
 *   filmName: "Kunf Fu Panda 4"  ->  "Kung Fu Panda 4"
 *              (red, current)          (green, new from OMDb)
 *
 *   Enter        commit the change
 *   Ctrl+Enter   skip this movie
 *   q            quit
 *
 * Movies with no differences are skipped silently. Poster, trailer,
 * description and slug are never touched.
 *
 * Movies are walked oldest → newest (_createdAt). Pass a 1-based start position
 * to resume partway through, e.g. start from the 100th movie:
 *
 * Run: npx sanity exec scripts/sync-omdb.ts --with-user-token
 *      npx sanity exec scripts/sync-omdb.ts --with-user-token 100
 */
import { getCliClient } from "sanity/cli";
import { decodeOMDbStrings, parseReleaseYear } from "../src/data/omdb/decode";
import { GENRE_LIST } from "../src/lib/genres";

const client = getCliClient();
const OMDB_API_KEY = process.env.OMDB_API_KEY;

// --- tiny ANSI helpers (no dependency) ---------------------------------------
const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const dim = (s: string) => `\x1b[2m${s}\x1b[0m`;
const bold = (s: string) => `\x1b[1m${s}\x1b[0m`;

type OMDbMovieData = {
  Title: string;
  Year: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Country: string;
  imdbRating: string;
  Response: string;
};

type MovieDoc = {
  _id: string;
  imdbID: string;
  filmName?: string;
  imdbpuan?: number;
  releaseDate?: number;
  movieTime?: number;
  country?: string;
  genre?: string[];
  actors?: unknown;
  directed?: unknown;
};

const FIELD_ORDER = [
  "filmName",
  "imdbpuan",
  "releaseDate",
  "movieTime",
  "country",
  "genre",
  "actors",
  "directed",
] as const;

/** Extracts the minutes count from an OMDb runtime string like "142 min". */
function extractMovieTime(runtime: string): number {
  const match = runtime?.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

function splitNames(value: string): string[] {
  return (value ?? "")
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name && name !== "N/A");
}

/**
 * Builds the OMDb fields that came back with valid values. Anything OMDb
 * reports as missing/"N/A"/unparseable is omitted so it can't be proposed as a
 * change that would wipe existing data.
 */
function buildFields(omdb: OMDbMovieData): Record<string, unknown> {
  const fields: Record<string, unknown> = {};

  const title = omdb.Title?.trim();
  if (title && title !== "N/A") fields.filmName = title;

  const rating = parseFloat(omdb.imdbRating);
  if (Number.isFinite(rating) && rating >= 0 && rating <= 10) {
    fields.imdbpuan = Math.round(rating * 10) / 10;
  }

  const actors = splitNames(omdb.Actors);
  if (actors.length > 0) fields.actors = actors;

  const directed = splitNames(omdb.Director);
  if (directed.length > 0) fields.directed = directed;

  const country = omdb.Country?.trim();
  if (country && country !== "N/A") fields.country = country;

  const year = parseReleaseYear(omdb.Year);
  if (year !== undefined && year >= 1895 && year <= new Date().getFullYear()) {
    fields.releaseDate = year;
  }

  const movieTime = extractMovieTime(omdb.Runtime);
  if (movieTime > 0) fields.movieTime = movieTime;

  const genre = (omdb.Genre ?? "")
    .split(",")
    .map((g) => g.trim())
    .filter((g) => (GENRE_LIST as readonly string[]).includes(g));
  if (genre.length > 0) fields.genre = genre;

  return fields;
}

async function fetchOMDB(imdbID: string): Promise<OMDbMovieData | null> {
  const res = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`);
  if (!res.ok) return null;
  const data = (await res.json()) as OMDbMovieData;
  return data.Response === "False" ? null : decodeOMDbStrings(data);
}

/** True when the current Sanity value already matches the proposed OMDb value. */
function isEqual(current: unknown, next: unknown): boolean {
  if (Array.isArray(next)) {
    if (!Array.isArray(current) || current.length !== next.length) return false;
    return current.every((v, i) => String(v) === String(next[i]));
  }
  if (typeof next === "number") return Number(current) === next;
  return String(current ?? "").trim() === String(next).trim();
}

function formatValue(v: unknown): string {
  if (v === undefined || v === null || v === "") return "(empty)";
  if (Array.isArray(v)) return `[${v.map((x) => `"${x}"`).join(", ")}]`;
  if (typeof v === "string") return `"${v}"`;
  return String(v);
}

type Diff = { label: string; current: unknown; next: unknown };

function computeDiffs(doc: MovieDoc, proposed: Record<string, unknown>): Diff[] {
  const diffs: Diff[] = [];
  for (const label of FIELD_ORDER) {
    if (!(label in proposed)) continue;
    const next = proposed[label];
    const current = (doc as Record<string, unknown>)[label];
    if (!isEqual(current, next)) diffs.push({ label, current, next });
  }
  return diffs;
}

/**
 * Waits for a single keypress in raw mode and maps it to an action.
 * Enter (CR) = update, Ctrl+Enter (LF) or "s" = skip, "q" = quit, Ctrl+C aborts.
 */
function waitForAction(): Promise<"update" | "skip" | "quit"> {
  return new Promise((resolve) => {
    process.stdin.setRawMode?.(true);
    process.stdin.resume();

    const onData = (buf: Buffer) => {
      const key = buf.toString("utf8");
      const code = key.charCodeAt(0);

      let action: "update" | "skip" | "quit" | null = null;
      if (code === 3) {
        // Ctrl+C — restore terminal and abort the whole run.
        process.stdin.setRawMode?.(false);
        process.stdin.pause();
        console.log("\nAborted.");
        process.exit(0);
      } else if (code === 13)
        action = "update"; // Enter (CR)
      else if (code === 10)
        action = "skip"; // Ctrl+Enter (LF)
      else if (key.toLowerCase() === "s") action = "skip";
      else if (key.toLowerCase() === "q") action = "quit";

      if (!action) return; // ignore any other key, keep waiting

      process.stdin.removeListener("data", onData);
      process.stdin.setRawMode?.(false);
      process.stdin.pause();
      resolve(action);
    };

    process.stdin.on("data", onData);
  });
}

async function run() {
  if (!OMDB_API_KEY) {
    console.error("OMDB_API_KEY is not set. Add it to your .env file.");
    process.exit(1);
  }
  if (!process.stdin.isTTY) {
    console.error("This script is interactive — run it in a terminal (TTY).");
    process.exit(1);
  }

  // Optional 1-based start position, e.g. `... sync-omdb.ts --with-user-token 100`
  // resumes from the 100th movie. Anything before it is skipped entirely.
  const startArg = process.argv.find((a) => /^\d+$/.test(a));
  const startFrom = startArg ? Math.max(1, parseInt(startArg, 10)) : 1;

  // Oldest → newest so the walk order is stable across runs.
  const movies = await client.fetch<MovieDoc[]>(
    `*[_type == "Movie-studio" && !(_id in path("drafts.**")) && defined(imdbID)]
      | order(_createdAt asc){
        _id, imdbID, filmName, imdbpuan, releaseDate, movieTime, country, genre, actors, directed
      }`,
  );

  const from = startFrom > 1 ? ` (starting at #${startFrom})` : "";
  console.log(`Fetched ${movies.length} movies${from}. ${dim("Enter = update · Ctrl+Enter = skip · q = quit")}\n`);

  let updated = 0;
  let skipped = 0;
  let unchanged = 0;
  let failed = 0;

  for (const [i, movie] of movies.entries()) {
    if (i < startFrom - 1) continue; // resume point
    const counter = dim(`[${i + 1}/${movies.length}]`);
    let omdb: OMDbMovieData | null;
    try {
      omdb = await fetchOMDB(movie.imdbID);
    } catch (err) {
      console.log(
        `${counter} ${movie.filmName ?? movie.imdbID} — ${red("OMDb fetch failed")}: ${err instanceof Error ? err.message : err}`,
      );
      failed++;
      continue;
    }

    if (!omdb) {
      console.log(`${counter} ${movie.filmName ?? movie.imdbID} — ${dim(`no OMDb data (${movie.imdbID}), skipped`)}`);
      failed++;
      continue;
    }

    const proposed = buildFields(omdb);
    const diffs = computeDiffs(movie, proposed);

    if (diffs.length === 0) {
      unchanged++;
      continue; // identical — skip silently
    }

    console.log(`${counter} ${bold(movie.filmName ?? movie.imdbID)} ${dim(movie.imdbID)}`);
    for (const d of diffs) {
      console.log(`  ${d.label}: ${red(formatValue(d.current))} ${dim("->")} ${green(formatValue(d.next))}`);
    }

    const action = await waitForAction();
    if (action === "quit") {
      console.log(dim("Quit."));
      break;
    }
    if (action === "skip") {
      console.log(dim("  skipped\n"));
      skipped++;
      continue;
    }

    // action === "update": patch only the changed fields.
    const changed: Record<string, unknown> = {};
    for (const d of diffs) changed[d.label] = d.next;
    try {
      await client.patch(movie._id).set(changed).commit();
      console.log(`  ${green("✓ updated")}\n`);
      updated++;
    } catch (err) {
      console.log(`  ${red("✗ update failed")}: ${err instanceof Error ? err.message : err}\n`);
      failed++;
    }
  }

  console.log("—");
  console.log(`Updated:   ${updated}`);
  console.log(`Skipped:   ${skipped}`);
  console.log(`Unchanged: ${unchanged}`);
  console.log(`Failed:    ${failed}`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
