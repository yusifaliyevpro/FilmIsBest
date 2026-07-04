import { createMcpHandler, withMcpAuth } from "mcp-handler";
import { z } from "zod";
import {
  MOVIE_FIELD_NAMES,
  MOVIE_GENRES,
  MOVIE_SORTS,
  countMoviesForMCP,
  getMovieDetailForMCP,
  getRecentlyAddedForMCP,
  listMoviesForMCP,
} from "@/data/sanity/movies/mcp";

const WATCHED_DISCLAIMER =
  "IMPORTANT: Every movie returned by this server is one the user has ALREADY WATCHED. " +
  "Use them as taste signal for recommendations; never recommend them back to the user.";

const FIELDS_DESCRIPTION =
  `Allowed values: ${MOVIE_FIELD_NAMES.join(", ")}. ` +
  "Request only the fields you actually need to keep responses small. " +
  "'actors' and 'directed' come back as string arrays. " +
  "Include 'slug' if you intend to drill into a movie with get_movie.";

const fieldsSchema = z.array(z.literal(MOVIE_FIELD_NAMES));

function errorResult(message: string) {
  return { content: [{ type: "text" as const, text: message }], isError: true };
}

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "list_movies",
      {
        title: "List watched movies",
        description:
          `Returns a list of movies the user has watched, filtered by the given criteria. ` +
          `By default it returns the entire catalogue (newest first) — narrow it with the ` +
          `filters and request only the fields you need via 'fields'. ${WATCHED_DISCLAIMER}`,
        inputSchema: {
          fields: fieldsSchema.min(1).describe(`REQUIRED. Which fields to return per movie. ${FIELDS_DESCRIPTION}`),
          series: z
            .boolean()
            .optional()
            .describe("If true, only return series; if false, only return movies; omit for both."),
          genres: z
            .array(z.literal(MOVIE_GENRES))
            .optional()
            .describe(
              `Match movies whose genre array contains at least one of these. Allowed: ${MOVIE_GENRES.join(", ")}.`,
            ),
          minImdbRating: z
            .number()
            .min(0)
            .max(10)
            .optional()
            .describe("Only include movies with imdbpuan >= this value."),
          fromYear: z.number().int().optional().describe("Only include movies with releaseDate >= this year."),
          toYear: z.number().int().optional().describe("Only include movies with releaseDate <= this year."),
          nameQuery: z.string().optional().describe("Case-insensitive prefix search on the movie title."),
          sort: z
            .literal(MOVIE_SORTS)
            .optional()
            .describe(
              "Sort order: 'recent' (newest added, default), 'rating' (highest imdbpuan first), 'year' (newest release first).",
            ),
          limit: z
            .number()
            .int()
            .min(1)
            .max(1000)
            .optional()
            .describe("Max results to return. Defaults to the whole catalogue (capped at 1000)."),
        },
      },
      async (args) => {
        try {
          const movies = await listMoviesForMCP(args);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({ count: movies.length, movies }, null, 2),
              },
            ],
          };
        } catch (err) {
          console.error("[mcp] list_movies failed:", err);
          return errorResult("Failed to fetch movies. Please try again.");
        }
      },
    );

    server.registerTool(
      "get_movie",
      {
        title: "Get movie details",
        description:
          `Returns details for a single watched movie by its slug (from list_movies). ` +
          `Defaults to all available fields; pass 'fields' to narrow it. ${WATCHED_DISCLAIMER}`,
        inputSchema: {
          slug: z.string().min(1).describe("The slug of the movie, as returned by list_movies."),
          fields: fieldsSchema
            .optional()
            .describe(`Optional. Which fields to return; omit for all. ${FIELDS_DESCRIPTION}`),
        },
      },
      async ({ slug, fields }) => {
        try {
          const movie = await getMovieDetailForMCP(slug, fields);
          if (!movie) {
            return errorResult(`No watched movie found with slug "${slug}".`);
          }
          return { content: [{ type: "text", text: JSON.stringify(movie, null, 2) }] };
        } catch (err) {
          console.error("[mcp] get_movie failed:", err);
          return errorResult("Failed to fetch movie details. Please try again.");
        }
      },
    );

    server.registerTool(
      "get_recently_added",
      {
        title: "Get recently added movies",
        description:
          `Returns the most recently added watched movies (newest first). ` +
          `Useful as a shortcut when the user asks for recs based on what they've watched lately. ${WATCHED_DISCLAIMER}`,
        inputSchema: {
          fields: fieldsSchema.min(1).describe(`REQUIRED. Which fields to return per movie. ${FIELDS_DESCRIPTION}`),
          limit: z
            .number()
            .int()
            .min(1)
            .max(100)
            .optional()
            .describe("Number of movies to return. Default 10, max 100."),
        },
      },
      async ({ fields, limit }) => {
        try {
          const movies = await getRecentlyAddedForMCP(fields, limit);
          return {
            content: [{ type: "text", text: JSON.stringify({ count: movies.length, movies }, null, 2) }],
          };
        } catch (err) {
          console.error("[mcp] get_recently_added failed:", err);
          return errorResult("Failed to fetch recently added movies. Please try again.");
        }
      },
    );

    server.registerTool(
      "count_movies",
      {
        title: "Count watched movies",
        description:
          `Returns only the number of watched movies matching the given filters ` +
          `(omit all filters for the total catalogue size). Use this instead of ` +
          `list_movies when you just need a count. ${WATCHED_DISCLAIMER}`,
        inputSchema: {
          series: z
            .boolean()
            .optional()
            .describe("If true, only count series; if false, only count movies; omit for both."),
          genres: z
            .array(z.literal(MOVIE_GENRES))
            .optional()
            .describe(
              `Count movies whose genre array contains at least one of these. Allowed: ${MOVIE_GENRES.join(", ")}.`,
            ),
          minImdbRating: z
            .number()
            .min(0)
            .max(10)
            .optional()
            .describe("Only count movies with imdbpuan >= this value."),
          fromYear: z.number().int().optional().describe("Only count movies with releaseDate >= this year."),
          toYear: z.number().int().optional().describe("Only count movies with releaseDate <= this year."),
          nameQuery: z.string().optional().describe("Case-insensitive prefix search on the movie title."),
        },
      },
      async (args) => {
        try {
          const count = await countMoviesForMCP(args);
          return { content: [{ type: "text", text: JSON.stringify({ count }, null, 2) }] };
        } catch (err) {
          console.error("[mcp] count_movies failed:", err);
          return errorResult("Failed to count movies. Please try again.");
        }
      },
    );
  },
  {
    serverInfo: {
      name: "filmisbest-mcp",
      version: "1.0.0",
    },
  },
  {
    basePath: "/api/mcp",
    maxDuration: 60,
    verboseLogs: false,
  },
);

const authHandler = withMcpAuth(
  handler,
  (req, token) => {
    const expected = process.env.MCP_AUTH_TOKEN;
    if (!expected || token !== expected) return undefined;
    return { token, scopes: [], clientId: "owner" };
  },
  { required: true },
);

export { authHandler as GET, authHandler as POST };
