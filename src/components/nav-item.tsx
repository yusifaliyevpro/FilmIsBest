"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export type NavBarItem = {
  href: string;
  translationKey: string;
  path: string;
};

export function NavItem({ item }: { item: NavBarItem }) {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const isActive = pathname === item.path;

  return (
    <li
      className={cn(
        "relative flex h-full list-none items-center whitespace-nowrap",
        isActive &&
          "font-semibold after:absolute after:inset-x-0 after:bottom-0 after:mb-3 after:h-0.5 after:rounded-xs after:bg-primary after:content-['']",
      )}
    >
      <Link
        aria-current={isActive ? "page" : undefined}
        className="text-lg text-gray-300 hover:text-white"
        href={item.href}
        prefetch={true}
      >
        {t(item.translationKey)}
      </Link>
    </li>
  );
}
