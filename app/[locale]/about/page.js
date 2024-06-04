import Link from "next/link";
import { BiLogoTailwindCss } from "react-icons/bi";
import { FaReact } from "react-icons/fa";
import { TbBrandFramerMotion, TbSquareRoundedLetterF } from "react-icons/tb";
import { SiNextdotjs, SiNextui, SiSanity, SiVercel } from "react-icons/si";
import { Motion } from "@/app/components/Motion";
import { GrToast } from "react-icons/gr";
import { getScopedI18n, getStaticParams } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";

export async function generateMetadata({ params: { locale } }) {
  const t = await getScopedI18n("MetaData.About");
  return {
    title: t("title"),
    url: `/about`,
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

const tools = [
  {
    name: "NextJS 14.1.0",
    link: "https://nextjs.org/",
    icon: <SiNextdotjs className="text-7xl text-black" />,
  },
  {
    name: "Vercel Hosting",
    link: "https://vercel.com/",
    icon: <SiVercel className="text-7xl text-[black]" />,
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
    name: "FormSubmit",
    link: "https://formsubmit.co/",
    icon: <TbSquareRoundedLetterF className="text-8xl" />,
  },
  {
    name: "React Hot Toasts",
    link: "https://formsubmit.co/",
    icon: <GrToast className="text-8xl text-[#E1554A]" />,
  },
];
const texts = [
  {
    t: "aboutTheProject",
    type: "h1",
    className:
      "mb-5 bg-gradient-to-r from-[rgba(0,67,181,1)] from-0% via-[rgba(10,107,222,1)] via-50% to-[rgba(0,123,255,1)] to-100% bg-clip-text  text-center text-3xl font-bold text-transparent lg:mb-2",
  },
  { t: "text1" },
  { t: "text2" },
  { t: "text3" },
  {
    t: "toolsIUsed",
    className:
      "mx-auto mt-4 w-fit text-center text-2xl font-bold drop-shadow-2xl",
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

export function generateStaticParams() {
  return getStaticParams();
}

export default async function About({ params: { locale } }) {
  setStaticParamsLocale(locale);
  const t = await getScopedI18n("About");
  return (
    <section className="relative mx-4 flex flex-wrap items-center justify-center sm:mx-0">
      <div className="relative mb-5 mt-8 flex w-auto flex-col gap-y-6 rounded-lg p-3 sm:w-[800px] lg:mt-0 lg:p-12">
        {texts.map((text, index) => (
          <Motion
            type={text.type ? text.type : "p"}
            key={index}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className={
              text.className
                ? text.className
                : "flex flex-col text-base leading-relaxed"
            }
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 0.5 + index++ * 0.5,
              duration: 0.5,
            }}
          >
            {t(text.t)}
          </Motion>
        ))}
        <div className="tools relative my-8 flex select-none flex-wrap items-center justify-center gap-x-8 gap-y-8 sm:flex-row">
          {tools.map((tool, index) => (
            <Motion
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              key={index}
              transition={{
                type: "spring",
                duration: 0.3,
                delay: 2.7 + index++ * 0.3,
                stiffness: 80,
              }}
            >
              <Link
                target="_blank"
                className="flex flex-col items-center justify-center gap-y-2 rounded-xl bg-slate-800 p-3 shadow-large drop-shadow-2xl hover:bg-slate-700"
                href={tool.link}
              >
                <p>{tool.name}</p>
                {tool.icon && tool.icon}
                {tool.img && tool.img}
              </Link>
            </Motion>
          ))}
        </div>
        {links.map((link, index) => (
          <Motion
            type="p"
            key={index}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center lg:text-left"
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 5.3 + index++ * 0.5,
              duration: 0.5,
            }}
          >
            {t(link.t)}{" "}
            <Link
              href={link.link}
              className="text-blue-600 hover:text-blue-800"
              target="_blank"
            >
              {link.linkText}
            </Link>
          </Motion>
        ))}
      </div>
    </section>
  );
}
