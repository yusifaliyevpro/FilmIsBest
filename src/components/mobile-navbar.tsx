"use client";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { MdMovieFilter } from "react-icons/md";
import { MdOutlineInfo } from "react-icons/md";

export default function MobileNavbar({ locale }: { locale: Locale }) {
  const t = useTranslations("Header");
  const pathname = usePathname();

  const navigationItems = [
    {
      href: "/",
      icon: FaHome,
      translationKey: "homePage",
      path: `/${locale}`,
    },
    {
      href: "/movies",
      icon: MdMovieFilter,
      translationKey: "movies",
      path: `/${locale}/movies`,
    },
    {
      href: "/about",
      icon: MdOutlineInfo,
      translationKey: "about",
      path: `/${locale}/about`,
    },
  ];

  return (
    <div className="shadow-medium fixed bottom-0 z-9989 flex w-full flex-row items-center justify-around border-t-[0.5px] border-solid border-gray-700 bg-gray-200 min-[645px]:hidden">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;

        return (
          <Link
            key={item.href}
            className={`${isActive ? "rounded-2xl text-blue-600" : "text-white"} flex w-fit flex-col items-center justify-center gap-y-[0.1rem] p-2 px-4`}
            href={item.href}
          >
            <Icon className="text-2xl" />
            <p className="text-center text-sm font-bold">{t(item.translationKey)}</p>
          </Link>
        );
      })}
    </div>
  );
}
