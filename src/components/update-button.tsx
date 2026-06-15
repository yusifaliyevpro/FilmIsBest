"use client";

import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SiTicktick } from "react-icons/si";
import { updateMovieRequest } from "@/data/prisma/requests/actions";
import { cn } from "@/lib/cn";

export function UpdateButton({ id, added }: { id: string; added: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const updateRequest = () => {
    if (isPending) return;
    startTransition(async () => {
      const result = await updateMovieRequest(id, added);
      if (result.ok) {
        addToast({ title: "Updates Successfully!", color: "success" });
        router.refresh();
      } else {
        addToast({ title: "Failed to update movie request", description: result.error, color: "danger" });
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
