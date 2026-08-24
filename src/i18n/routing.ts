import { defineRouting } from "next-intl/routing";

export const locales = ["en", "az", "tr"] as const;
export const routing = defineRouting({ locales, defaultLocale: "en" });
