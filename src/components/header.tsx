"use client";

import LanguageSwitcher from "@/components/language-switcher";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { BiSolidMovie } from "react-icons/bi";

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const t = useTranslations("Header");

  const navigationItems = [
    {
      href: "/",
      translationKey: "homePage",
      path: `/${locale}`,
    },
    {
      href: "/movies",
      translationKey: "movies",
      path: `/${locale}/movies`,
    },
    {
      href: "/about",
      translationKey: "about",
      path: `/${locale}/about`,
    },
  ];

  return (
    <Navbar
      key={"navbar"}
      className="light:text-white min-h-10 bg-gray-100/90 font-bold text-white backdrop-blur-md select-none dark:text-white"
      classNames={{
        item: [
          "relative flex h-full items-center",
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
      <NavbarContent key={"logo"} justify="start">
        <NavbarBrand as={"li"} key={"brand"}>
          <Link className="relative left-0 flex flex-row items-center gap-1.5 text-xl font-bold" href={`/`}>
            <BiSolidMovie className="text-3xl font-normal text-blue-600" />
            <p className="font-bold text-inherit">FilmIsBest</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent key={"navigation"} className="hidden gap-12 sm:flex" justify="center">
        {navigationItems.map((item) => (
          <NavbarItem key={item.href} isActive={pathname === item.path}>
            <Link
              aria-current="page"
              className="text-lg text-gray-300 hover:text-white"
              color="foreground"
              href={item.href}
            >
              {t(item.translationKey)}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent key={"language_switcher"} justify="end">
        <NavbarItem>
          <LanguageSwitcher locale={locale} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
