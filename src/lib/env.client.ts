import z from "zod";

export const clientEnvSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(3),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(3),
});

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
});
