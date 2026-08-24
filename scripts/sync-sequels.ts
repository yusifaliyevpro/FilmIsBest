import { randomUUID } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getCliClient } from "sanity/cli";
import { cachedFetchJson } from "./fetch-cache";

const SKIP_FILE = join(dirname(fileURLToPath(import.meta.url)), "skipped-sequels.json");

type SkippedEntry = {
  tmdbCollectionId: number;
  name: string;
  movies: { filmName: string; releaseDate?: number }[];
};

function loadSkipped(): SkippedEntry[] {
  if (!existsSync(SKIP_FILE)) return [];
  try {
    const parsed: unknown = JSON.parse(readFileSync(SKIP_FILE, "utf8"));
    if (!Array.isArray(parsed)) return [];
    const skipped: SkippedEntry[] = parsed;
    return skipped;
  } catch {
    return [];
  }
}

function saveSkipped(list: SkippedEntry[]): void {
  const sorted = list.toSorted((a, b) => a.name.localeCompare(b.name));
  writeFileSync(SKIP_FILE, `${JSON.stringify(sorted, null, 2)}\n`);
}

const client = getCliClient();
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_BASE = "https://api.themoviedb.org/3";

const FLAG_YES = false;

const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const dim = (s: string) => `\x1b[2m${s}\x1b[0m`;
const bold = (s: string) => `\x1b[1m${s}\x1b[0m`;

type MovieDoc = {
  _id: string;
  filmName?: string;
  tmdbId: number;
  series?: boolean;
  releaseDate?: number;
};

type SequelDoc = {
  _id: string;
  name: string;
  tmdbCollectionId?: number | null;
  movieIds: string[];
};

type Collection = { id: number; name: string };

type Group = {
  collection: Collection;
  movies: MovieDoc[];
};

async function fetchCollection(tmdbId: number): Promise<Collection | null> {
  const { ok, body } = await cachedFetchJson<{ belongs_to_collection?: Collection | null }>(
    "fetchCollection",
    `${TMDB_API_BASE}/movie/${tmdbId}?api_key=${TMDB_API_KEY}`,
  );
  if (!ok) return null;
  const col = body?.belongs_to_collection;
  return col && typeof col.id === "number" ? { id: col.id, name: col.name } : null;
}

function cleanTitle(name: string): string {
  return name.replace(/\s*Collection$/i, "").trim() || name.trim();
}

function movieRef(id: string) {
  return { _type: "reference" as const, _ref: id, _key: randomUUID().replace(/-/g, "").slice(0, 12) };
}

function sortByRelease(ids: string[], releaseById: Map<string, number>): string[] {
  return ids
    .map((id, index) => ({ id, index }))
    .toSorted((a, b) => {
      const ra = releaseById.get(a.id) ?? Number.POSITIVE_INFINITY;
      const rb = releaseById.get(b.id) ?? Number.POSITIVE_INFINITY;
      return ra - rb || a.index - b.index;
    })
    .map((x) => x.id);
}

function sameOrder(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((id, i) => id === b[i]);
}

function waitForAction(): Promise<"update" | "skip" | "quit"> {
  return new Promise((resolve) => {
    process.stdin.setRawMode?.(true);
    process.stdin.resume();

    const onData = (buf: Buffer) => {
      const key = buf.toString("utf8");
      const code = key.charCodeAt(0);

      let action: "update" | "skip" | "quit" | null = null;
      if (code === 3) {
        process.stdin.setRawMode?.(false);
        process.stdin.pause();
        console.log("\nAborted.");
        process.exit(0);
      } else if (code === 13) action = "update";
      else if (code === 10) action = "skip";
      else if (key.toLowerCase() === "s") action = "skip";
      else if (key.toLowerCase() === "q") action = "quit";

      if (!action) return;

      process.stdin.removeListener("data", onData);
      process.stdin.setRawMode?.(false);
      process.stdin.pause();
      resolve(action);
    };

    process.stdin.on("data", onData);
  });
}

