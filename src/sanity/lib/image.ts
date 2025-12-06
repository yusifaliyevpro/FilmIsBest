import { dataset, projectId } from "../env";
import { createImageUrlBuilder, SanityImageSource } from "@sanity/image-url";

// https://www.sanity.io/docs/image-url
export const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => {
  return imageBuilder.image(source);
};
