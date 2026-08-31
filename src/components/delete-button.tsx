"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "sonner";
import { removeMovieSuggestion } from "@/data/prisma/suggestions/actions";
import { Button } from "./button";

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
    <Button
      isIconOnly
      size="sm"
      variant="outline"
      color="danger"
      aria-label="Delete suggestion"
      onPress={deleteRequest}
      disabled={isPending}
    >
      <MdOutlineDeleteOutline className="size-5 shrink-0" />
    </Button>
  );
}
