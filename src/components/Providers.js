// app/providers.js
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { MotionConfig } from "framer-motion";
import { useRouter } from "next/navigation";
import { isMobile } from "react-device-detect";

// app/providers.js

// app/providers.js

export function Providers({ children }) {
  const router = useRouter();
  const reducedMotion = isMobile ? "always" : "never";
  return (
    <NextUIProvider navigate={router.push}>
      <MotionConfig>{children}</MotionConfig>
    </NextUIProvider>
  );
}
