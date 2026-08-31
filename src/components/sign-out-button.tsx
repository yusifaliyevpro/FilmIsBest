"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FiLogOut } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { Button } from "./button";

export function SignOutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () =>
    startTransition(async () => {
      await authClient.signOut();
      router.refresh();
    });

  return (
    <Button
      color="danger"
      variant="outline"
      isLoading={isPending}
      startContent={!isPending && <FiLogOut className="text-base" />}
      onPress={handleSignOut}
    >
      Sign out
    </Button>
  );
}
