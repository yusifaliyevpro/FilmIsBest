"use client";

import { updateMovieRequest } from "@/data/prisma/requests/actions";
import { removeMovieRequest } from "@/data/prisma/requests/actions";
import { cn } from "@/lib/cn";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { closeAll } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { SiTicktick } from "react-icons/si";

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

export function RefreshButton() {
  const router = useRouter();
  const refresh = () => router.refresh();
  return (
    <Button className="w-28 font-bold" color="primary" size="lg" onPress={refresh}>
      Refresh
    </Button>
  );
}

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
