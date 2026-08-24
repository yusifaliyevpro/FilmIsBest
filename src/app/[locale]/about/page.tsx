import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { cacheLife } from "next/cache";
import Image from "next/image";
import { BiLogoTailwindCss } from "react-icons/bi";
import { FaReact } from "react-icons/fa";
import { SiHeroui, SiNextdotjs, SiPrisma, SiSanity, SiVercel } from "react-icons/si";
import { locales } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  "use cache";
  cacheLife("max");

  const locale = await getLocale();
  const t = await getTranslations("MetaData.About");
  return buildMetadata({
    locale,
    path: "/about",
    title: t("title"),
    description: t("description"),
    ogImageTitle: t("title"),
  });
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function About() {
  "use cache";
  cacheLife("max");

  const t = await getTranslations("About");

  return (
    <section className="relative mx-4 flex flex-wrap items-center justify-center text-white sm:mx-0">
      <ul className="relative mt-8 mb-5 flex w-auto flex-col gap-y-6 rounded-lg p-3 sm:w-200 lg:mt-0 lg:p-12">
        <h1 className="mb-5 bg-linear-to-r from-[rgba(0,67,181,1)] from-0% via-[rgba(10,107,222,1)] via-50% to-[rgba(0,123,255,1)] to-100% bg-clip-text text-center text-3xl font-bold text-transparent lg:mb-2">
          {t("aboutTheProject")}
        </h1>
        <p className="flex flex-col text-base leading-relaxed">{t("originStory")}</p>
        <p className="flex flex-col text-base leading-relaxed">{t("evolution")}</p>
        <p className="flex flex-col text-base leading-relaxed">{t("currentStatus")}</p>
        <p className="mx-auto mt-4 w-fit text-center text-2xl font-bold drop-shadow-2xl">{t("toolsIUsed")}</p>
        <ol className="tools relative my-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-8 select-none sm:flex-row">
          {tools.map((tool, i) => (
            <li key={tool.name + i}>
              <a
                className="flex flex-col items-center justify-center gap-y-2 rounded-xl bg-slate-800 p-3 shadow-large drop-shadow-2xl hover:bg-slate-700"
                href={tool.link}
                target="_blank"
              >
                <p>{tool.name}</p>
                {tool.icon && tool.icon}
              </a>
            </li>
          ))}
        </ol>
        <div className="my-4 flex flex-col items-center gap-y-3 text-center">
          <p className="text-2xl font-bold drop-shadow-2xl">{t("dataSources")}</p>
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="The Movie Database (TMDB)"
          >
            <Image
              src="/tmdb_logo.svg"
              alt="The Movie Database (TMDB) logo"
              width={140}
              height={101}
              className="h-auto w-32"
            />
          </a>
          <p className="max-w-md text-sm text-slate-400">{t("tmdbAttribution")}</p>
        </div>
        <p className="text-center lg:text-left">
          {t("buyACoffee")}{" "}
          <a className="text-blue-600 hover:text-blue-800" href="https://kofe.al/@yusifaliyevpro" target="_blank">
            kofe.al/@yusifaliyevpro
          </a>
        </p>
        <p className="text-center lg:text-left">
          {t("myCodes")}{" "}
          <a
            className="text-blue-600 hover:text-blue-800"
            href="https://github.com/YusifAliyevPro/FilmIsBest"
            target="_blank"
          >
            FilmIsBest Repository
          </a>
        </p>
      </ul>
    </section>
  );
}

const tools: { name: string; link: string; icon: React.JSX.Element }[] = [
  {
    name: "NextJS 15.3.3",
    link: "https://nextjs.org/",
    icon: <SiNextdotjs className="text-7xl text-white" />,
  },
  {
    name: "Vercel Hosting",
    link: "https://vercel.com/",
    icon: <SiVercel className="text-7xl text-white" />,
  },
  {
    name: "Sanity CMS",
    link: "https://www.sanity.io/",
    icon: <SiSanity className="text-7xl" />,
  },
  {
    name: "NextUI",
    link: "https://nextui.org/",
    icon: <SiHeroui className="text-8xl sm:text-7xl" />,
  },
  {
    name: "Tailwind CSS",
    link: "https://tailwindcss.com/",
    icon: <BiLogoTailwindCss className="text-8xl text-[#38bdf8]" />,
  },
  {
    name: "React Icons",
    link: "https://react-icons.github.io/react-icons/",
    icon: <FaReact className="text-8xl text-[#e91e63]" />,
  },
  {
    name: "Prisma",
    link: "https://www.prisma.io/",
    icon: <SiPrisma className="text-8xl text-white" />,
  },
];
