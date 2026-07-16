"use client";

import { useCompletion } from "@ai-sdk/react";
import { SparklesIcon } from "@sanity/icons/Sparkles";
import { Button, Flex, Stack, TextArea, useToast } from "@sanity/ui";
import { type InputProps, set, unset, useClient, useFormValue } from "sanity";
import { apiVersion } from "../env";

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
    onFinish: (_, finishCompletion) => {
      console.log("[GenerateDescription] finished, length:", finishCompletion?.length ?? 0);
      onChange(finishCompletion ? set(finishCompletion) : unset());
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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputVal = e.currentTarget.value;
    setCompletion("");
    onChange(inputVal ? set(inputVal) : unset());
  };

  return (
    <Stack gap={3}>
      <TextArea value={completion || (value as string)} rows={10} onChange={handleChange} />
      <Flex align="center" justify="flex-end">
        <Button
          type="button"
          data-selector="description-generate-button"
          onClick={() => {
            if (!filmName) return alert("Əvvəlcə film adı daxil edin.");
            complete(filmName);
          }}
          disabled={isLoading}
          loading={isLoading}
          mode="ghost"
          icon={SparklesIcon}
          text="Generate with AI"
          title="Generate with AI"
          aria-label="Generate description with AI"
        />
      </Flex>
    </Stack>
  );
}
