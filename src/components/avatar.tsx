"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type AvatarProps = {
  src: string;
  alt?: string;
  className?: string;
  isBordered?: boolean;
};

export function Avatar({ src, alt = "avatar", className, isBordered }: AvatarProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    setLoaded(!!img?.complete);
    // oxlint-disable-next-line react/exhaustive-effect-dependencies
  }, [src]);

  return (
    <span
      className={cn(
        "relative z-0 box-border inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-700 align-middle text-white",
        isBordered && "ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900",
        className,
      )}
    >
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        sizes="40px"
        unoptimized
        onLoad={() => setLoaded(true)}
        className={cn("object-cover transition-opacity duration-500", loaded ? "opacity-100" : "opacity-0")}
      />
    </span>
  );
}
