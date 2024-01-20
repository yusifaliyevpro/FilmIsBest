import React from "react";
import Movies from "../components/movies";

export const metadata = {
  title: "FilmIsBest | Filmlər",
};

export default async function MoviesPage() {
  return (
    <main className="justify-content-center relative mb-20 mt-6 flex items-center justify-center">
      <Movies />
    </main>
  );
}
