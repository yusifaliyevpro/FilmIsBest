import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "az", "tr"],

  defaultLocale: "az",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
