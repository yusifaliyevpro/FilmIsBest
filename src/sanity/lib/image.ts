import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, projectId } from "../env";

// https://www.sanity.io/docs/image-url
export const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => {
  return imageBuilder.image(source);
};
