"use client";
import { Input } from "@nextui-org/input";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import toast from "react-hot-toast";
import { BiSearch } from "react-icons/bi";
import { useTranslations } from "next-intl";

export default function Search({
  searchQuery,
  resultCount,
  pageQuery,
  locale,
}) {
  const router = useRouter();
  const [text, setText] = useState(searchQuery);
  const [query] = useDebounce(text, 600);
  const initialRender = useRef(true);
  const t = useTranslations("Movies.Search");

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (!query || query.length < 3) {
      router.push(
        `/${locale}/movies?${pageQuery !== 1 ? "page=" + pageQuery : ""}`,
      );
    } else {
      router.push(
        `/${locale}/movies?search=${query}${pageQuery !== 1 ? "" : "&page=" + pageQuery}`,
      );
    }
  }, [query, router]);

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
    <div>
      <div className=" mx-auto mb-4 mt-6 w-auto sm:w-[500px]">
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
            setText(e.target.value.replace(/['\[\]\/\\()]/g, ""));
          }}
          radius="full"
          startContent={<BiSearch className="text-[1.7rem] font-bold" />}
          type="search"
        />
      </div>
    </div>
  );
}
