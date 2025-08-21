"use client";

import { apiVersion } from "../env";
import { getOMDBDataById } from "@/data-access/omdb/get";
import { Spinner } from "@sanity/ui";
import { useState, startTransition } from "react";
import { BiSearch } from "react-icons/bi";
import { InputProps, useClient, useFormValue } from "sanity";

export function GetMovieDataFromOMDB(props: InputProps) {
  const { value, renderDefault } = props;
  const client = useClient({ apiVersion: apiVersion });
  const [loading, setLoading] = useState(false);
  const documentId = useFormValue(["_id"]) as string;

  const handleFetch = async () => {
    const imdbID = value as string | undefined;

    if (!imdbID) {
      alert("IMDb ID boşdur!");
      return;
    }

    setLoading(true);

    try {
      const OMDbMovie = await getOMDBDataById(imdbID);

      if (OMDbMovie.Response === "False") {
        alert("Film tapılmadı!");
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
    } catch (err) {
      console.error(err);
      alert("Xəta baş verdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Default input rendering (IMDB ID input field) */}
      {renderDefault(props)}

      {/* IMDB button (small, title area) */}
      <button
        type="button"
        onClick={() => {
          startTransition(handleFetch);
        }}
        disabled={loading}
        className="absolute top-0 right-0 z-[2000] flex h-[98%] w-10 cursor-pointer items-center justify-center rounded transition hover:bg-gray-700"
        title="IMDb-dan al"
      >
        {loading ? <Spinner size={1} /> : <BiSearch size={18} />}
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
