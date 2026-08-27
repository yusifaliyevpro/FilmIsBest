import * as z from "zod/mini";

export const clientEnvSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().check(z.trim(), z.minLength(3)),
  NEXT_PUBLIC_SANITY_DATASET: z.string().check(z.trim(), z.minLength(3)),
});

clientEnvSchema.parse({
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
});