async function run() {
  if (!TMDB_API_KEY) {
    console.error("TMDB_API_KEY is not set. Add it to your .env file.");
    process.exit(1);
  }
  if (!FLAG_YES && !process.stdin.isTTY) {
    console.error("This script is interactive — run it in a terminal (TTY).");
    process.exit(1);
  }

  console.log(dim("Fetching movies and sequels from Sanity…"));
  const movies = await client.fetch<MovieDoc[]>(
    `*[_type == "Movie-studio" && !(_id in path("drafts.**")) && defined(tmdbId) && series != true]
      | order(_createdAt asc){ _id, filmName, tmdbId, series, releaseDate }`,
  );

  const sequels = await client.fetch<SequelDoc[]>(
    `*[_type == "sequel" && !(_id in path("drafts.**"))]{
      _id, name, tmdbCollectionId, "movieIds": movies[]._ref
    }`,
  );
  console.log(`Fetched ${bold(String(movies.length))} movies, ${bold(String(sequels.length))} sequels from Sanity.\n`);

  const groups = new Map<number, Group>();
  let scanFailed = 0;

  console.log(dim(`Scanning TMDB collections for ${movies.length} movies (cached in scripts/.cache)…`));
  for (const [i, movie] of movies.entries()) {
    const counter = dim(`[${i + 1}/${movies.length}]`);
    process.stdout.write(`\r${counter} ${dim("scanning…")}\x1b[K`);
    let collection: Collection | null;
    try {
      collection = await fetchCollection(movie.tmdbId);
    } catch (err) {
      process.stdout.write("\r\x1b[K");
      console.log(
        `${counter} ${movie.filmName ?? movie.tmdbId} — ${red("TMDB fetch failed")}: ${err instanceof Error ? err.message : String(err)}`,
      );
      scanFailed++;
      continue;
    }
    if (!collection) continue;

    const existing = groups.get(collection.id);
    if (existing) existing.movies.push(movie);
    else groups.set(collection.id, { collection, movies: [movie] });
  }
  process.stdout.write("\r\x1b[K");

  console.log(`Scan complete — ${bold(String(groups.size))} TMDB collections found.\n`);

  const hint = FLAG_YES ? dim("auto-committing changes (FLAG_YES)") : dim("Enter = apply · s = skip · q = quit");
  console.log(`${hint}\n`);

  const byCollectionId = new Map<number, SequelDoc>();
  for (const s of sequels) if (typeof s.tmdbCollectionId === "number") byCollectionId.set(s.tmdbCollectionId, s);

  const releaseById = new Map<string, number>();
  for (const m of movies) if (typeof m.releaseDate === "number") releaseById.set(m._id, m.releaseDate);

  const skippedList = loadSkipped();
  const skippedIds = new Set(skippedList.map((e) => e.tmdbCollectionId));

  let created = 0;
  let updated = 0;
  let skipped = 0;
  let ignored = 0;
  let unchanged = 0;
  let failed = 0;

  for (const group of groups.values()) {
    const target = byCollectionId.get(group.collection.id);
    const title = cleanTitle(group.collection.name);

    if (!target) {
      if (group.movies.length < 1) continue;
      if (skippedIds.has(group.collection.id)) {
        ignored++;
        continue;
      }

      const sortedIds = sortByRelease(
        group.movies.map((m) => m._id),
        releaseById,
      );
      const byId = new Map(group.movies.map((m) => [m._id, m]));

      console.log(`${bold(title)} ${dim(`#${group.collection.id}`)} ${green("(new franchise)")}`);
      for (const id of sortedIds) {
        const m = byId.get(id);
        console.log(`  ${green("+")} ${m?.filmName ?? id} ${dim(`(${m?.releaseDate ?? "?"})`)}`);
      }

      const action = FLAG_YES ? "update" : await waitForAction();
      if (action === "quit") {
        console.log(dim("Quit."));
        break;
      }
      if (action === "skip") {
        skippedList.push({
          tmdbCollectionId: group.collection.id,
          name: title,
          movies: sortedIds.map((id) => {
            const m = byId.get(id);
            return { filmName: m?.filmName ?? id, releaseDate: m?.releaseDate };
          }),
        });
        skippedIds.add(group.collection.id);
        saveSkipped(skippedList);
        console.log(dim(`  skipped — saved to ${SKIP_FILE.split(/[\\/]/).pop()}\n`));
        skipped++;
        continue;
      }

      try {
        await client.create({
          _type: "sequel",
          name: title,
          tmdbCollectionId: group.collection.id,
          movies: sortedIds.map((id) => movieRef(id)),
        });
        console.log(`  ${green("✓ created")}\n`);
        created++;
      } catch (err) {
        console.log(`  ${red("✗ create failed")}: ${err instanceof Error ? err.message : String(err)}\n`);
        failed++;
      }
      continue;
    }

    const currentIds = target.movieIds ?? [];
    const currentSet = new Set(currentIds);
    const additions = group.movies.filter((m) => !currentSet.has(m._id));
    const desiredIds = sortByRelease([...currentIds, ...additions.map((m) => m._id)], releaseById);

    const needsName = target.name !== title;
    const orderChanged = !sameOrder(currentIds, desiredIds);

    if (!orderChanged && !needsName) {
      unchanged++;
      continue;
    }

    const keptReordered = !sameOrder(
      currentIds,
      desiredIds.filter((id) => currentSet.has(id)),
    );

    console.log(`${bold(target.name)} ${dim(`#${group.collection.id}`)}`);
    if (needsName) {
      console.log(`  name: ${red(`"${target.name}"`)} ${dim("->")} ${green(`"${title}"`)}`);
    }
    for (const m of additions)
      console.log(`  ${green("+")} ${m.filmName ?? m._id} ${dim(`(${m.releaseDate ?? "?"})`)}`);
    if (keptReordered) console.log(`  ${dim("↻ reordered by release date")}`);

    const action = FLAG_YES ? "update" : await waitForAction();
    if (action === "quit") {
      console.log(dim("Quit."));
      break;
    }
    if (action === "skip") {
      console.log(dim("  skipped\n"));
      skipped++;
      continue;
    }

    try {
      let patch = client.patch(target._id).set({ movies: desiredIds.map((id) => movieRef(id)) });
      if (needsName) patch = patch.set({ name: title });
      await patch.commit();
      console.log(`  ${green("✓ updated")}\n`);
      updated++;
    } catch (err) {
      console.log(`  ${red("✗ update failed")}: ${err instanceof Error ? err.message : String(err)}\n`);
      failed++;
    }
  }

  console.log("—");
  console.log(`Created:   ${created}`);
  console.log(`Updated:   ${updated}`);
  console.log(`Skipped:   ${skipped}`);
  console.log(`Unchanged: ${unchanged}`);
  console.log(`Failed:    ${failed}`);
  if (ignored > 0) console.log(dim(`Ignored (in skip file): ${ignored}`));
  if (scanFailed > 0) console.log(`Scan errors: ${scanFailed}`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
