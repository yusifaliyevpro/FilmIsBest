"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SiTicktick } from "react-icons/si";
import { toast } from "sonner";
import { updateMovieSuggestion } from "@/data/prisma/suggestions/actions";
import { cn } from "@/lib/cn";

export function UpdateButton({ id, added }: { id: string; added: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const updateRequest = () => {
    if (isPending) return;
    startTransition(async () => {
      const result = await updateMovieSuggestion(id, added);
      if (result.ok) {
        toast.success("Updates Successfully!");
        router.refresh();
      } else {
        toast.error("Failed to update movie suggestion", { description: result.error });
      }
    });
  };

  return (
    <SiTicktick
      className={cn(
        "cursor-pointer text-2xl",
        !added ? "text-red-500 hover:text-red-600" : "text-blue-500 hover:text-blue-700",
        isPending && "cursor-wait opacity-50",
      )}
      onClick={updateRequest}
    />
  );
}
