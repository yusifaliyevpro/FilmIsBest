"use client";

import { useCompletion } from "@ai-sdk/react";
import { BsStars } from "react-icons/bs";
import { Box, Button, TextArea } from "@sanity/ui";
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
    <Box style={{ position: "relative" }}>
      <TextArea
        value={completion || (value as string)}
        rows={10}
        onChange={handleChange}
        style={{ paddingRight: "40px" }}
      />
      <Button
        type="button"
        data-selector="description-generate-button"
        onClick={() => {
          if (!filmName) return alert("Əvvəlcə film adı daxil edin.");
          complete(filmName);
        }}
        disabled={isLoading}
        loading={isLoading}
        mode="bleed"
        padding={0}
        radius={2}
        icon={<BsStars size={18} style={{ color: "#fbbf24" }} />}
        title="Generate with AI"
        aria-label="Generate description with AI"
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          zIndex: 2000,
          width: "30px",
          height: "30px",
          backgroundColor: "#111827",
        }}
      />
    </Box>
  );
}
