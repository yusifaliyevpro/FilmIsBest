"use client";

import { updateMovieRequest } from "@/lib/prisma/actions";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { SiTicktick } from "react-icons/si";

export function UpdateButton({ id, added }: { id: string; added: boolean }) {
  const router = useRouter();
  const UpdateRequest = async () => {
    try {
      const { res, e } = await updateMovieRequest(id, added);
      if (res && !e) {
        addToast({ title: "Uğurla Güncəlləndi", color: "success" });
        router.refresh();
      } else {
        throw new Error("Failed to Update");
      }
    } catch (err) {
      console.log(err);
      addToast({ title: "Güncəllənən zaman problem yaşandı", color: "danger" });
    }
  };
  return (
    <SiTicktick
      className={`cursor-pointer text-2xl ${!added ? "text-red-500 hover:text-red-600" : "text-blue-500 hover:text-blue-700"}`}
      onClick={UpdateRequest}
    />
  );
}
