import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Suspense } from "react";
import { BiSolidMovie } from "react-icons/bi";
import { LanguageSwitcher } from "@/components/language-switcher";
import { cn } from "@/lib/cn";
import { Link } from "@/i18n/navigation";
import { NavBarItem, NavItem } from "./nav-item";

export function Header() {
  return (
    <Navbar
      className="min-h-10 bg-gray-800/90 font-bold text-white backdrop-blur-md select-none dark:text-white light:text-white"
      classNames={{
        item: cn(
          "relative flex h-full items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-0.5",
          "data-[active=true]:after:rounded-xs",
          "data-[active=true]:after:bg-primary",
          "data-[active=true]:after:mb-3",
        ),
      }}
    >
      <NavbarContent key="brand" justify="start">
        <NavbarBrand as={"li"}>
          <Link className="relative left-0 flex flex-row items-center gap-1.5 text-xl font-bold" href={`/`}>
            <BiSolidMovie className="text-3xl font-normal text-blue-600" />
            <p className="font-bold text-inherit">FilmIsBest</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent key="navigation" className="hidden gap-12 sm:flex" justify="center">
        <Suspense>
          {navigationItems.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </Suspense>
      </NavbarContent>
      <NavbarContent key="actions" justify="end">
        <NavbarItem>
          <Suspense>
            <LanguageSwitcher />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

const navigationItems: NavBarItem[] = [
  {
    href: "/",
    translationKey: "homePage",
    path: `/`,
  },
  {
    href: "/movies",
    translationKey: "movies",
    path: `/movies`,
  },
  {
    href: "/about",
    translationKey: "about",
    path: `/about`,
  },
];
