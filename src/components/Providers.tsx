// app/providers.js
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { MotionConfig } from "motion/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export function Providers({ children }: { children: Readonly<ReactNode> }) {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <MotionConfig>{children}</MotionConfig>
    </NextUIProvider>
  );
}
