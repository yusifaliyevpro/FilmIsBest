import Link from "next/link";
import { BiLogoTailwindCss } from "react-icons/bi";
import { FaReact } from "react-icons/fa";
import {
  TbApi,
  TbBrandFramerMotion,
  TbSquareRoundedLetterF,
} from "react-icons/tb";
import { SiNextdotjs, SiNextui, SiSanity, SiVercel } from "react-icons/si";
import { MotionH2 } from "../components/motionH2";
import { MotionP } from "../components/motionP";
import { MotionDiv } from "../components/motionDiv";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { baseURL } from "../lib/bases";

export async function generateMetadata() {
  const locale = useLocale();
  const t = await getTranslations({ locale, namespace: "MetaData.About" });
  return {
    title: t("title"),
    url: `${baseURL}/${locale}/about`,
    description: t("description"),
    alternates: {
      canonical: `${baseURL}/about`,
      languages: {
        "en-US": `${baseURL}/en`,
        "en-GB": `${baseURL}/en`,
        "az-AZ": `${baseURL}/az`,
      },
    },
    openGraph: {
      title: `FilmIsBest | ${t("title")}`,
      url: `${baseURL}/${locale}/about`,
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
];

export default function About() {
  const t = useTranslations("About");
  return (
    <main className="relative mx-4 flex items-center justify-center sm:mx-0 ">
      <div className=" relative mb-5 mt-8 flex w-auto flex-col gap-y-6 rounded-lg p-3 sm:w-[800px] lg:mt-0 lg:p-12">
        <MotionH2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 0.5,
            duration: 0.5,
          }}
          className="mb-5 bg-gradient-to-r from-[rgba(0,67,181,1)] from-0% via-[rgba(10,107,222,1)] via-50% to-[rgba(0,123,255,1)] to-100% bg-clip-text  text-center text-3xl font-bold text-transparent lg:mb-2"
        >
          {t("aboutTheProject")}
        </MotionH2>
        <MotionP
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-y-5 text-base leading-relaxed"
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 0.9,
            duration: 0.5,
          }}
        >
          {t("text1")}
        </MotionP>
        <MotionP
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col text-base leading-relaxed"
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 1.4,
            duration: 0.5,
          }}
        >
          {t("text2")}
        </MotionP>
        <MotionP
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-y-5 text-base leading-relaxed"
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 1.9,
            duration: 0.5,
          }}
        >
          {t("text3")}
        </MotionP>
        <MotionP
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-4 w-fit text-center text-2xl font-bold drop-shadow-2xl"
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 2.4,
            duration: 0.5,
          }}
        >
          {t("toolsIUsed")}
        </MotionP>
        <div className="tools relative my-8 flex flex-1 select-none flex-col flex-wrap items-center justify-center gap-x-8 gap-y-8 sm:flex-row">
          {tools.map((tool, index) => (
            <MotionDiv
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              key={index}
              transition={{
                type: "spring",
                duration: 0.3,
                delay: 2.7 + (index + 1) * 0.3,
                stiffness: 80,
              }}
            >
              <Link
                target="_blank"
                className="flex flex-col  items-center justify-center gap-y-2 rounded-xl bg-slate-800 p-3 shadow-large drop-shadow-2xl hover:bg-slate-700"
                href={tool.link}
              >
                <p>{tool.name}</p>
                {tool.icon && tool.icon}
                {tool.img && tool.img}
              </Link>
            </MotionDiv>
          ))}
        </div>
        <MotionP
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center lg:text-left"
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 5.5,
            duration: 0.6,
          }}
        >
          {t("buyACoffee")}{" "}
          <Link
            href={"https://kofe.al/@yusifaliyevpro"}
            className="text-blue-600 hover:text-blue-800"
            target="_blank"
          >
            kofe.al/@yusifaliyevpro
          </Link>
        </MotionP>
        <MotionP
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center lg:text-left"
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 6,
            duration: 0.6,
          }}
        >
          {t("myCodes")}{" "}
          <Link
            className="text-blue-600 hover:text-blue-800"
            href={"https://github.com/YusifAliyevPro/FilmIsBest"}
            target="_blank"
          >
            FilmIsBest Repository
          </Link>
        </MotionP>
      </div>
    </main>
  );
}
