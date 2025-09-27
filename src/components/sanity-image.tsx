"use client";

import sanityLoader from "@/lib/imageLoader";
import Image, { ImageProps } from "next/image";

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
