import { Link } from "@/i18n/routing";
import { Button } from "@heroui/button";
import copy from "copy-to-clipboard";
import { useFormValue } from "sanity";

export default function GenerateDescription() {
  const filmName = useFormValue(["filmName"]);
  const link = `https://chatgpt.com/c/56bd4f3e-90ef-48f9-8530-9f8329c94538`;

  return (
    <div className="relative my-0 flex w-full flex-row justify-end">
      <Link href={link} target="_blank">
        <Button color="primary" onPress={() => copy(filmName + " üçündə")}>
          Generate Description
        </Button>
      </Link>
    </div>
  );
}
