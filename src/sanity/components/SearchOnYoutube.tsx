import { Button } from "@heroui/button";
import { useFormValue } from "sanity";

export function SearchOnYoutube() {
  const filmName = useFormValue(["filmName"]) as string;
  const link = `https://www.youtube.com/results?search_query=${encodeURIComponent(filmName).trim().replace(/\s+/g, "+")}+official+trailer`;

  return (
    <div className="relative my-0 flex w-full flex-row justify-end">
      <a href={link} target="_blank">
        <Button color="primary">Search on YouTube</Button>
      </a>
    </div>
  );
}
