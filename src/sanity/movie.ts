import { defineArrayMember, defineField } from "sanity";
import GenerateDescription from "./components/ChatGPT";
import SearchOnYoutube from "./components/SearchOnYoutube";
import SearchPoster from "./components/SearchPoster";

const movieSchema = {
  name: "Movie-studio",
  title: "Movies",
  type: "document",
  fields: [
    defineField({
      name: "filmName",
      title: "Movie Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (rule) => rule.required(),
      options: {
        source: "filmName",
        maxLength: 50,
      },
    }),
    defineField({
      name: "imdbID",
      title: "Imdb ID",
      type: "string",
    }),
    defineField({
      title: "Poster",
      name: "poster",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "posterSearch",
      title: "Search Poster",
      type: "string",
      components: {
        field: SearchPoster,
      },
    }),
    defineField({
      name: "movieTime",
      title: "Movie Time",
      type: "number",
    }),
    defineField({
      name: "imdbpuan",
      title: "IMDb Rate",
      type: "number",
      validation: (rule) => rule.min(0).max(10).precision(1),
    }),
    defineField({
      name: "releaseDate",
      title: "Release Date",
      type: "number",
      validation: (rule) => rule.min(1895).max(new Date().getFullYear()),
    }),
    defineField({
      name: "directed",
      title: "Director",
      type: "string",
    }),
    defineField({
      name: "actors",
      title: "Actors",
      type: "string",
    }),
    defineField({
      name: "genre",
      title: "Genre",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
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
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "generateDescription",
      title: "Generate Description",
      type: "string",
      components: {
        field: GenerateDescription,
      },
    }),
    defineField({
      title: "Has an English version?",
      name: "EnglishLink",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      title: "Has an English subtitle version?",
      name: "EnglishSubtitleLink",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "TurkishLink",
      title: "Turkish Link",
      type: "string",
      initialValue: "Empty",
    }),
    defineField({
      name: "TurkishSubtitleLink",
      title: "Turkish Subtitle Link",
      type: "string",
      initialValue: "Empty",
    }),
    defineField({
      name: "FraqmanLink",
      title: "Fraqman Link",
      type: "string",
      initialValue: "Empty",
    }),
    defineField({
      name: "youtubeSearchLink",
      title: "YouTube Search Link",
      type: "string",
      components: {
        field: SearchOnYoutube,
      },
    }),
  ],
};

export default movieSchema;
