"use client";

import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { MotionConfig } from "motion/react";
import { Route } from "next";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function Providers({ children }: { children: Readonly<ReactNode> }) {
  const router = useRouter();
  const routesPush = (path: string, routerOptions: undefined) => router.push(path as Route, routerOptions);
  return (
    <HeroUIProvider navigate={routesPush}>
      <MotionConfig>
        {children}
        <ToastProvider toastOffset={70} />
      </MotionConfig>
    </HeroUIProvider>
  );
}
