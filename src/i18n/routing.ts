import { defineRouting } from "next-intl/routing";
import { notFound } from "next/navigation";

export const locales = ["en", "az", "tr"] as const;
export type Locale = (typeof locales)[number];
export const routing = defineRouting({ locales, defaultLocale: "en" });

export function validateLocale(locale: string | undefined): asserts locale is Locale {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
}
