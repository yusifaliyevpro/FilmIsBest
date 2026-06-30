import { parseAsInteger } from "nuqs";

export const searchParams = {
  p: parseAsInteger.withDefault(1),
};
