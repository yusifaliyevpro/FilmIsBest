"use client";

import { Input } from "@heroui/input";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDebounce } from "use-debounce";

export default function Search() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.trim() || "";
  const [text, setText] = useState(searchQuery);
  const [query] = useDebounce(text.trim(), 600);
  const router = useRouter();
  const t = useTranslations("Movies.Search");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) params.set(name, value);
      else params.delete(name);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    router.replace(`?${createQueryString("search", query)}`);
  }, [query, createQueryString, router]);

  return (
    <>
      <div className="mx-auto mt-6 mb-4 w-auto sm:w-102">
        <Input
          placeholder={t("placeholder")}
          radius="full"
          size="lg"
          startContent={<BiSearch className="text-[1.7rem] font-bold" />}
          type="search"
          value={text}
          variant="bordered"
          classNames={{
            base: "h-11 bg-gray-100 sm:max-w-400",
            mainWrapper: "h-full bg-gray-100",
            input: "text-md text-small bg-gray-100 font-bold",
            inputWrapper: "h-full bg-gray-100 font-normal text-white dark:bg-gray-100",
          }}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </>
  );
}
