"use client";

import { generateDescription } from "@/data-access/ai/actions";
import { TextArea } from "@sanity/ui";
import { startTransition, useState } from "react";
import { InputProps, set, unset } from "sanity";
import { useFormValue } from "sanity";

export default function AITextArea(props: InputProps) {
  const { value, onChange } = props;
  const filmName = useFormValue(["filmName"]) as string | undefined;
  const [loading, setLoading] = useState(false);

  const [streamValue, setStreamValue] = useState<string | null>(null);

  const handleAI = () => {
    if (!filmName) return alert("Əvvəlcə film adı daxil edin.");

    setLoading(true);
    setStreamValue("");
    startTransition(async () => {
      const { textStream } = await generateDescription(filmName);
      if (!textStream) {
        setLoading(false);
        return;
      }

      let fullText = "";

      for await (const textPart of textStream) {
        fullText += textPart;
        setStreamValue(fullText);
      }

      onChange(fullText ? set(fullText) : unset());
      setLoading(false);
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
        onClick={handleAI}
        disabled={loading}
        className="absolute top-2 right-2 z-[2000] h-[30px] w-[30px] cursor-pointer rounded bg-gray-200 text-sm"
        title="AI ilə yaz"
      >
        {loading ? "..." : "✨"}
      </button>
    </div>
  );
}
