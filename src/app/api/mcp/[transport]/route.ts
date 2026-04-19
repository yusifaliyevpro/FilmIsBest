import { createMcpHandler, withMcpAuth } from "mcp-handler";
import { z } from "zod";
import { getMovieDetailForMCP, getRecentlyAddedForMCP, listMoviesForMCP } from "@/data/sanity/movies/mcp";

const WATCHED_DISCLAIMER =
  "IMPORTANT: Every movie returned by this server is one the user has ALREADY WATCHED. " +
  "Use them as taste signal for recommendations; never recommend them back to the user.";

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "list_movies",
      {
        title: "List watched movies",
        description:
          `Returns a compact list of movies the user has watched, filtered by the given criteria. ` +
          `Fields returned per movie: filmName, slug, imdbID, imdbpuan (IMDB rating 0-10), ` +
          `releaseDate (year), genre[], directed, movieTime (minutes). ${WATCHED_DISCLAIMER}`,
        inputSchema: {
          genres: z
            .array(z.string())
            .optional()
            .describe("Match movies whose genre array contains at least one of these, e.g. ['Drama','Sci-Fi']."),
          minImdbRating: z
            .number()
            .min(0)
            .max(10)
            .optional()
            .describe("Only include movies with imdbpuan >= this value."),
          fromYear: z.number().int().optional().describe("Only include movies with releaseDate >= this year."),
          toYear: z.number().int().optional().describe("Only include movies with releaseDate <= this year."),
          nameQuery: z.string().optional().describe("Case-insensitive prefix search on the movie title."),
          limit: z.number().int().min(1).max(500).optional().describe("Max results to return. Default 50, max 500."),
        },
      },
      async (args) => {
        const movies = await listMoviesForMCP(args);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ count: movies.length, movies }, null, 2),
            },
          ],
        };
      },
    );

    server.registerTool(
      "get_movie",
      {
        title: "Get movie details",
        description:
          `Returns full details for a single watched movie by its slug (from list_movies). ` +
          `Includes description, actors, country, directed, genre, and runtime. ${WATCHED_DISCLAIMER}`,
        inputSchema: {
          slug: z.string().min(1).describe("The slug of the movie, as returned by list_movies."),
        },
      },
      async ({ slug }) => {
        const movie = await getMovieDetailForMCP(slug);
        if (!movie) {
          return {
            content: [{ type: "text", text: `No watched movie found with slug "${slug}".` }],
            isError: true,
          };
        }
        return { content: [{ type: "text", text: JSON.stringify(movie, null, 2) }] };
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
          limit: z.number().int().min(1).max(50).optional().describe("Number of movies to return. Default 10, max 50."),
        },
      },
      async ({ limit }) => {
        const movies = await getRecentlyAddedForMCP(limit);
        return {
          content: [{ type: "text", text: JSON.stringify({ count: movies.length, movies }, null, 2) }],
        };
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
