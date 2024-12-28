import { Button } from "@nextui-org/react";
import { Link } from "@/i18n/routing";
import { useFormValue } from "sanity";

export default function SearchPoster() {
  const filmName = useFormValue(["filmName"]) as string;
  const link = `https://www.google.com/search?q=${encodeURIComponent(filmName).trim().replace(/\s+/g, "+")}+poster+imdb&udm=2`;
  return (
    <div className="relative my-0 flex w-full flex-row justify-end">
      <Link href={link} target="_blank">
        <Button color="primary">Search Poster</Button>
      </Link>
    </div>
  );
}
