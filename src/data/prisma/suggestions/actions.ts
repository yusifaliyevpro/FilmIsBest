"use server";

import { err, ok } from "@/lib/action-helpers";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { MovieSuggestionFormData, movieSuggestionSchema } from "@/lib/validation";

export type ActionState = {
  success: boolean;
  data: Partial<MovieSuggestionFormData>;
  errors?: Partial<Record<keyof MovieSuggestionFormData, string>>;
};

export async function submitMovieSuggestion(_: ActionState, formData: FormData): Promise<ActionState> {
  const formDataObject = Object.fromEntries(formData);
  const result = movieSuggestionSchema.safeParse(formDataObject);

  if (!result.success) {
    const errors: ActionState["errors"] = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof MovieSuggestionFormData;
      errors[field] = issue.message;
    }

    return { success: false, data: formDataObject, errors };
  }

  try {
    await prisma.movieSuggestions.create({ data: result.data });

    return { success: true, data: {} };
  } catch {
    return { success: false, data: {} };
  }
}

export async function removeMovieSuggestion(id: string) {
  await requireAdmin();

  try {
    await prisma.movieSuggestions.delete({ where: { id }, select: { id: true } });
    return ok();
  } catch {
    return err("Failed to delete movie suggestion!");
  }
}

export async function updateMovieSuggestion(id: string, isAdded: boolean) {
  await requireAdmin();

  try {
    await prisma.movieSuggestions.update({ where: { id }, data: { isAdded } });
    return ok();
  } catch {
    return err("Failed to update movie suggestion!");
  }
}
