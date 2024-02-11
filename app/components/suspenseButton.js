"use client";
import { Button } from "@nextui-org/react";

export default function SuspenseButton() {
  return (
    <Button color="primary" className="text-md flex font-bold">
      <i class="bx bx-loader-alt animate-spin text-2xl"></i>
    </Button>
  );
}
