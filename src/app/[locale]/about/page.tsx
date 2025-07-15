import { Link, Locale, locales } from "@/i18n/routing";
import { Variants } from "motion";
import * as motion from "motion/react-client";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import React from "react";
import { BiLogoTailwindCss } from "react-icons/bi";
import { FaReact } from "react-icons/fa";
import { SiNextdotjs, SiNextui, SiPrisma, SiSanity, SiVercel } from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";

const ulVariants: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.5 } } };
const textVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, duration: 0.5 } },
};
const olVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3, delayChildren: 2 } },
};
const itemVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5, type: "spring", stiffness: 100 } },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  setRequestLocale((await params).locale);
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

export default async function About({ params }: { params: Promise<{ locale: Locale }> }) {
  setRequestLocale((await params).locale);
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
    {
      t: "toolsIUsed",
      className: "mx-auto mt-4 w-fit text-center text-2xl font-bold drop-shadow-2xl",
    },
  ];
  return (
    <section className="relative mx-4 flex flex-wrap items-center justify-center text-white sm:mx-0">
      <motion.ul
        className="relative mb-5 mt-8 flex w-auto flex-col gap-y-6 rounded-lg p-3 sm:w-[800px] lg:mt-0 lg:p-12"
        initial="hidden"
        variants={ulVariants}
        viewport={{ once: true }}
        whileInView="visible"
      >
        {texts.map((text, i) => (
          <motion.p
            key={i}
            className={text.className ? text.className : "flex flex-col text-base leading-relaxed"}
            variants={textVariants}
          >
            {t(text.t as "text1")}
          </motion.p>
        ))}
        <motion.ol
          className="tools relative my-8 flex select-none flex-wrap items-center justify-center gap-x-8 gap-y-8 sm:flex-row"
          initial="hidden"
          variants={olVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          {tools.map((tool, i) => (
            <motion.li key={i} variants={itemVariants}>
              <Link
                className="flex flex-col items-center justify-center gap-y-2 rounded-xl bg-slate-800 p-3 shadow-large drop-shadow-2xl hover:bg-slate-700"
                href={tool.link}
                target="_blank"
              >
                <p>{tool.name}</p>
                {tool.icon && tool.icon}
              </Link>
            </motion.li>
          ))}
        </motion.ol>
        {links.map((link, index) => (
          <motion.p
            key={index}
            animate={{ opacity: 1, y: 0 }}
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: -30 }}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 5.3 + index++ * 0.5,
              duration: 0.5,
            }}
          >
            {t(link.t as "text1")}{" "}
            <Link className="text-blue-600 hover:text-blue-800" href={link.link} target="_blank">
              {link.linkText}
            </Link>
          </motion.p>
        ))}
      </motion.ul>
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
    icon: <SiNextui className="text-8xl sm:text-7xl" />,
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
    name: "Framer Motion",
    link: "https://www.framer.com/motion/",
    icon: <TbBrandFramerMotion className="text-8xl" />,
  },
  {
    name: "Prisma",
    link: "https://www.mongodb.com/",
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
