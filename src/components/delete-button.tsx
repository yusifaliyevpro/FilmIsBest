"use client";

import { addToast, closeAll } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { removeMovieRequest } from "@/data/prisma/requests/actions";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const deleteRequest = () => {
    if (isPending) return;
    startTransition(async () => {
      const result = await removeMovieRequest(id);
      closeAll();

      if (result.ok) {
        addToast({ title: "Successfully Deleted!", color: "success" });
        return router.refresh();
      } else {
        addToast({ title: "Failed to delete movie request", description: result.error, color: "danger" });
      }
    });
  };

  return (
    <MdOutlineDeleteOutline
      className={`cursor-pointer text-2xl text-red-500 hover:text-red-700`}
      onClick={deleteRequest}
    />
  );
}
