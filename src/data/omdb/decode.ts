/**
 * OMDb HTML-encodes text fields (e.g. `Auli&apos;i Cravalho`, `Tom &amp; Jerry`).
 * These helpers decode those entities so we store clean, human-readable values.
 */

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  apos: "'",
  quot: '"',
  lt: "<",
  gt: ">",
  nbsp: " ",
};

/** Decodes named (`&amp;`) and numeric (`&#39;`, `&#x27;`) HTML entities. */
export function decodeHtmlEntities(input: string): string {
  return input.replace(/&(#x?[0-9a-f]+|[a-z0-9]+);/gi, (match, code: string) => {
    if (code[0] === "#") {
      const num =
        code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(num) ? String.fromCodePoint(num) : match;
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? match;
  });
}

/** Returns a shallow copy of an OMDb record with all top-level strings decoded. */
export function decodeOMDbStrings<T extends Record<string, unknown>>(data: T): T {
  const out: Record<string, unknown> = { ...data };
  for (const [key, value] of Object.entries(out)) {
    if (typeof value === "string") out[key] = decodeHtmlEntities(value);
  }
  return out as T;
}
