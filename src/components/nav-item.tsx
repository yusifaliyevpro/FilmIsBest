import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { TranslationKeys } from "@/i18n/types";

export type NavBarItem = {
  href: string;
  translationKey: TranslationKeys<"Header">;
  path: string;
};

export async function NavItem({ item }: { item: NavBarItem }) {
  const t = await getTranslations("Header");

  return (
    <li className={"relative flex h-full list-none items-center whitespace-nowrap"}>
      <Link className="text-lg text-gray-300 hover:text-white" href={item.href} prefetch={true}>
        {t(item.translationKey)}
      </Link>
    </li>
  );
}
