"use client";

import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";
import { authClient } from "@/lib/auth-client";

export default function AvatarMenu({ image, email }: { image: string; email: string }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <>
      <Dropdown className="light">
        <DropdownTrigger>
          <Avatar src={image} color="primary" isBordered alt="Avatar" className="cursor-pointer" />
        </DropdownTrigger>
        <DropdownMenu aria-label="User actions">
          <DropdownItem key="profile" className="h-10 gap-2">
            <p className="font-semibold text-black">{email}</p>
          </DropdownItem>
          <DropdownItem key="sign-out" variant="light">
            <Button
              color="danger"
              startContent={<BiLogOut className="text-2xl" />}
              className="w-full justify-center font-bold"
              onPress={() => handleSignOut()}
            >
              Sign Out
            </Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
