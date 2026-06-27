/**
 * Maintenance: delete every image/file asset that is not referenced by any
 * document (orphaned uploads, e.g. TMDB posters fetched but never selected).
 *
 * An asset referenced by any document — including drafts — is kept, because the
 * `count(*[references(^._id)]) == 0` filter only matches truly unused assets.
 *
 * Preview first (nothing is deleted):  npm run remove-assets:preview
 * Then delete:                         npm run remove-assets
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient();
const BATCH_SIZE = 50;

async function run() {
  const ids = await client.fetch<string[]>(
    `*[_type in ["sanity.imageAsset", "sanity.fileAsset"] && count(*[references(^._id)]) == 0]._id`,
  );

  console.log(`Found ${ids.length} unused asset(s).`);
  if (ids.length === 0) return;

  let deleted = 0;
  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const batch = ids.slice(i, i + BATCH_SIZE);
    let tx = client.transaction();
    for (const id of batch) tx = tx.delete(id);
    try {
      await tx.commit({ visibility: "async" });
      deleted += batch.length;
      console.log(`Deleted ${deleted}/${ids.length}`);
    } catch (err) {
      console.error(`Batch ${i}-${i + batch.length} failed:`, err instanceof Error ? err.message : err);
    }
  }

  console.log(`Done. Removed ${deleted} unused asset(s).`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
