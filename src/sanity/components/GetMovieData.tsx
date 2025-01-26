import { Button } from "@nextui-org/react";
import { useFormValue, useClient } from "sanity";
import { useState } from "react";
import { apiVersion } from "../env";
import { availableGenres } from "../lib/client";
import { OMDB_API_KEY } from "@/lib/constants";

type OMDbData = {
  title: string;
  rating: number;
  stars: string[];
  country: string;
  director: string;
  year: number;
  time: number;
  genres: string[];
};

export default function GetMovieData() {
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
      const response = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`,
      );
      if (!response.ok) throw new Error("OMDb API'den veri alınamadı!");

      const data = await response.json();
      if (data.Response === "False") {
        throw new Error(data.Error || "Film bulunamadı!");
      }
      const genreList = (data.Genre as string)
        .split(", ")
        .map((genre: string) => genre.trim());
      const validGenres = genreList.filter((genre: string) =>
        availableGenres.includes(genre),
      );
      const filmData: OMDbData = {
        title: data.Title.trim(),
        rating: parseFloat(data.imdbRating),
        stars: data.Actors.split(", ").slice(0, 3).join(" ! ").trim(),
        country: data.Country.trim(),
        director: data.Director.split(", ").join(" ! ").trim(),
        year: Number(data.Year),
        time: parseInt(data.Runtime.match(/\d+/)?.[0] || "0", 10),
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
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative my-0 flex w-full flex-row justify-end">
      <div className="gap-y-2y flex flex-col">
        <Button
          color="primary"
          onPress={fetchFilmData}
          className="font-bold"
          isDisabled={loading}
        >
          {loading ? "Yükleniyor..." : "Get Movie Data"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
