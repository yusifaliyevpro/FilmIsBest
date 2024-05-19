import { getStaticParams } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getStaticParams();
}

export default function CatchAllPages({ params: { locale } }) {
  setStaticParamsLocale(locale);
  return notFound();
}
