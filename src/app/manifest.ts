import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FilmIsBest",
    short_name: "FilmIsBest",
    description: "FilmIsBest is a Movie App that you can watch and share movies with your friends",
    start_url: "/en",
    display: "standalone",
    background_color: "#222831",
    theme_color: "#007bff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
