import CustomCheckboxGrid from "./CustomCheckboxGrid";

export default {
  name: "Movie-studio",
  title: "Movies",
  type: "document",
  fields: [
    {
      name: "filmName",
      title: "Movie Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (rule) => rule.required(),
      options: {
        source: "filmName",
        maxLength: 50,
      },
    },
    {
      name: "imdbID",
      title: "Imdb ID",
      type: "string",
    },
    {
      title: "Poster",
      name: "poster",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "movieTime",
      title: "Movie Time",
      type: "number",
    },
    {
      name: "imdbpuan",
      title: "IMDb Rate",
      type: "number",
      validation: (rule) => rule.min(0).max(10).precision(1),
    },
    {
      name: "releaseDate",
      title: "Release Date",
      type: "number",
      validation: (rule) => rule.min(1895).max(new Date().getFullYear()),
    },
    {
      name: "directed",
      title: "Director",
      type: "string",
    },
    {
      name: "actors",
      title: "Actors",
      type: "string",
    },
    {
      name: "genre",
      title: "Genre",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Aksiyon", value: "Action" },
          { title: "Macəra", value: "Adventure" },
          { title: "Dram", value: "Drama" },
          { title: "Triller", value: "Thriller" },
          { title: "Animasiya", value: "Animation" },
          { title: "Komediya", value: "Comedy" },
          { title: "Ailə", value: "Family" },
          { title: "Sci-Fi", value: "Sci-Fi" },
          { title: "Fantaziya", value: "Fantasy" },
          { title: "Qorxu", value: "Horror" },
          { title: "Sirli", value: "Mystery" },
          { title: "Belgesel", value: "Documentary" },
          { title: "Müharibə", value: "War" },
          { title: "Cinayət", value: "Crime" },
          { title: "Tarixi", value: "Historical" },
        ],
        layout: "grid",
      },
    },
    {
      name: "country",
      title: "Country",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      title: "Has an English version?",
      name: "EnglishLink",
      type: "boolean",
      initialValue: true,
    },
    {
      title: "Has an English subtitle version?",
      name: "EnglishSubtitleLink",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "TurkishLink",
      title: "Turkish Link",
      type: "string",
      initialValue: "Empty",
    },
    {
      name: "TurkishSubtitleLink",
      title: "Turkish Subtitle Link",
      type: "string",
      initialValue: "Empty",
    },
    {
      name: "FraqmanLink",
      title: "Fraqman Link",
      type: "string",
      initialValue: "Empty",
    },
  ],
};
