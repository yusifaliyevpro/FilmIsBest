"use client";

import { updateMovieRequest } from "@/lib/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SiTicktick } from "react-icons/si";

export function UpdateButton({ id, added }: { id: string; added: boolean }) {
  const router = useRouter();
  const UpdateRequest = async () => {
    try {
      const { res, e } = await updateMovieRequest(id, added);
      if (res && !e) {
        toast.success("Uğurla Güncəlləndi");
        router.refresh();
      } else {
        throw new Error("Failed to Update");
      }
    } catch (err) {
      console.log(err);
      toast.error("Güncəllənən zaman problem yaşandı");
    }
  };
  return (
    <SiTicktick
      onClick={UpdateRequest}
      className={`cursor-pointer text-2xl ${!added ? "text-red-500 hover:text-red-600" : "text-blue-500 hover:text-blue-700"}`}
    />
  );
}
