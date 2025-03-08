"use client";

import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { MotionConfig } from "motion/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export function Providers({ children }: { children: Readonly<ReactNode> }) {
  const router = useRouter();
  return (
    <HeroUIProvider navigate={router.push}>
      <ToastProvider toastOffset={70} />
      <MotionConfig>{children}</MotionConfig>
    </HeroUIProvider>
  );
}
