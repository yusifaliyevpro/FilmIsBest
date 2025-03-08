import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("MetaData.NotFound");
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      description: t("description"),
      title: t("title"),
      images: [
        {
          url: `/api/og?title=${encodeURI(t("title"))}`,
          width: 1200,
          height: 1000,
          alt: `FilmIsBest | ${t("title")} | OpenGraph-Image`,
          type: "image/png",
        },
      ],
    },
  };
}

export default async function NotFoundPage() {
  const t = await getTranslations("NotFound");

  return (
    <main className="relative flex min-h-svh w-full flex-col items-center justify-center">
      <h1 className="relative mx-7 text-center text-2xl font-bold sm:text-3xl">{t("errorMessage")}</h1>
    </main>
  );
}
