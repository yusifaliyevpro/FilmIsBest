"use client";

import { apiVersion } from "../env";
import { getOMDBDataById } from "@/data-access/omdb/get";
import { Button } from "@heroui/button";
import { useState } from "react";
import { useFormValue, useClient } from "sanity";

export function GetMovieData() {
  const imdbID = useFormValue(["imdbID"]) as string | undefined;
  const documentId = useFormValue(["_id"]) as string;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const client = useClient({ apiVersion: apiVersion });

  const fetchFilmData = async () => {
    if (!imdbID) {
      alert("IMDb ID alanı boş!");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const OMDbMovie = await getOMDBDataById(imdbID);

      if (OMDbMovie.Response === "False") {
        throw new Error("Couldn't find the movie!");
      }

      const genreList = (OMDbMovie.Genre as string).split(", ").map((genre: string) => genre.trim());
      const validGenres = genreList.filter((genre: string) => availableGenres.includes(genre));
      const filmData = {
        title: OMDbMovie.Title.trim(),
        rating: parseFloat(OMDbMovie.imdbRating),
        stars: OMDbMovie.Actors.split(", ").slice(0, 3).join(" ! ").trim(),
        country: OMDbMovie.Country.trim(),
        director: OMDbMovie.Director.split(", ").join(" ! ").trim(),
        year: Number(OMDbMovie.Year),
        time: parseInt(OMDbMovie.Runtime.match(/\d+/)?.[0] || "0", 10),
        genres: validGenres,
      };

      await client
        .patch(documentId)
        .set({
          filmName: filmData.title,
          imdbpuan: filmData.rating,
          actors: filmData.stars,
          country: filmData.country,
          directed: filmData.director,
          releaseDate: filmData.year,
          movieTime: filmData.time,
          genre: filmData.genres,
        })
        .setIfMissing({ description: "" })
        .commit();
    } catch (error) {
      console.error(error);
      if (error instanceof Error) setError(error.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative my-0 flex w-full flex-row justify-end">
      <div className="gap-y-2y flex flex-col">
        <Button className="font-bold" color="primary" isDisabled={loading} onPress={fetchFilmData}>
          {loading ? "Loading..." : "Get Movie Data"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
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
