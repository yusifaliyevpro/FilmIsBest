import { Button } from "@heroui/button";
import { BiLoaderAlt } from "react-icons/bi";

export function LoadingButton({ color }: { color: "primary" | "default" }) {
  return (
    <Button className={`text-md flex h-[2.5rem] w-[6.9rem] font-bold ${color}`} color={color}>
      <BiLoaderAlt className="animate-spin text-2xl" />
    </Button>
  );
}
