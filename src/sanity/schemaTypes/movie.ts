import { BiSolidMovie } from "react-icons/bi";
import { defineArrayMember, defineField } from "sanity";
import { GENRE_LIST } from "@/lib/genres";
import { GenerateDescriptionComponent } from "../components/GenerateDescription";
import { GetMovieDataFromOMDB } from "../components/GetMovieDataFromOMDB";
import { SearchOnYoutube } from "../components/SearchOnYoutube";
import { SearchPoster } from "../components/SearchPoster";

const movieSchema = defineField({
  name: "Movie-studio",
  title: "Movies",
  type: "document",
  icon: BiSolidMovie,
  preview: { select: { title: "filmName", media: "poster" } },
  fields: [
    defineField({
      name: "imdbID",
      title: "Imdb ID",
      type: "string",
      validation: (rule) => rule.required(),
      components: { input: GetMovieDataFromOMDB },
    }),
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
      name: "series",
      title: "Series?",
      type: "boolean",
      initialValue: false,
      options: { layout: "switch" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "movieTime",
      title: "Movie Time",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imdbpuan",
      title: "IMDb Rate",
      type: "number",
      validation: (rule) => rule.min(0).max(10).precision(1).required(),
    }),
    defineField({
      name: "releaseDate",
      title: "Release Date",
      type: "number",
      validation: (rule) => rule.min(1895).max(new Date().getFullYear()).required(),
    }),
    defineField({
      name: "directed",
      title: "Director",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1),
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "actors",
      title: "Actors",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1),
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "genre",
      title: "Genre",
      type: "array",
      validation: (rule) => rule.required(),
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [...GENRE_LIST],
        layout: "grid",
      },
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: "Poster",
      name: "poster",
      type: "image",
      validation: (rule) => rule.assetRequired().required(),
      options: {
        hotspot: true,
      },
      components: { field: SearchPoster },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
      components: {
        input: GenerateDescriptionComponent,
      },
    }),
    defineField({
      name: "FraqmanLink",
      title: "Fraqman Link",
      type: "string",
      initialValue: "Empty",
      validation: (rule) => rule.required(),
      components: { input: SearchOnYoutube },
    }),
  ],
});

export default movieSchema;
