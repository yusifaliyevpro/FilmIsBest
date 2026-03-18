"use client";

import Image, { ImageProps } from "next/image";
import sanityLoader from "@/lib/imageLoader";

export default function SanityImage(props: ImageProps) {
  return (
    <Image
      {...props}
      alt={props.alt}
      loader={(loaderProps) =>
        sanityLoader({ ...loaderProps, width: Number(props.width), height: Number(props.height) })
      }
    />
  );
}
