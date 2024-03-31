"use client";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { usePathname, useRouter } from "../../../navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Header.LanguageSwitcher");
  const [value, setValue] = useState({ currentKey: locale });
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (!initialRender) {
      const key = value.currentKey;
      router.replace(pathname, { locale: key });
    }
    setInitialRender(false);
  }, [value]);

  return (
    <Select
      className="min-w-[110px]"
      defaultSelectedKeys={[locale]}
      label={t("language")}
      onSelectionChange={setValue}
    >
      <SelectItem
        key="en"
        startContent={
          <Avatar
            alt="English"
            className="h-6 w-6"
            src="https://flagcdn.com/gb.svg"
          />
        }
      >
        EN
      </SelectItem>
      <SelectItem
        key="az"
        startContent={
          <Avatar
            alt="Azerbaijani"
            className="h-6 w-6"
            src="https://flagcdn.com/az.svg"
          />
        }
      >
        AZ
      </SelectItem>
    </Select>
  );
}
