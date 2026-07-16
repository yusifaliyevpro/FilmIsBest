"use client";

import { CheckmarkIcon } from "@sanity/icons/Checkmark";
import { DownloadIcon } from "@sanity/icons/Download";
import { SearchIcon } from "@sanity/icons/Search";
import { Box, Button, Flex, useToast } from "@sanity/ui";
import { startTransition, useState } from "react";
import { type ImageValue, type ObjectFieldProps, set, setIfMissing, useClient, useFormValue } from "sanity";
import { uploadMoviePosters } from "@/data/tmdb/get";
import { apiVersion } from "../env";

/** How long the success checkmark stays on the button after a fetch. */
const SUCCESS_FEEDBACK_MS = 1500;

export function SearchPoster(props: ObjectFieldProps<ImageValue>) {
  const { renderDefault, inputProps } = props;
  const filmName = useFormValue(["filmName"]) as string | undefined;
  const imdbID = useFormValue(["imdbID"]) as string | undefined;
  const client = useClient({ apiVersion: apiVersion });
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const link = `https://www.google.com/search?q=${encodeURIComponent(filmName ?? "")
    .trim()
    .replace(/\s+/g, "+")}+poster+imdb&udm=2`;

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
        const result = await uploadMoviePosters(imdbID, token, filmName);
        console.log("[SearchPoster] result:", result);

        switch (result.status) {
          case "ok":
            inputProps.onChange([
              setIfMissing({ _type: "image" }),
              set({ _type: "reference", _ref: result.data.assetIds[0] }, ["asset"]),
            ]);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), SUCCESS_FEEDBACK_MS);
            break;
          case "unauthorized":
            toast.push({ status: "error", title: "Unauthorized" });
            break;
          case "not-found":
            toast.push({
              status: "warning",
              title: "No poster found on TMDB",
              description: "Use the search button to find one manually.",
            });
            break;
          case "no-more":
            toast.push({
              status: "info",
              title: "No more posters left",
              description: "All TMDB posters for this movie are already uploaded.",
            });
            break;
          case "error":
            toast.push({ status: "error", title: "Poster fetch failed", description: result.message });
            break;
        }
      } catch (err) {
        console.error("[SearchPoster] error:", err);
        toast.push({ status: "error", title: "An error occured while fetching the poster!" });
      }
      setIsLoading(false);
    });
  };

  return (
    <Box>
      {renderDefault(props)}
      <Flex align="center" justify="flex-end" gap={1} marginY={3}>
        <Button
          type="button"
          data-selector="poster-fetch-button"
          onClick={handleFetch}
          disabled={isLoading}
          loading={isLoading}
          mode="ghost"
          icon={showSuccess ? CheckmarkIcon : DownloadIcon}
          text="Fetch from TMDB"
          aria-label="Fetch poster from TMDB"
        />
        <Button
          as="a"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          mode="ghost"
          icon={SearchIcon}
          aria-label="Search for poster"
          title="Search for poster"
        />
      </Flex>
    </Box>
  );
}
