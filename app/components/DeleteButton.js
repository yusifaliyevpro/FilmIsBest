"use client";

import RefreshRequests from "../actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MdOutlineDeleteOutline } from "react-icons/md";

export function DeleteButton({ id }) {
  const router = useRouter();
  const deleteRequest = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/movierequests?id=${id}`,
        {
          method: "DELETE",
        },
      );
      if (res.ok) {
        toast.success("Uğurla Silindi");
        RefreshRequests();
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
