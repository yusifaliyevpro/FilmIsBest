"use client";

import { Locales, redirect } from "@/i18n/routing";
import { Avatar } from "@heroui/avatar";
import { Select, SelectItem } from "@heroui/select";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher({ locale }: { locale: Locales }) {
  const pathname = usePathname().replace("az", "").replace("en", "").replace("tr", "");
  const changeLocale = (lang: Locales) => {
    redirect({ locale: lang, href: pathname });
  };
  const languages = [
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
            <Avatar alt={item?.data?.lang || ""} className="h-6 w-6" src={`https://flagcdn.com/${item?.data?.flag}.svg`} />
            <p>{item?.data?.key.toUpperCase()}</p>
          </div>
        ));
      }}
      onSelectionChange={(value) => changeLocale(value.currentKey as Locales)}
    >
      {(language) => (
        <SelectItem
          key={language.key}
          startContent={<Avatar alt={language.lang} className="h-6 w-6" src={`https://flagcdn.com/${language.flag}.svg`} />}
        >
          {language.key.toUpperCase()}
        </SelectItem>
      )}
    </Select>
  );
}
