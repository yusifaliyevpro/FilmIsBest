"use client";

import { useTranslations } from "next-intl";
import { NavbarItem } from "@heroui/navbar";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";

export type NavBarItem = {
  href: string;
  translationKey: string;
  path: string;
};

export function NavItem({ item }: { item: NavBarItem }) {
  const t = useTranslations("Header");
  const pathname = usePathname();

  return (
    <NavbarItem key={item.href} isActive={pathname === item.path}>
      <Link
        aria-current="page"
        className="text-lg text-gray-300 hover:text-white"
        color="foreground"
        href={item.href}
        prefetch={true}
      >
        {t(item.translationKey)}
      </Link>
    </NavbarItem>
  );
}
