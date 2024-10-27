"use client";

import RefreshRequests from "../app/actions";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";

export default function RefreshButton() {
  const refresh = () => {
    try {
      RefreshRequests();
      toast.success("Refreshed");
    } catch (error) {
      console.log(error);
      toast.error("Couldn't refresh");
    }
  };

  return (
    <Button
      onPress={refresh}
      color="primary"
      size="lg"
      className="w-[7rem] font-bold"
    >
      Refresh
    </Button>
  );
}
