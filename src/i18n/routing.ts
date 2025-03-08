import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const locales = ["en", "az", "tr"] as const;
export type Locales = (typeof locales)[number];
export const routing = defineRouting({ locales, defaultLocale: "az" });

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
