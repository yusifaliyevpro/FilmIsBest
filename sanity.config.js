/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...index]]\page.jsx` route
 */
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schema";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { youtubeInput } from "sanity-plugin-youtube-input";
import { structureTool } from "sanity/structure";

export default defineConfig({
  basePath: "/en/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    structureTool(),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
