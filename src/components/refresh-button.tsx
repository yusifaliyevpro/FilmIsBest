"use client";

import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { cn } from "@/lib/cn";

export function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const refresh = () => {
    if (isPending) return;
    startTransition(() => router.refresh());
  };

  return (
    <Button
      isIconOnly
      aria-label="Refresh"
      variant="light"
      radius="full"
      className="text-gray-400 hover:text-white"
      onPress={refresh}
    >
      <FiRefreshCw className={cn("text-xl", isPending && "animate-spin")} />
    </Button>
  );
}
