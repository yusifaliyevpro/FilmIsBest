"use client";
import { Input } from "@nextui-org/input";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

export default function Search({ searchQuery, pageQuery }) {
  const router = useRouter();
  const [text, setText] = useState(searchQuery);
  const [query] = useDebounce(text, 600);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (!query || query.length < 3) {
      router.push(`/movies?${pageQuery !== 1 ? "page=" + pageQuery : ""}`);
    } else {
      router.push(
        `/movies?search=${query}${pageQuery !== 1 ? "" : "&page=" + pageQuery}`,
      );
    }
  }, [query, router]);

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
          placeholder="Film adı və ya IMDb ID'si ilə axtarın"
          variant="bordered"
          size="lg"
          value={text}
          onChange={(e) => {
            setText(e.target.value.replace(/['\[\]\/\\()]/g, ""));
          }}
          radius="full"
          startContent={<i className="bx bx-search text-2xl font-bold"></i>}
          type="search"
        />
      </div>
    </div>
  );
}
