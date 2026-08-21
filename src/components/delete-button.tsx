"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "sonner";
import { removeMovieSuggestion } from "@/data/prisma/suggestions/actions";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const deleteRequest = () => {
    if (isPending) return;
    startTransition(async () => {
      const result = await removeMovieSuggestion(id);
      toast.dismiss();

      if (result.ok) {
        toast.success("Successfully Deleted!");
        return router.refresh();
      } else {
        toast.error("Failed to delete movie suggestion", { description: result.error });
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
