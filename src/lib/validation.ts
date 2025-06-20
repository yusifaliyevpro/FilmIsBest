import { z } from "zod";

export const movieRequestSchema = z.object({
  fullName: z.string().trim(),
  email: z.string().trim().email(),
  movieName: z.string().trim().min(1),
});

export type MovieRequestFormData = z.infer<typeof movieRequestSchema>;
