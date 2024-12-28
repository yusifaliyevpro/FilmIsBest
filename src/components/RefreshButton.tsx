"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function RefreshButton() {
  const router = useRouter();
  const refresh = () => router.refresh();
  return (
    <Button
      onPress={refresh}
      color="primary"
      size="lg"
      className="w-[7rem] font-bold"
    >
      Refresh
    </Button>
  );
}
