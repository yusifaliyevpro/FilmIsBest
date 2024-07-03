"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormValue } from "sanity";

export default function SearchOnYoutube() {
  const form = useFormValue(["filmName"]);
  const [filmName, setFilmName] = useState(form ? form : "");
  useEffect(() => {
    setFilmName(form);
  }, [form]);
  const link = `https://www.youtube.com/results?search_query=${encodeURIComponent(filmName).trim().replace(/\s+/g, "+")}+official+trailer`;

  return (
    <div className="relative my-0 flex w-full flex-row justify-end">
      <Link href={link} target="_blank">
        <Button color="primary">Search on YouTube</Button>
      </Link>
    </div>
  );
}
