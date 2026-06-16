"use client";

import { startTransition, useState } from "react";
import { SearchIcon } from "@sanity/icons";
import { Box, Button, useToast } from "@sanity/ui";
import { InputProps, useClient, useFormValue } from "sanity";
import { getOMDBDataById } from "@/data/omdb/get";
import { apiVersion } from "../env";

export function GetMovieDataFromOMDB(props: InputProps) {
  const { value, renderDefault } = props;
  const [isLoading, setIsLoading] = useState(false);
  const client = useClient({ apiVersion: apiVersion });
  const toast = useToast();
  const documentId = useFormValue(["_id"]) as string;

  const handleFetch = () => {
    const imdbID = value as string | undefined;

    if (!imdbID) {
      toast.push({ title: "IMDb ID field is Empty!", status: "error" });
      return;
    }

    setIsLoading(true);

    startTransition(async () => {
      try {
        const OMDbMovie = await getOMDBDataById(imdbID);

        if (OMDbMovie.Response === "False") {
          toast.push({ title: "Movie is not found!", status: "error" });
          return;
        }

        const genreList = (OMDbMovie.Genre as string).split(", ").map((g) => g.trim());
        const validGenres = genreList.filter((g) => availableGenres.includes(g));

        const filmData = {
          filmName: OMDbMovie.Title.trim(),
          imdbpuan: parseFloat(OMDbMovie.imdbRating),
          actors: OMDbMovie.Actors.split(", ").slice(0, 3).join(" ! ").trim(),
          country: OMDbMovie.Country.trim(),
          directed: OMDbMovie.Director.split(", ").join(" ! ").trim(),
          releaseDate: Number(OMDbMovie.Year),
          movieTime: extractMovieTime(OMDbMovie.Runtime),
          genre: validGenres,
        };

        await client.patch(documentId).set(filmData).commit();
        triggerSlugGeneration();
        triggerDescriptionGeneration();
      } catch (err) {
        console.error(err);
        toast.push({ title: "An error occured while fetching data!", status: "error" });
      }
      setIsLoading(false);
    });
  };

  return (
    <Box style={{ position: "relative" }}>
      {renderDefault(props)}
      <Button
        type="button"
        onClick={handleFetch}
        disabled={isLoading}
        loading={isLoading}
        mode="bleed"
        icon={SearchIcon}
        radius={2}
        aria-label="Fetch movie data from OMDb"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 2000,
          height: "98%",
          width: "40px",
        }}
      />
    </Box>
  );
}

const availableGenres = [
  "Action",
  "Adventure",
  "Drama",
  "Thriller",
  "Animation",
  "Comedy",
  "Family",
  "Sci-Fi",
  "Fantasy",
  "Horror",
  "Mystery",
  "Documentary",
  "War",
  "Crime",
  "Historical",
];

const triggerSlugGeneration = () => {
  const slugField = document.querySelector('[data-testid="field-slug"]');
  const buttonField = slugField?.querySelector('[data-testid="change-bar-wrapper"]');
  const button = buttonField?.querySelector("button");

  if (button) {
    button.click();
  } else {
    console.warn("Slug generate butonu tapılmadı.");
  }
};

const triggerDescriptionGeneration = () => {
  const descriptionButton = document.querySelector(
    '[data-selector="description-generate-button"]',
  ) as HTMLButtonElement;

  if (descriptionButton) {
    descriptionButton.click();
  } else {
    console.warn("Slug generate butonu tapılmadı.");
  }
};

// Helper function defined outside try/catch for React Compiler compatibility
const extractMovieTime = (runtimeStr: string): number => {
  const match = runtimeStr.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};
