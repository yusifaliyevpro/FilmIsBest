import { dataset, projectId } from "../env";
import createImageUrlBuilder from "@sanity/image-url";

export const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source) => {
  return imageBuilder?.image(source).auto("format").fit("max").url();
};
