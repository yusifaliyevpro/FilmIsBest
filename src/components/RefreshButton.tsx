"use client";

import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

export default function RefreshButton() {
  const router = useRouter();
  const refresh = () => router.refresh();
  return (
    <Button className="w-[7rem] font-bold" color="primary" size="lg" onPress={refresh}>
      Refresh
    </Button>
  );
}
