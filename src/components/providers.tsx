"use client";

import { MotionConfig } from "motion/react";
import { Route } from "next";
import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export function Providers({ children }: { children: Readonly<ReactNode> }) {
  const router = useRouter();
  const routerPush = (path: string, routerOptions: undefined) => router.push(path as Route, routerOptions);
  return (
    <MotionConfig>
      <HeroUIProvider navigate={routerPush}>
        {children}
        <ToastProvider toastOffset={70} />
      </HeroUIProvider>
    </MotionConfig>
  );
}
