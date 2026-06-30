"use client";

import { useQueryState } from "nuqs";
import { Pagination } from "@heroui/pagination";
import { searchParams } from "@/lib/searchParams";

export default function PaginationUI({ count }: { count: number }) {
  const [pageQuery, setPage] = useQueryState("p", searchParams.p);

  const total = Math.ceil(count / 20);

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
