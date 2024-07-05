"use client";

import useStore from "@/lib/store";
import { useScopedI18n } from "@/locales/client";
import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiSearch } from "react-icons/bi";
import { useDebounce } from "use-debounce";

export default function Search() {
  const t = useScopedI18n("Movies.Search");
  const [text, setText] = useState("");
  const [query] = useDebounce(text.trim(), 600);
  const setSearch = useStore((state) => state.setSearch);
  const resultCount = useStore((state) => state.resultCount);

  useEffect(() => {
    setSearch(query);
  }, [query]);
  useEffect(() => {
    if (resultCount === 0) {
      toast(t("noResultMessage"), {
        position:
          window.innerHeight > window.innerWidth ? "top-right" : "bottom-right",
        icon: <BiSearch className="text-2xl font-bold" />,
      });
    }
  }, [resultCount]);

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
