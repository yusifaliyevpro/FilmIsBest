"use client";

import { searchParams } from "@/lib/searchParams";
import { Input } from "@heroui/input";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import { BiSearch } from "react-icons/bi";

export default function Search() {
  const [query, setQuery] = useQueryState("q", searchParams.q);
  const t = useTranslations("Movies.Search");

  return (
    <div className="mx-auto mt-6 mb-4 w-auto sm:w-125">
      <Input
        placeholder={t("placeholder")}
        radius="full"
        size="lg"
        startContent={<BiSearch className="text-[1.7rem] font-bold" />}
        type="search"
        value={query}
        variant="bordered"
        classNames={{
          base: "h-11 bg-gray-800 sm:max-w-400",
          mainWrapper: "h-full bg-gray-800",
          input: "text-md text-small bg-gray-800 font-bold",
          inputWrapper: "h-full bg-gray-800 font-normal text-white dark:bg-gray-800",
        }}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
