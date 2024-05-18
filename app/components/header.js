"use client";
import Link from "next/link";
import { Suspense, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarContent,
  NavbarMenuItem,
  NavbarMenu,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { BiSolidMovie } from "react-icons/bi";
import { IoCodeSlash } from "react-icons/io5";
import toast from "react-hot-toast";
import LanguageSwitcher from "./LanguageSwitcher";
import { useScopedI18n } from "@/locales/client";

export default function Header({ locale }) {
  const pathname = usePathname();
  const t = useScopedI18n("Header");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const notify = () =>
    toast(t("thisFeatureIsUnderDevelopment"), {
      icon: <IoCodeSlash className="text-xl font-bold" />,
      id: "preparing",
    });

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="min-h-10 select-none  bg-gray-100/90 font-bold text-white backdrop-blur-md light:text-white dark:text-white"
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
            <BiSolidMovie className=" text-3xl font-normal text-blue-600" />
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
            className="text-lg  text-gray-300 hover:text-white"
            aria-current="page"
          >
            {t("movies")}
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === `/${locale}/about`}>
          <Link
            href={`/about`}
            className="text-lg  text-gray-300 hover:text-white"
            aria-current="page"
          >
            {t("about")}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            color="primary"
            onPress={notify}
            className="text-md flex font-bold"
          >
            {t("signIn")}
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Suspense>
            <LanguageSwitcher />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="max-h-[200px] items-center justify-center gap-3 overflow-hidden bg-gray-100/90 backdrop-blur-md ">
        <NavbarMenuItem key={1}>
          <Link
            href={`/`}
            className={`${pathname === `/${locale}` ? "text-blue-600" : "text-white"} w-full text-xl font-bold`}
          >
            {t("homePage")}
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key={2}>
          <Link
            href={`/movies`}
            className={`${pathname === `/${locale}/movies` ? "text-blue-600" : "text-white"} w-full text-xl font-bold`}
          >
            {t("movies")}
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key={2}>
          <Link
            href={`/about`}
            className={`${pathname === `/${locale}/about` ? "text-blue-600" : "text-white"} w-full text-xl font-bold`}
          >
            {t("about")}
          </Link>
        </NavbarMenuItem>
        <NavbarItem>
          <Suspense>
            <LanguageSwitcher />
          </Suspense>
        </NavbarItem>
      </NavbarMenu>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
    </Navbar>
  );
}
