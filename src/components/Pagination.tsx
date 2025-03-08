"use client";

import useStore from "@/lib/store";
import { Pagination } from "@heroui/pagination";

export default function PaginationUI({ count }: { count: number }) {
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
