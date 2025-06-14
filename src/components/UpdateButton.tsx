"use client";

import { updateMovieRequest } from "@/data-access/requests/actions";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { SiTicktick } from "react-icons/si";

export function UpdateButton({ id, added }: { id: string; added: boolean }) {
  const router = useRouter();
  const UpdateRequest = async () => {
    const { error } = await updateMovieRequest(id, added);
    if (!error) {
      addToast({ title: "Uğurla Güncəlləndi", color: "success" });
      router.refresh();
    } else {
      addToast({ title: error, color: "danger" });
    }
  };
  return (
    <SiTicktick
      className={`cursor-pointer text-2xl ${!added ? "text-red-500 hover:text-red-600" : "text-blue-500 hover:text-blue-700"}`}
      onClick={UpdateRequest}
    />
  );
}
