"use client";

import Image, { type ImageProps } from "next/image";
import { sanityLoader } from "@/lib/imageLoader";

export default function SanityImage(props: ImageProps) {
  // Pass the loader straight through so it receives Next's per-`srcset` candidate
  // width; Sanity then serves a correctly sized image for each viewport/DPR.
  return <Image {...props} alt={props.alt} loader={sanityLoader} />;
}
