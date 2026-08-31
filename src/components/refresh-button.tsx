"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { cn } from "@/lib/cn";
import { Button } from "./button";

export function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const refresh = () => {
    if (isPending) return;
    startTransition(() => router.refresh());
  };

  return (
    <Button isIconOnly aria-label="Refresh" color="default" variant="outline" onPress={refresh} disabled={isPending}>
      <FiRefreshCw className={cn("text-lg", isPending && "animate-spin")} />
    </Button>
  );
}
