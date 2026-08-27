"use client";

import { Select, SelectItem } from "@heroui/select";
import { useLocale, type Locale } from "next-intl";
import { Avatar } from "@/components/avatar";
import { useRouter } from "@/i18n/navigation";

type Languages = { key: Locale; lang: string; flag: string }[];

export function LanguageSwitcher() {
  const router = useRouter();
  const locale = useLocale();
  const changeLocale = (lang: Locale) => {
    if (lang === locale) return;
    // Strip the current locale prefix; useRouter re-adds the target one.
    const href = window.location.pathname.replace(new RegExp(`^/${locale}(?=/|$)`), "") || "/";
    router.push(href, { locale: lang });
  };

  const languages: Languages = [
    { key: "az", lang: "Azərbaycanca", flag: "az" },
    { key: "en", lang: "English", flag: "gb" },
    { key: "tr", lang: "Türkçə", flag: "tr" },
  ];

  return (
    <Select
      isRequired
      aria-label="Language"
      className="min-w-27.5"
      items={languages}
      id="skd934urik"
      aria-labelledby="jeiwjdsskd"
      selectedKeys={[locale]}
      classNames={{
        trigger: "bg-gray-900 hover:bg-gray-800",
        popoverContent: "bg-gray-900",
        value: "font-sans font-bold",
        listbox: "font-bold text-white",
        selectorIcon: "text-white",
      }}
      renderValue={(items) => {
        const item = items[0];
        if (!item) return null;
        return (
          <div className="flex flex-row items-center gap-x-2">
            <Avatar alt={item.data?.lang || ""} className="h-6 w-6" src={`/flags/${item?.data?.flag}.svg`} />
            <p>{item?.data?.key.toUpperCase()}</p>
          </div>
        );
      }}
      onSelectionChange={(value) => {
        // oxlint-disable-next-line typescript/no-unsafe-type-assertion
        changeLocale(value.currentKey as Locale);
      }}
    >
      {(language) => (
        <SelectItem
          key={language.key}
          startContent={<Avatar alt={language.lang} className="h-6 w-6" src={`/flags/${language.flag}.svg`} />}
        >
          {language.key.toUpperCase()}
        </SelectItem>
      )}
    </Select>
  );
}
