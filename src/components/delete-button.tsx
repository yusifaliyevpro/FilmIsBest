"use client";

import { addToast, closeAll } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { removeMovieSuggestion } from "@/data/prisma/suggestions/actions";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const deleteRequest = () => {
    if (isPending) return;
    startTransition(async () => {
      const result = await removeMovieSuggestion(id);
      closeAll();

      if (result.ok) {
        addToast({ title: "Successfully Deleted!", color: "success" });
        return router.refresh();
      } else {
        addToast({ title: "Failed to delete movie suggestion", description: result.error, color: "danger" });
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
