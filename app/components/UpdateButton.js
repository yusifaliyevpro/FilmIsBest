"use client";

import RefreshRequests from "../actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SiTicktick } from "react-icons/si";

export function UpdateButton({ id, added }) {
  const router = useRouter();
  const UpdateRequest = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/movierequests?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            password: process.env.ADMIN_PASSWORD,
          },
          body: JSON.stringify({ added }),
        },
      );
      console.log(res);
      if (res.ok) {
        toast.success("Uğurla Güncəlləndi");
        RefreshRequests();
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
