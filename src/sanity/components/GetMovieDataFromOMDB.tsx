"use client";

import { apiVersion } from "../env";
import { getOMDBDataById } from "@/data-access/omdb/get";
import { SearchIcon } from "@sanity/icons";
import { Spinner, useToast } from "@sanity/ui";
import { startTransition, useState } from "react";
import { InputProps, useClient, useFormValue } from "sanity";

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
          movieTime: parseInt(OMDbMovie.Runtime.match(/\d+/)?.[0] || "0", 10),
          genre: validGenres,
        };

        await client.patch(documentId).set(filmData).commit();
        triggerSlugGeneration();
        triggerDescriptionGeneration();
      } catch (err) {
        console.error(err);
        toast.push({ title: "An error occured while fetching data!", status: "error" });
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <div className="relative">
      {renderDefault(props)}
      <button
        type="button"
        onClick={handleFetch}
        disabled={isLoading}
        className="absolute top-0 right-0 z-[2000] flex h-[98%] w-10 cursor-pointer items-center justify-center rounded transition-all duration-200 hover:bg-gray-600/40"
      >
        {isLoading ? <Spinner size={1} /> : <SearchIcon fontSize={28} />}
      </button>
    </div>
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
