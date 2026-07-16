import { Suspense } from "react";
import { BiSolidMovie } from "react-icons/bi";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Link } from "@/i18n/navigation";
import { type NavBarItem, NavItem } from "./nav-item";

export function Header() {
  return (
    <header className="sticky inset-x-0 top-0 z-40 flex w-full items-center justify-center bg-gray-800/90 font-bold text-white backdrop-blur-md select-none">
      <nav className="relative flex h-16 w-full max-w-5xl flex-row flex-nowrap items-center justify-between gap-4 px-6">
        {/* Brand (left) — grow/basis-0 mirrors the right side so the nav stays centered */}
        <div className="flex grow basis-0 items-center justify-start">
          <Link className="relative left-0 flex flex-row items-center gap-1.5 text-xl font-bold" href={`/`}>
            <BiSolidMovie className="text-3xl font-normal text-blue-600" />
            <p className="font-bold text-inherit">FilmIsBest</p>
          </Link>
        </div>

        {/* Navigation (center) — hidden on mobile; the mobile-navbar handles those */}
        <ul className="hidden h-full flex-row flex-nowrap items-center justify-center gap-12 sm:flex">
          <Suspense>
            {navigationItems.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </Suspense>
        </ul>

        {/* Actions (right) — inner wrapper keeps the w-full Select sized to its
            content instead of stretching across the grown half */}
        <div className="flex grow basis-0 items-center justify-end">
          <div className="flex items-center">
            <Suspense>
              <LanguageSwitcher />
            </Suspense>
          </div>
        </div>
      </nav>
    </header>
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
