import { Button } from "@nextui-org/button";
import { BiLoaderAlt } from "react-icons/bi";

export default function SuspenseButton() {
  return (
    <Button color="primary" className="text-md flex font-bold">
      <BiLoaderAlt className="animate-spin text-2xl" />
    </Button>
  );
}
