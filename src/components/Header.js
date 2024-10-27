"use client";

import LanguageSwitcher from "./LanguageSwitcher";
import SuspenseButton from "./SuspenseLayouts";
import { useScopedI18n } from "@/src/locales/client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import { BiSolidMovie } from "react-icons/bi";

export default function Header({ locale }) {
  const pathname = usePathname();
  const t = useScopedI18n("Header");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
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
          <Link
            href={`/`}
            className="relative left-0 flex flex-row items-center gap-1.5 text-xl font-bold"
          >
            <BiSolidMovie className="text-3xl font-normal text-blue-600" />
            <p className="font-bold text-inherit">FilmIsBest</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-12 sm:flex" justify="center">
        <NavbarItem isActive={pathname === `/${locale}`}>
          <Link
            color="foreground"
            className="hover: text-lg text-gray-300 hover:text-white"
            href={`/`}
            aria-current="page"
          >
            {t("homePage")}
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === `/${locale}/movies`}>
          <Link
            href={`/movies`}
            className="text-lg text-gray-300 hover:text-white"
            aria-current="page"
          >
            {t("movies")}
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === `/${locale}/about`}>
          <Link
            href={`/about`}
            className="text-lg text-gray-300 hover:text-white"
            aria-current="page"
          >
            {t("about")}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Suspense fallback={<SuspenseButton color={"bg-gray-200"} />}>
            <LanguageSwitcher />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
