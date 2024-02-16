"use client";
import { Button } from "@nextui-org/react";
import { BiLoaderAlt } from "react-icons/bi";

export default function SuspenseButton() {
  return (
    <Button color="primary" className="text-md flex font-bold">
      <BiLoaderAlt className="animate-spin text-2xl" />
    </Button>
  );
}
