"use client";

import { FiSettings } from "react-icons/fi";
import { usePasskeyPanel } from "@/lib/passkey-panel";
import { Button } from "./button";

export function PasskeyToggleButton() {
  const { open, toggle } = usePasskeyPanel();

  return (
    <Button
      isIconOnly
      color="default"
      variant="outline"
      onPress={toggle}
      aria-label="Passkey settings"
      aria-pressed={open}
      className={open ? "border-primary/40 text-foreground" : undefined}
    >
      <FiSettings className="text-lg" />
    </Button>
  );
}
