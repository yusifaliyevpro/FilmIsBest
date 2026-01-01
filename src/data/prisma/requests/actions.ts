"use server";

import { err, ok } from "@/lib/action-helpers";
import { auth } from "@/lib/auth";
import { AdminEmail } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { MovieRequestFormData, movieRequestSchema } from "@/lib/validation";

type ActionState = {
  success: boolean;
  data: Partial<MovieRequestFormData>;
  errors?: Partial<Record<keyof MovieRequestFormData, string>>;
};

export async function submitMovieRequest(_: ActionState, formData: FormData): Promise<ActionState> {
  const formDataObject = Object.fromEntries(formData);
  const result = movieRequestSchema.safeParse(formDataObject);

  if (!result.success) {
    const errors: ActionState["errors"] = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof MovieRequestFormData;
      errors[field] = issue.message;
    }

    return { success: false, data: formDataObject, errors };
  }

  try {
    await prisma.movieRequests.create({ data: result.data });

    return { success: true, data: {} };
  } catch {
    return { success: false, data: {} };
  }
}

export async function removeMovieRequest(id: string) {
  const session = await auth();
  if (!session || session.user?.email !== AdminEmail)
    return err("You are not authorized to delete movie request!");

  try {
    await prisma?.movieRequests.delete({ where: { id }, select: { id: true } });
    return ok();
  } catch {
    return err("Failed to delete movie request!");
  }
}

export async function updateMovieRequest(id: string, isAdded: boolean) {
  const session = await auth();
  if (!session || session.user?.email !== AdminEmail)
    return err("You are not authorized to update movie request!");

  try {
    await prisma.movieRequests.update({ where: { id }, data: { isAdded } });
    return ok();
  } catch {
    return err("Failed to update movie request!");
  }
}
