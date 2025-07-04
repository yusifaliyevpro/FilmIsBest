"use client";

import { removeMovieRequest } from "@/data-access/prisma/requests/actions";
import { addToast, closeAll } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { MdOutlineDeleteOutline } from "react-icons/md";

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
