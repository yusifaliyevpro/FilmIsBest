"use client";

import { SearchIcon } from "@sanity/icons/Search";
import { Box, Button, Card, Flex, Popover, Stack, Text, useClickOutsideEvent, useToast } from "@sanity/ui";
import Image from "next/image";
import { startTransition, useRef, useState } from "react";
import { type InputProps, set, useClient, useFormValue } from "sanity";
import { parseReleaseYear } from "@/data/omdb/decode";
import { type OMDbSearchItem, getOMDBDataById, searchOMDBByTitle } from "@/data/omdb/get";
import { getTmdbId } from "@/data/tmdb/get";
import { GENRE_LIST } from "@/lib/genres";
import { apiVersion } from "../env";

const IMDB_ID_PATTERN = /^tt\d+$/i;

export function GetMovieDataFromOMDB(props: InputProps) {
  const { value, renderDefault, onChange } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<OMDbSearchItem[] | null>(null);
  const [open, setOpen] = useState(false);
  const client = useClient({ apiVersion: apiVersion });
  const toast = useToast();
  const documentId = useFormValue(["_id"]) as string;
  // Current values of the dependent fields, so we only auto-generate the ones
  // that aren't filled in yet (re-fetching mustn't clobber existing work).
  const slug = useFormValue(["slug"]) as { current?: string } | undefined;
  const description = useFormValue(["description"]) as string | undefined;
  const poster = useFormValue(["poster"]) as { asset?: { _ref?: string } } | undefined;
  const trailer = useFormValue(["FraqmanLink"]) as string | undefined;
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useClickOutsideEvent(
    () => setOpen(false),
    () => [buttonRef.current, popoverRef.current],
  );

  // Fetches the full OMDb record for a known imdbID, applies it to the document
  // and triggers the dependent fields (slug, description, poster, trailer).
  const applyMovieData = (imdbID: string, token: string) => {
    setIsLoading(true);
    startTransition(async () => {
      try {
        const OMDbMovie = await getOMDBDataById(imdbID, token);
        if (!OMDbMovie) {
          toast.push({ title: "Unauthorized", status: "error" });
        } else if (OMDbMovie.Response === "False") {
          toast.push({ title: "Movie is not found!", status: "error" });
        } else {
          const genreList = (OMDbMovie.Genre as string).split(", ").map((g) => g.trim());
          const validGenres = genreList.filter((g) => (GENRE_LIST as readonly string[]).includes(g));

          // Resolve the TMDB id in parallel so the front-end players can be
          // addressed by it. Best-effort: if TMDB can't find it, leave it unset.
          const tmdbResult = await getTmdbId(imdbID, token);

          const filmData: Record<string, unknown> = {
            filmName: OMDbMovie.Title.trim(),
            series: OMDbMovie.Type === "series",
            imdbpuan: parseFloat(OMDbMovie.imdbRating),
            actors: OMDbMovie.Actors.split(", ").map((actor) => actor.trim()),
            country: OMDbMovie.Country.trim(),
            directed: OMDbMovie.Director.split(", ").map((director) => director.trim()),
            releaseDate: parseReleaseYear(OMDbMovie.Year),
            movieTime: extractMovieTime(OMDbMovie.Runtime),
            genre: validGenres,
          };
          if (tmdbResult.status === "ok") filmData.tmdbId = tmdbResult.data;

          await client.patch(documentId).set(filmData).commit();

          // Only generate the dependent fields that are still empty. FraqmanLink
          // defaults to the sentinel "Empty", which counts as unset.
          if (!slug?.current) triggerSlugGeneration();
          if (!description?.trim()) triggerDescriptionGeneration();
          if (!poster?.asset?._ref) triggerPosterFetch();
          if (!trailer || !trailer.trim() || trailer.trim() === "Empty") triggerTrailerFetch();
        }
      } catch (err) {
        console.error(err);
        toast.push({ title: "An error occured while fetching data!", status: "error" });
      }
      setIsLoading(false);
    });
  };

  // The field accepts either an imdbID (fetch directly) or a movie title (search
  // OMDb and show pickable results).
  const handleSearch = () => {
    const query = (value as string | undefined)?.trim();
    if (!query) {
      toast.push({ title: "Field is empty! Type a movie name or IMDb ID.", status: "error" });
      return;
    }

    const token = client.config().token;
    if (!token) {
      toast.push({ status: "error", title: "You must be logged in to Sanity Studio" });
      return;
    }

    if (IMDB_ID_PATTERN.test(query)) {
      applyMovieData(query, token);
      return;
    }

    setIsLoading(true);
    startTransition(async () => {
      try {
        const items = await searchOMDBByTitle(query, token);
        if (items === null) {
          toast.push({ title: "Unauthorized", status: "error" });
        } else if (items.length === 0) {
          toast.push({ title: "No movies found!", status: "warning" });
        } else {
          setResults(items);
          setOpen(true);
        }
      } catch (err) {
        console.error(err);
        toast.push({ title: "An error occured while searching!", status: "error" });
      }
      setIsLoading(false);
    });
  };

  const handleSelect = (item: OMDbSearchItem) => {
    onChange(set(item.imdbID));
    setOpen(false);
    setResults(null);

    const token = client.config().token;
    if (!token) {
      toast.push({ status: "error", title: "You must be logged in to Sanity Studio" });
      return;
    }
    applyMovieData(item.imdbID, token);
  };

  return (
    <Flex align="center" gap={1}>
      <Box flex={1}>{renderDefault(props)}</Box>
      <Popover
        open={open}
        portal
        placement="bottom-end"
        content={
          <Box ref={popoverRef} padding={1} style={{ maxHeight: 360, overflowY: "auto", width: 340 }}>
            <Stack space={1}>
              {results?.map((item) => (
                <Card
                  key={item.imdbID}
                  as="button"
                  type="button"
                  padding={2}
                  radius={2}
                  onClick={() => handleSelect(item)}
                  style={{ cursor: "pointer", textAlign: "left", width: "100%" }}
                >
                  <Flex align="center" gap={3}>
                    {item.Poster && item.Poster !== "N/A" ? (
                      <Image
                        src={item.Poster}
                        alt="Film poster"
                        width={40}
                        height={60}
                        unoptimized
                        style={{ objectFit: "cover", borderRadius: 4, flexShrink: 0 }}
                      />
                    ) : (
                      <Box
                        style={{
                          width: 40,
                          height: 60,
                          borderRadius: 4,
                          flexShrink: 0,
                          background: "var(--card-border-color, #2a2f38)",
                        }}
                      />
                    )}
                    <Stack space={2}>
                      <Text size={1} weight="semibold">
                        {item.Title}
                      </Text>
                      <Text size={1} muted>
                        {item.Year}
                      </Text>
                    </Stack>
                  </Flex>
                </Card>
              ))}
            </Stack>
          </Box>
        }
      >
        <Button
          ref={buttonRef}
          type="button"
          onClick={handleSearch}
          disabled={isLoading}
          loading={isLoading}
          mode="ghost"
          icon={SearchIcon}
          aria-label="Search by movie name or fetch by IMDb ID"
          title="Search by movie name or fetch by IMDb ID"
        />
      </Popover>
    </Flex>
  );
}

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
    console.warn("Description generate butonu tapılmadı.");
  }
};

const triggerPosterFetch = () => {
  const posterButton = document.querySelector('[data-selector="poster-fetch-button"]') as HTMLButtonElement;

  if (posterButton) {
    posterButton.click();
  } else {
    console.warn("Poster fetch butonu tapılmadı.");
  }
};

const triggerTrailerFetch = () => {
  const trailerButton = document.querySelector('[data-selector="trailer-fetch-button"]') as HTMLButtonElement;

  if (trailerButton) {
    trailerButton.click();
  } else {
    console.warn("Trailer fetch butonu tapılmadı.");
  }
};

// Helper function defined outside try/catch for React Compiler compatibility
const extractMovieTime = (runtimeStr: string): number => {
  const match = runtimeStr.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};
