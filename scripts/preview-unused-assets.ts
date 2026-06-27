/**
 * Reports which image/file assets are unused (orphaned) and breaks down why the
 * rest are kept — without deleting anything.
 *
 * Run: npm run remove-assets:preview
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient();
const ASSET_TYPES = `["sanity.imageAsset", "sanity.fileAsset"]`;

async function run() {
  const ids = await client.fetch<string[]>(
    `*[_type in ${ASSET_TYPES} && count(*[references(^._id)]) == 0]._id`,
  );
  const total = await client.fetch<number>(`count(*[_type in ${ASSET_TYPES}])`);

  // Break down what keeps the remaining assets alive.
  const draftOnly = await client.fetch<number>(
    `count(*[_type in ${ASSET_TYPES}
      && count(*[references(^._id)]) > 0
      && count(*[!(_id in path("drafts.**")) && references(^._id)]) == 0])`,
  );
  const movieCount = await client.fetch<number>(`count(*[_type == "Movie-studio"])`);
  const refByMovies = await client.fetch<number>(
    `count(*[_type in ${ASSET_TYPES} && count(*[_type == "Movie-studio" && references(^._id)]) > 0])`,
  );
  const refByOthers = await client.fetch<number>(
    `count(*[_type in ${ASSET_TYPES}
      && count(*[!(_type in ["Movie-studio", "sanity.imageAsset", "sanity.fileAsset"]) && references(^._id)]) > 0])`,
  );
  const docTypes = await client.fetch<string[]>(`array::unique(*[]._type)`);

  console.log("—");
  console.log(`Total assets:        ${total}`);
  console.log(`Unused (deletable):  ${ids.length}`);
  console.log(`Would remain:        ${total - ids.length}`);
  console.log(`  kept only by drafts:        ${draftOnly}`);
  console.log(`  referenced by Movie-studio: ${refByMovies}  (movie docs: ${movieCount})`);
  console.log(`  referenced by other types:  ${refByOthers}`);
  console.log(`Document types in dataset: ${docTypes.join(", ")}`);
  console.log("Preview only — nothing deleted. Run `npm run remove-assets` to delete.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
