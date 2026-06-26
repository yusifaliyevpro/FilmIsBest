"use client";

import { startTransition, useState } from "react";
import { CheckmarkIcon, ConfettiIcon, SearchIcon } from "@sanity/icons";
import { InputProps, set, unset, useClient, useFormValue } from "sanity";
import { Box, Button, Flex, useToast } from "@sanity/ui";
import { getMovieTrailerId } from "@/data/tmdb/get";
import { apiVersion } from "../env";

/** How long the success checkmark stays on the button after a fetch. */
const SUCCESS_FEEDBACK_MS = 1500;

export function SearchOnYoutube(props: InputProps) {
  const { renderDefault, onChange } = props;
  const filmName = useFormValue(["filmName"]) as string | undefined;
  const imdbID = useFormValue(["imdbID"]) as string | undefined;
  const client = useClient({ apiVersion: apiVersion });
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const link = `https://www.youtube.com/results?search_query=${encodeURIComponent(filmName ?? "")
    .trim()
    .replace(/\s+/g, "+")}+official+trailer`;

  const handleFetch = () => {
    if (!imdbID) {
      toast.push({ status: "error", title: "IMDb ID field is Empty!" });
      return;
    }

    const token = client.config().token;
    if (!token) {
      toast.push({ status: "error", title: "You must be logged in to Sanity Studio" });
      return;
    }

    setIsLoading(true);
    startTransition(async () => {
      try {
        const result = await getMovieTrailerId(imdbID, token);
        console.log("[SearchOnYoutube] result:", result);

        switch (result.status) {
          case "ok":
            if (result.data) onChange(set(result.data));
            else onChange(unset());
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), SUCCESS_FEEDBACK_MS);
            break;
          case "unauthorized":
            toast.push({ status: "error", title: "Unauthorized" });
            break;
          case "not-found":
            toast.push({
              status: "warning",
              title: "No trailer found on TMDB",
              description: "Use the search button to find one manually.",
            });
            break;
          case "error":
            toast.push({ status: "error", title: "Trailer fetch failed", description: result.message });
            break;
        }
      } catch (err) {
        console.error("[SearchOnYoutube] error:", err);
        toast.push({ status: "error", title: "An error occured while fetching the trailer!" });
      }
      setIsLoading(false);
    });
  };

  return (
    <Flex align="center" gap={1}>
      <Box flex={1}>{renderDefault(props)}</Box>
      <Button
        type="button"
        data-selector="trailer-fetch-button"
        onClick={handleFetch}
        disabled={isLoading}
        loading={isLoading}
        mode="ghost"
        icon={showSuccess ? CheckmarkIcon : ConfettiIcon}
        aria-label="Fetch trailer from TMDB"
        title="Fetch trailer from TMDB"
      />
      <Button
        as="a"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        mode="ghost"
        icon={SearchIcon}
        aria-label="Search on YouTube"
        title="Search on YouTube"
      />
    </Flex>
  );
}
