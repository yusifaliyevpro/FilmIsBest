"use client";

import { removeMovieRequest } from "@/lib/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MdOutlineDeleteOutline } from "react-icons/md";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const deleteRequest = async () => {
    try {
      const { res, e } = await removeMovieRequest(id);
      if (res && !e) {
        toast.success("Uğurla Silindi");
        router.refresh();
      } else {
        throw new Error("Failed to Delete");
      }
    } catch (err) {
      toast.error("Silinən zaman problem yaşandı");
      console.log(err);
    }
  };
  return (
    <MdOutlineDeleteOutline
      onClick={deleteRequest}
      className={`cursor-pointer text-2xl text-red-500 hover:text-red-700`}
    />
  );
}
