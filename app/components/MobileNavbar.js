"use client";

import { useScopedI18n } from "@/locales/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { MdMovieFilter } from "react-icons/md";
import { MdOutlineInfo } from "react-icons/md";

export default function MobileNavbar({ locale }) {
  const t = useScopedI18n("Header");
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 z-[9989] flex w-full flex-row items-center justify-around border-t-[0.5px] border-solid border-gray-700 bg-gray-200 shadow-medium md:hidden">
      <Link
        href={`/`}
        className={`${pathname === `/${locale}` ? "rounded-2xl text-blue-600" : "text-white"} flex w-fit flex-col items-center justify-center gap-y-[0.1rem] p-2 px-4`}
      >
        <FaHome className="text-2xl" />
        <p className="text-center text-sm font-bold">{t("homePage")}</p>
      </Link>
      <Link
        href={`/movies`}
        className={`${pathname === `/${locale}/movies` ? "rounded-2xl text-blue-600" : "text-white"} flex w-fit flex-col items-center justify-center gap-y-[0.1rem] p-2 px-4`}
      >
        <MdMovieFilter className="text-2xl" />
        <p className="text-center text-sm font-bold"> {t("movies")}</p>
      </Link>
      <Link
        href={`/about`}
        className={`${pathname === `/${locale}/about` ? "rounded-2xl text-blue-600" : "text-white"} flex w-fit flex-col items-center justify-center gap-y-[0.1rem] p-2 px-4`}
      >
        <MdOutlineInfo className="text-2xl" />
        <p className="text-center text-sm font-bold">{t("about")}</p>
      </Link>
    </div>
  );
}
