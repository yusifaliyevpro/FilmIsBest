import movieSchema from "./movie";
import sequelSchema from "./sequel";
import { type SchemaTypeDefinition } from "sanity";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [movieSchema, sequelSchema],
};
