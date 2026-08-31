"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FaCheck } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { toast } from "sonner";
import { updateMovieSuggestion } from "@/data/prisma/suggestions/actions";
import { Button } from "./button";

export function UpdateButton({ id, added }: { id: string; added: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // `added` is the pending action (true = mark as added). So a suggestion that
  // is already added arrives here with `added === false`.
  const isAdded = !added;

  const updateRequest = () => {
    if (isPending) return;
    startTransition(async () => {
      const result = await updateMovieSuggestion(id, added);
      if (result.ok) {
        toast.success("Updated Successfully!");
        router.refresh();
      } else {
        toast.error("Failed to update movie suggestion", { description: result.error });
      }
    });
  };

  return (
    <Button
      isIconOnly
      size="sm"
      variant="outline"
      color={isAdded ? "warning" : "success"}
      aria-label={isAdded ? "Mark as not added" : "Mark as added"}
      onPress={updateRequest}
      disabled={isPending}
    >
      {isAdded ? <FiX className="size-5 shrink-0" /> : <FaCheck className="size-4 shrink-0" />}
    </Button>
  );
}
