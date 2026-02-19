import { type SchemaTypeDefinition } from "sanity";
import movieSchema from "./movie";
import sequelSchema from "./sequel";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [movieSchema, sequelSchema],
};
