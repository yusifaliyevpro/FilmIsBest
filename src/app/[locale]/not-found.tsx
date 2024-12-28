import LottieComponent from "@/components/LottieAnimation";
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
    <div className="relative flex w-full flex-col items-center justify-center">
      <div className="relative mx-3 mt-8 flex h-full flex-col sm:mt-3">
        <LottieComponent animationPath="/404Error.lottie" />
      </div>
      <h1 className="relative mx-7 mt-4 text-center text-2xl font-bold sm:text-3xl">
        {t("errorMessage")}
      </h1>
    </div>
  );
}
