import { parseAsInteger, parseAsString } from "nuqs";

export const searchParams = {
  q: parseAsString.withDefault(""),
  p: parseAsInteger.withDefault(1),
};
