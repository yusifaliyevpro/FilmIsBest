import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cacheLife } from "next/cache";
import Image from "next/image";
import { BiLogoTailwindCss } from "react-icons/bi";
import { FaReact } from "react-icons/fa";
import { SiHeroui, SiNextdotjs, SiPrisma, SiSanity, SiVercel } from "react-icons/si";
import { locales, validateLocale } from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata> {
  "use cache";
  cacheLife("max");

  const t = await getTranslations("MetaData.About");
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/about`,
      languages: {
        "en-US": `/en/about`,
        "en-GB": `/en/about`,
        "az-AZ": `/az/about`,
        "tr-TR": `/tr/about`,
      },
    },
    openGraph: {
      title: `FilmIsBest | ${t("title")}`,
      images: [
        {
          url: `/api/og?title=${encodeURI(t("title"))}`,
          width: 1200,
          height: 1000,
          alt: `FilmIsBest | ${t("title")} | OpenGraph-Image`,
          type: "image/png",
        },
      ],
      url: `/about`,
      description: t("description"),
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function About({ params }: PageProps<"/[locale]/about">) {
  "use cache";
  cacheLife("max");
  const { locale } = await params;
  validateLocale(locale);

  const t = await getTranslations("About");
  const texts: {
    t: string;
    type?: keyof React.JSX.IntrinsicElements;
    className?: string;
  }[] = [
    {
      t: "aboutTheProject",
      type: "h1",
      className:
        "mb-5 bg-linear-to-r from-[rgba(0,67,181,1)] from-0% via-[rgba(10,107,222,1)] via-50% to-[rgba(0,123,255,1)] to-100% bg-clip-text  text-center text-3xl font-bold text-transparent lg:mb-2",
    },
    { t: "text1" },
    { t: "text2" },
    { t: "text3" },
    { t: "watchedNote", className: "flex flex-col text-base leading-relaxed font-semibold" },
    {
      t: "toolsIUsed",
      className: "mx-auto mt-4 w-fit text-center text-2xl font-bold drop-shadow-2xl",
    },
  ];
  return (
    <section className="relative mx-4 flex flex-wrap items-center justify-center text-white sm:mx-0">
      <ul className="relative mt-8 mb-5 flex w-auto flex-col gap-y-6 rounded-lg p-3 sm:w-200 lg:mt-0 lg:p-12">
        {texts.map((text, i) => (
          <p key={i + text.t} className={text.className ? text.className : "flex flex-col text-base leading-relaxed"}>
            {t(text.t as "text1")}
          </p>
        ))}
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
        {links.map((link, i) => (
          <p key={link.t + i} className="text-center lg:text-left">
            {t(link.t as "text1")}{" "}
            <a className="text-blue-600 hover:text-blue-800" href={link.link} target="_blank">
              {link.linkText}
            </a>
          </p>
        ))}
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

const links = [
  {
    t: "buyACoffee",
    linkText: "kofe.al/@yusifaliyevpro",
    link: "https://kofe.al/@yusifaliyevpro",
  },
  {
    t: "myCodes",
    linkText: "FilmIsBest Repository",
    link: "https://github.com/YusifAliyevPro/FilmIsBest",
  },
];
