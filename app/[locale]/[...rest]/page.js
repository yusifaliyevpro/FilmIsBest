import { notFound } from "next/navigation";
import { getStaticParams } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";

export function generateStaticParams() {
  return getStaticParams();
}

export default function CatchAllPages({ params: { locale } }) {
  setStaticParamsLocale(locale);
  return notFound();
}
