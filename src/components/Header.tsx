"use client";

import LanguageSwitcher from "./LanguageSwitcher";
import { Link, Locale } from "@/i18n/routing";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { BiSolidMovie } from "react-icons/bi";

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const t = useTranslations("Header");

  return (
    <Navbar
      className="min-h-10 select-none bg-gray-100/90 font-bold text-white backdrop-blur-md light:text-white dark:text-white"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
          "data-[active=true]:after:mb-3",
        ],
      }}
    >
      <NavbarContent>
        <NavbarBrand>
          <Link className="relative left-0 flex flex-row items-center gap-1.5 text-xl font-bold" href={`/`}>
            <BiSolidMovie className="text-3xl font-normal text-blue-600" />
            <p className="font-bold text-inherit">FilmIsBest</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-12 sm:flex" justify="center">
        <NavbarItem isActive={pathname === `/${locale}`}>
          <Link aria-current="page" className="hover: text-lg text-gray-300 hover:text-white" color="foreground" href={`/`}>
            {t("homePage")}
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === `/${locale}/movies`}>
          <Link aria-current="page" className="text-lg text-gray-300 hover:text-white" href={`/movies`}>
            {t("movies")}
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === `/${locale}/about`}>
          <Link aria-current="page" className="text-lg text-gray-300 hover:text-white" href={`/about`}>
            {t("about")}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <LanguageSwitcher locale={locale} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
