"use client";

import { useCompletion } from "@ai-sdk/react";
import { BsStars } from "react-icons/bs";
import { Box, Button, TextArea, useToast } from "@sanity/ui";
import { InputProps, set, unset, useClient, useFormValue } from "sanity";
import { apiVersion } from "../env";
import { useEffect } from "react";

export function GenerateDescriptionComponent(props: InputProps) {
  const { value, onChange } = props;
  const filmName = useFormValue(["filmName"]) as string | undefined;
  const client = useClient({ apiVersion: apiVersion });
  const toast = useToast();

  const token = client.config().token;

  const { completion, isLoading, complete, setCompletion } = useCompletion({
    api: "/api/generate-description",
    // The route returns result.toTextStreamResponse() (plain text), so the
    // client must use the "text" protocol. The default "data" protocol expects
    // SSE-formatted data chunks and silently parses nothing from a text stream.
    streamProtocol: "text",
    body: { token },
    fetch: async (input, init) => {
      console.log("[GenerateDescription] requesting:", input);
      const response = await fetch(input, init);
      console.log("[GenerateDescription] response:", response.status, response.statusText);
      if (!response.ok) {
        const text = await response.clone().text();
        console.error("[GenerateDescription] error body:", text);
      }
      return response;
    },
    onFinish: (_, completion) => {
      console.log("[GenerateDescription] finished, length:", completion?.length ?? 0);
      onChange(completion ? set(completion) : unset());
    },
    onError: (error) => {
      console.error("[GenerateDescription] error:", error);
      toast.push({
        status: "error",
        title: "Description yaradıla bilmədi",
        description: error.message || "Naməlum xəta baş verdi.",
      });
    },
  });

  useEffect(() => {
    if (!isLoading && completion) {
      console.log("Generated description:", completion);
    }
  }, [completion, isLoading]);

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
