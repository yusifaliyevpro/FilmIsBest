"use client";

import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export function Providers({ children }: { children: Readonly<ReactNode> }) {
  const router = useRouter();
  const routerPush = (path: string, routerOptions: undefined) => router.push(path as Route, routerOptions);
  return (
    <HeroUIProvider navigate={routerPush}>
      {children}
      <ToastProvider toastOffset={70} />
    </HeroUIProvider>
  );
}
