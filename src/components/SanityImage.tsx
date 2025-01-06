"use client";

import sanityLoader from "@/lib/imageLoader";
import Image, { ImageProps } from "next/image";

export default function SanityImage({ alt, ...props }: ImageProps) {
  return <Image {...props} alt={alt} loader={sanityLoader} />;
}
