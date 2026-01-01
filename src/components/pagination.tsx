"use client";

import { searchParams } from "@/lib/searchParams";
import { Pagination } from "@heroui/pagination";
import { useQueryState } from "nuqs";

export default function PaginationUI({ count }: { count: number }) {
  const [searchQuery] = useQueryState("q", searchParams.q);
  const [pageQuery, setPage] = useQueryState("p", searchParams.p);

  const total = Math.ceil((searchQuery ? 20 : count) / 20);

  return (
    <div className="mt-5">
      <Pagination
        classNames={{ item: "bg-gray-900" }}
        page={pageQuery < total ? pageQuery : total}
        total={total !== 0 ? total : 1}
        onChange={setPage}
      />
    </div>
  );
}
