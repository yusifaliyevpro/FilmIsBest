import { z } from "zod";

export const movieSuggestionSchema = z.object({
  fullName: z.string().trim(),
  email: z.string().trim().email(),
  movieName: z.string().trim().min(1),
});

export type MovieSuggestionFormData = z.infer<typeof movieSuggestionSchema>;
