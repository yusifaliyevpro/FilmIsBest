"use client";

import { Button } from "@nextui-org/react";
import copy from "copy-to-clipboard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormValue } from "sanity";

export default function SearchPoster() {
  const form = useFormValue(["filmName"]);
  const [filmName, setFilmName] = useState(form ? form : "");
  useEffect(() => {
    setFilmName(form);
  }, [form]);
  const link = `https://www.google.com/search?q=${encodeURIComponent(filmName).trim().replace(/\s+/g, "+")}+poster+imdb&udm=2`;
  return (
    <div className="relative my-0 flex w-full flex-row justify-end">
      <Link href={link} target="_blank">
        <Button color="primary">Search Poster</Button>
      </Link>
    </div>
  );
}
