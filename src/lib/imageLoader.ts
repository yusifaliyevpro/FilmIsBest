import { ImageLoaderProps } from "next/image";
import { imageBuilder } from "@/sanity/lib/image";

export default function sanityLoader({ src, width, height, quality = 75 }: ImageLoaderProps & { height: number }) {
  const image = imageBuilder?.image(src).width(width).height(height).auto("format").fit("max").quality(quality).url();

  return image;
}
