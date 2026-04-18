"use client";

import { useCompletion } from "@ai-sdk/react";
import { BsStars } from "react-icons/bs";
import { Spinner, TextArea } from "@sanity/ui";
import { InputProps, set, unset, useFormValue } from "sanity";

export function GenerateDescriptionComponent(props: InputProps) {
  const { value, onChange } = props;
  const filmName = useFormValue(["filmName"]) as string | undefined;

  const { completion, isLoading, complete, setCompletion } = useCompletion({
    api: "/api/generate-description",
    onFinish: (_, completion) => {
      onChange(completion ? set(completion) : unset());
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputVal = e.currentTarget.value;
    setCompletion("");
    onChange(inputVal ? set(inputVal) : unset());
  };

  return (
    <div className="relative">
      <TextArea
        value={completion || (value as string)}
        rows={10}
        onChange={handleChange}
        style={{ paddingRight: "40px" }}
      />
      <button
        type="button"
        data-selector="description-generate-button"
        onClick={() => {
          if (!filmName) return alert("Əvvəlcə film adı daxil edin.");
          complete(filmName);
        }}
        disabled={isLoading}
        className="absolute top-2 right-2 z-2000 flex size-7.5 cursor-pointer flex-col items-center justify-center rounded bg-gray-900 text-sm"
        title="Generate with AI"
      >
        {isLoading ? <Spinner size={1} /> : <BsStars size={18} className="text-amber-400" />}
      </button>
    </div>
  );
}
