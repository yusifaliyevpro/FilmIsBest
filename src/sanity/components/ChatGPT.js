"use client";

import { Button } from "@nextui-org/react";
import copy from "copy-to-clipboard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormValue } from "sanity";

export default function GenerateDescription() {
  const form = useFormValue(["filmName"]);
  const [filmName, setFilmName] = useState(form ? form : "");
  useEffect(() => {
    setFilmName(form);
  }, [form]);
  const link = `https://chatgpt.com/c/56bd4f3e-90ef-48f9-8530-9f8329c94538`;

  return (
    <div className="relative my-0 flex w-full flex-row justify-end">
      <Link href={link} target="_blank">
        <Button onPress={() => copy(filmName + " üçündə")} color="primary">
          Generate Description
        </Button>
      </Link>
    </div>
  );
}
