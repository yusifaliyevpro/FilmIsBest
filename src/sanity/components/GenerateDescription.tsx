"use client";

import { apiVersion } from "../env";
import { generateDescription } from "@/lib/ai/actions";
import { Button } from "@heroui/button";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useFormValue, useClient } from "sanity";

export default function GenerateDescription() {
  const filmName = useFormValue(["filmName"]) as string;
  const documentId = useFormValue(["_id"]) as string;
  const client = useClient({ apiVersion: apiVersion });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await generateDescription(filmName);
      if (response.error) {
        return setError(response.error);
      }
      console.log(response);
      await client
        .patch(documentId)
        .set({
          description: response.text,
        })
        .commit();
      setError("");
    } catch (error) {
      setError("Failed to assign description.");
      console.error("Error assigning description:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="relative my-0 flex w-full flex-row justify-end">
      <div className="gap-y-2y flex flex-col">
        <Button
          className={`${isLoading && "animate-pulse"} font-bold`}
          color="primary"
          isDisabled={!filmName || isLoading}
          onPress={handleGenerate}
        >
          {isLoading && <AiOutlineLoading className="mr-3 animate-spin font-bold" />}
          {isLoading ? "Generating" : "Generate Description"}
        </Button>
        {error && (
          <div className="absolute right-0 top-0 z-10 w-full rounded-md bg-red-500 p-2 text-center text-sm font-semibold text-white">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
