"use client";

import { HeroUIProvider } from "@heroui/system";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { Toaster } from "sonner";

export function Providers({
  children,
  toasterStyle,
}: {
  children: Readonly<ReactNode>;
  /** Optional per-layout override for the toast surface (e.g. the admin panel). */
  toasterStyle?: CSSProperties;
}) {
  const router = useRouter();
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  const routerPush = (path: string, routerOptions: undefined) => router.push(path as Route, routerOptions);
  return (
    <HeroUIProvider navigate={routerPush}>
      {children}
      <Toaster
        theme="dark"
        position="bottom-right"
        offset={{ bottom: "70px" }}
        mobileOffset={{ bottom: "80px" }}
        style={toasterStyle}
      />
    </HeroUIProvider>
  );
}
