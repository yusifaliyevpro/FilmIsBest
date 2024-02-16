"use client";
import React from "react";
import { Pagination } from "@nextui-org/pagination";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function PaginationUI({
  pageQuery,
  resultCount,
  searchQuery,
  count,
}) {
  const router = useRouter();
  const total = Math.ceil(
    (searchQuery !== undefined ? resultCount : count) / 20,
  );
  const [page, setPage] = useState(pageQuery);

  useEffect(() => {
    if (page === 1) {
      router.push(
        `/movies${searchQuery !== undefined ? "?search=" + searchQuery : ""}`,
        {
          scroll: false,
        },
      );
    } else if (page > total) {
      router.push(
        `/movies?${searchQuery !== undefined ? "search=" + searchQuery + "&" : ""}page=${total}`,
        {
          scroll: false,
        },
      );
    } else {
      router.push(
        `/movies?${searchQuery !== undefined ? "search=" + searchQuery + "&" : ""}page=${page}`,
        {
          scroll: false,
        },
      );
    }
  }, [page, router]);

  return (
    <div className="relative mt-5 flex">
      <Pagination
        total={total !== 0 ? total : 1}
        page={pageQuery < total ? pageQuery : total}
        onChange={(page) => setPage(page)}
      />
    </div>
  );
}
