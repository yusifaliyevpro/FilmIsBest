import type { ImageLoaderProps } from "next/image";
import { imageBuilder } from "@/sanity/lib/image";

// `width` is the candidate width Next.js requests for each `srcset` entry, so we
// must honour it (not a fixed value) for responsive images and `sizes` to work.
// `height` stays optional: omit it and Sanity keeps the source aspect ratio;
// pass it only when a fixed crop is needed (e.g. OG image generation).
export function sanityLoader({ src, width, quality = 75, height }: ImageLoaderProps & { height?: number }) {
  let builder = imageBuilder.image(src).width(width).auto("format").fit("max").quality(quality);
  if (height !== undefined) builder = builder.height(height);

  return builder.url();
}
