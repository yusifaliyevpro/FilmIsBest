"use client";

import { updateMovieRequest } from "@/data-access/prisma/requests/actions";
import { removeMovieRequest } from "@/data-access/prisma/requests/actions";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { closeAll } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { SiTicktick } from "react-icons/si";

export function UpdateButton({ id, added }: { id: string; added: boolean }) {
  const router = useRouter();
  const updateRequest = async () => {
    const { error } = await updateMovieRequest(id, added);
    if (!error) {
      addToast({ title: "Updates Successfully!", color: "success" });
      router.refresh();
    } else {
      addToast({ title: error, color: "danger" });
    }
  };
  return (
    <SiTicktick
      className={`cursor-pointer text-2xl ${!added ? "text-red-500 hover:text-red-600" : "text-blue-500 hover:text-blue-700"}`}
      onClick={updateRequest}
    />
  );
}

export function RefreshButton() {
  const router = useRouter();
  const refresh = () => router.refresh();
  return (
    <Button className="w-28 font-bold" color="primary" size="lg" onPress={refresh}>
      Refresh
    </Button>
  );
}

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const deleteRequest = async () => {
    const { error } = await removeMovieRequest(id);
    closeAll();
    if (!error) {
      addToast({ title: "Uğurla Silindi", color: "success" });
      return router.refresh();
    }
    addToast({ title: error, color: "danger" });
  };
  return (
    <MdOutlineDeleteOutline
      className={`cursor-pointer text-2xl text-red-500 hover:text-red-700`}
      onClick={deleteRequest}
    />
  );
}
