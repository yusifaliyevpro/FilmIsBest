import { Button } from "@heroui/button";
import { useFormValue } from "sanity";

export default function SearchPoster() {
  const filmName = useFormValue(["filmName"]) as string;
  const link = `https://www.google.com/search?q=${encodeURIComponent(filmName).trim().replace(/\s+/g, "+")}+poster+imdb&udm=2`;
  return (
    <div className="relative my-0 flex w-full flex-row justify-end">
      <a href={link} target="_blank">
        <Button color="primary">Search Poster</Button>
      </a>
    </div>
  );
}
