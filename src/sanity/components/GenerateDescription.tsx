"use client";

import { generateDescription } from "@/data-access/ai/actions";
import { Spinner, TextArea } from "@sanity/ui";
import { startTransition, useState } from "react";
import { BsStars } from "react-icons/bs";
import { InputProps, set, unset } from "sanity";
import { useFormValue } from "sanity";

export default function GenerateDescriptionComponent(props: InputProps) {
  const { value, onChange } = props;
  const filmName = useFormValue(["filmName"]) as string | undefined;
  const [isLoading, setIsLoading] = useState(false);

  const [streamValue, setStreamValue] = useState<string | null>(null);

  const handleAI = () => {
    if (!filmName) return alert("Əvvəlcə film adı daxil edin.");

    setIsLoading(true);
    setStreamValue("");
    startTransition(async () => {
      const { textStream } = await generateDescription(filmName);
      if (!textStream) {
        setIsLoading(false);
        return;
      }

      let fullText = "";

      for await (const textPart of textStream) {
        fullText += textPart;
        setStreamValue(fullText);
      }

      onChange(fullText ? set(fullText) : unset());
      setIsLoading(false);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputVal = e.currentTarget.value;
    onChange(inputVal ? set(inputVal) : unset());
    setStreamValue(null);
  };

  return (
    <div className="relative">
      <TextArea
        value={streamValue !== null ? streamValue : (value as string)}
        rows={10}
        onChange={handleChange}
        style={{ paddingRight: "40px" }}
      />
      <button
        type="button"
        data-selector="description-generate-button"
        onClick={handleAI}
        disabled={isLoading}
        className="absolute top-2 right-2 z-[2000] flex h-[30px] w-[30px] cursor-pointer flex-col items-center justify-center rounded bg-gray-200 text-sm"
        title="AI ilə yaz"
      >
        {isLoading ? <Spinner size={1} /> : <BsStars size={18} className="text-amber-400" />}
      </button>
    </div>
  );
}
