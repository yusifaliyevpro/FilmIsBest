import * as z from "zod/mini";
import { clientEnvSchema } from "./env.client";

const serverEnvSchema = z.object({
  ...clientEnvSchema.shape,
  DATABASE_URL: z.string().check(z.trim(), z.minLength(3)),
  DIRECT_URL: z.optional(z.string().check(z.trim(), z.minLength(3))),
  BETTER_AUTH_SECRET: z.string().check(z.trim(), z.minLength(3)),
  BETTER_AUTH_URL: z.string().check(z.trim(), z.minLength(3)),
  GITHUB_CLIENT_ID: z.string().check(z.trim(), z.minLength(3)),
  GITHUB_CLIENT_SECRET: z.string().check(z.trim(), z.minLength(3)),
  OMDB_API_KEY: z.string().check(z.trim(), z.minLength(3)),
  OPENROUTER_API_KEY: z.string().check(z.trim(), z.minLength(3)),
  MCP_AUTH_TOKEN: z.string().check(z.trim(), z.minLength(3)),
  TMDB_API_KEY: z.string().check(z.trim(), z.minLength(3)),
  SANITY_REVALIDATE_SECRET: z.string().check(z.trim(), z.minLength(3)),
});

type ServerEnv = z.infer<typeof serverEnvSchema>;

export const serverEnv = serverEnvSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ServerEnv {}
  }
}
