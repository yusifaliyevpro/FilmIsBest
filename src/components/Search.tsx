"use client";

import useStore from "@/lib/store";
import { Input } from "@heroui/input";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDebounce } from "use-debounce";

export default function Search() {
  const t = useTranslations("Movies.Search");
  const [text, setText] = useState("");
  const [query] = useDebounce(text.trim(), 600);
  const setSearch = useStore((state) => state.setSearch);

  useEffect(() => {
    setSearch(query);
  }, [query, setSearch]);

  return (
    <>
      <div className="mx-auto mb-4 mt-6 w-auto sm:w-[500px]">
        <Input
          classNames={{
            base: "h-11 bg-gray-100 sm:max-w-[100rem]",
            mainWrapper: "h-full bg-gray-100",
            input: "text-md bg-gray-100 text-small font-bold",
            inputWrapper: "h-full bg-gray-100 font-normal text-white dark:bg-gray-100",
          }}
          placeholder={t("placeholder")}
          radius="full"
          size="lg"
          startContent={<BiSearch className="text-[1.7rem] font-bold" />}
          type="search"
          value={text}
          variant="bordered"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
    </>
  );
}
