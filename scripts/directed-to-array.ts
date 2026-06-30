/**
 * One-time migration: converts the legacy `directed` string (names joined with
 * "!") into a `string[]` on every Movie-studio document — published and drafts.
 *
 * (`actors` was already migrated separately.)
 *
 * Idempotent: docs whose `directed` is already an array are skipped, so it's
 * safe to re-run.
 *
 * Run: npx sanity exec scripts/directed-to-array.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";

// `raw` perspective returns published *and* draft docs as separate records, so
// each gets patched by its own _id.
const client = getCliClient().withConfig({ perspective: "raw" });

type MovieDoc = { _id: string; directed: unknown };

function toArray(value: string): string[] {
  return value
    .split("!")
    .map((part) => part.trim())
    .filter(Boolean);
}

async function run() {
  const docs = await client.fetch<MovieDoc[]>(`*[_type == "Movie-studio"]{ _id, directed }`);

  const toMigrate = docs.filter((doc) => typeof doc.directed === "string");
  const alreadyArrays = docs.length - toMigrate.length;

  console.log("—");
  console.log(`Movie-studio docs:   ${docs.length}`);
  console.log(`Already string[]:    ${alreadyArrays}`);
  console.log(`To migrate:          ${toMigrate.length}`);

  if (toMigrate.length === 0) {
    console.log("Nothing to do.");
    return;
  }

  // Batch the patches into a handful of transactions to stay well under request
  // limits while keeping the run fast.
  const BATCH_SIZE = 50;
  let migrated = 0;

  for (let i = 0; i < toMigrate.length; i += BATCH_SIZE) {
    const batch = toMigrate.slice(i, i + BATCH_SIZE);
    let tx = client.transaction();

    for (const doc of batch) {
      tx = tx.patch(doc._id, (p) => p.set({ directed: toArray(doc.directed as string) }));
    }

    await tx.commit({ visibility: "async" });
    migrated += batch.length;
    console.log(`Patched ${migrated}/${toMigrate.length}`);
  }

  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
