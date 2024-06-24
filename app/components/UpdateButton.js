"use client";

import RefreshRequests from "../actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SiTicktick } from "react-icons/si";

export function UpdateButton({ id, added }) {
  const router = useRouter();
  const UpdateRequest = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/movierequest/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ added }),
      });
      if (res.ok) {
        toast.success("Uğurla Güncəlləndi");
        RefreshRequests();
      } else {
        throw new Error("Failed to Update");
      }
    } catch (err) {
      toast.error("Güncəllənən zaman problem yaşandı");
      console.log(err);
    }
  };
  return (
    <SiTicktick
      onClick={UpdateRequest}
      className={`cursor-pointer text-2xl ${!added ? "text-red-500 hover:text-red-600" : "text-blue-500 hover:text-blue-700"}`}
    />
  );
}
