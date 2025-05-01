"use client";

import { removeMovieRequest } from "@/lib/prisma/actions";
import { addToast, closeAll } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { MdOutlineDeleteOutline } from "react-icons/md";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const deleteRequest = async () => {
    try {
      const { res, e } = await removeMovieRequest(id);
      if (res && !e) {
        closeAll();
        addToast({ title: "Uğurla Silindi", color: "success" });
        return router.refresh();
      }
      throw new Error("Failed to Delete");
    } catch (err) {
      closeAll();
      addToast({ title: "Silinən zaman problem yaşandı", color: "danger" });
      console.log(err);
    }
  };
  return <MdOutlineDeleteOutline className={`cursor-pointer text-2xl text-red-500 hover:text-red-700`} onClick={deleteRequest} />;
}
