"use client";

import { redirect } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Avatar } from "@heroui/avatar";
import { Select, SelectItem } from "@heroui/select";
import { usePathname } from "next/navigation";

type Languages = { key: Locale; lang: string; flag: string }[];

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname().slice(3).trim() || "/";
  const changeLocale = (lang: Locale) => redirect({ locale: lang, href: pathname });

  const languages: Languages = [
    { key: "az", lang: "Azərbaycanca", flag: "az" },
    { key: "en", lang: "English", flag: "gb" },
    { key: "tr", lang: "Türkçə", flag: "tr" },
  ];

  return (
    <Select
      isRequired
      aria-label="Language"
      className="min-w-[110px]"
      items={languages}
      selectedKeys={[locale]}
      classNames={{
        trigger: "bg-gray-200 hover:bg-gray-100",
        popoverContent: "bg-gray-200",
        value: "font-sans font-bold",
        listbox: "font-bold text-white",
        selectorIcon: "text-white",
      }}
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className="flex flex-row items-center gap-x-2">
            <Avatar alt={item.data?.lang || ""} className="h-6 w-6" src={`/flags/${item?.data?.flag}.svg`} />
            <p>{item?.data?.key.toUpperCase()}</p>
          </div>
        ));
      }}
      onSelectionChange={(value) => changeLocale(value.currentKey as Locale)}
    >
      {(language) => (
        <SelectItem
          key={language.key}
          startContent={
            <Avatar alt={language.lang} className="h-6 w-6" src={`/flags/${language.flag}.svg`} />
          }
        >
          {language.key.toUpperCase()}
        </SelectItem>
      )}
    </Select>
  );
}
