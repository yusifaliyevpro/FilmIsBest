import { imageBuilder } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type ImageLoader = {
  src: SanityImageSource;
  width: number;
  quality?: number;
};
export default function sanityLoader({ src, width, quality = 75 }: ImageLoader) {
  const image = imageBuilder?.image(src).auto("format").fit("max").width(width).quality(quality).url();
  return image;
}
