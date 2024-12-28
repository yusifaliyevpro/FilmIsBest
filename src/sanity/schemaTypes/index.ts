import { type SchemaTypeDefinition } from "sanity";
import sequelSchema from "@/sanity/sequel";
import movieSchema from "@/sanity/movie";
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [movieSchema, sequelSchema],
};
