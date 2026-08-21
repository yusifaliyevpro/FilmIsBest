"use client";

import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";
import { Avatar } from "@/components/avatar";
import { authClient } from "@/lib/auth-client";

export default function AvatarMenu({ image, email }: { image: string; email: string }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <>
      <Dropdown className="dark" classNames={{ content: "border border-white/10 bg-gray-900" }}>
        <DropdownTrigger>
          <button type="button" aria-label="Account menu" className="cursor-pointer rounded-full">
            <Avatar src={image} isBordered alt="Avatar" />
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="User actions">
          <DropdownItem key="profile" isReadOnly className="h-10 gap-2 opacity-100">
            <p className="truncate font-semibold text-gray-100">{email}</p>
          </DropdownItem>
          <DropdownItem key="sign-out" variant="light" className="data-[hover=true]:bg-transparent">
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
