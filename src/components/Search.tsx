"use client";

import useStore from "@/lib/store";
import { Input } from "@nextui-org/input";
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
            base: "sm:max-w-[100rem] h-11 bg-gray-100",
            mainWrapper: "h-full bg-gray-100",
            input: "text-small bg-gray-100 font-bold text-md",
            inputWrapper:
              "h-full font-normal text-white bg-gray-100 dark:bg-gray-100",
          }}
          placeholder={t("placeholder")}
          variant="bordered"
          size="lg"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          radius="full"
          startContent={<BiSearch className="text-[1.7rem] font-bold" />}
          type="search"
        />
      </div>
    </>
  );
}
