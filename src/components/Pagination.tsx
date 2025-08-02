"use client";

import { Pagination } from "@heroui/pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export default function PaginationUI({ count }: { count: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const searchQuery = searchParams.get("search")?.trim() || "";
  const pageQuery = Number(searchParams.get("page")) || 1;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const setPage = (page: number) => {
    if (page === 1) router.push(pathname);
    else router.push(pathname + "?" + createQueryString("page", String(page)));
  };

  const total = Math.ceil((searchQuery ? 20 : count) / 20);

  return (
    <div className="relative mt-5 flex">
      <Pagination
        classNames={{ item: "bg-gray-200" }}
        page={pageQuery < total ? pageQuery : total}
        total={total !== 0 ? total : 1}
        onChange={setPage}
      />
    </div>
  );
}
