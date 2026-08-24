import { getTranslations } from "next-intl/server";
import type { IconType } from "react-icons";
import { FaHome } from "react-icons/fa";
import { MdMovieFilter } from "react-icons/md";
import { MdOutlineInfo } from "react-icons/md";
import { Link } from "@/i18n/navigation";
import type { TranslationKeys } from "@/i18n/types";

const navigationItems: { href: string; Icon: IconType; translationKey: TranslationKeys<"Header">; path: string }[] = [
  {
    href: "/",
    Icon: FaHome,
    translationKey: "homePage",
    path: `/`,
  },
  {
    href: "/movies",
    Icon: MdMovieFilter,
    translationKey: "movies",
    path: `/movies`,
  },
  {
    href: "/about",
    Icon: MdOutlineInfo,
    translationKey: "about",
    path: `/about`,
  },
];

export async function MobileNavbar() {
  const t = await getTranslations("Header");
  return (
    <div
      key="mobile-navbar"
      className="fixed bottom-0 z-9989 flex w-full flex-row items-center justify-around border-t-[0.5px] border-solid border-gray-700 bg-gray-900 shadow-medium min-[645px]:hidden"
    >
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          className={`flex w-fit flex-col items-center justify-center gap-y-[0.1rem] p-2 px-4 text-white`}
          href={item.href}
          prefetch={true}
        >
          <item.Icon className="text-2xl" />
          <p className="text-center text-sm font-bold">{t(item.translationKey)}</p>
        </Link>
      ))}
    </div>
  );
}
