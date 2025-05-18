"use client";

import useStore from "@/lib/store";
import { MOVIES_QUERYResult } from "@/sanity/types";
import { Pagination } from "@heroui/pagination";
import { use } from "react";

export default function PaginationUI({ moviesPromise }: { moviesPromise: Promise<MOVIES_QUERYResult> }) {
  const count = use(moviesPromise).length;
  const setPage = useStore((state) => state.setPage);
  const page = useStore((state) => state.page);
  const search = useStore((state) => state.search);
  const total = Math.ceil((search ? 20 : count) / 20);

  return (
    <div className="relative mt-5 flex">
      <Pagination
        classNames={{ item: "bg-gray-200" }}
        page={page < total ? page : total}
        total={total !== 0 ? total : 1}
        onChange={(page) => setPage(page)}
      />
    </div>
  );
}
