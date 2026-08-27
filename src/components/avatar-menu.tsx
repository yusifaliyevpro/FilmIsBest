"use client";

import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { Avatar } from "@/components/avatar";
import { authClient } from "@/lib/auth-client";

export default function AvatarMenu({ image, email }: { image: string; email: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event: MouseEvent) => {
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative dark">
      <button
        type="button"
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer rounded-full"
      >
        <Avatar src={image} isBordered alt="Avatar" />
      </button>
      {open && (
        <div
          role="menu"
          aria-label="User actions"
          className="absolute right-0 z-50 mt-2 flex w-56 flex-col gap-1 rounded-large border border-white/10 bg-gray-900 p-1 shadow-medium"
        >
          <div className="flex h-10 items-center gap-2 px-2">
            <p className="truncate font-semibold text-gray-100">{email}</p>
          </div>
          <Button
            color="danger"
            startContent={<BiLogOut className="text-2xl" />}
            className="w-full justify-center font-bold"
            onPress={() => handleSignOut()}
          >
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
}
