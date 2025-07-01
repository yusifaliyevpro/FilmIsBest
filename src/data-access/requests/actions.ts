"use server";

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
  await prisma.movieRequests.create({ data: result.data });

  return { success: true, data: {} };
}

export async function removeMovieRequest(id: string) {
  const session = await auth();
  if (!session || session.user?.email !== AdminEmail) return { error: "You are not authorized to remove movie request!" };

  const data = await prisma?.movieRequests.delete({ where: { id } });
  return { data };
}

export async function updateMovieRequest(id: string, isAdded: boolean) {
  const session = await auth();
  if (!session || session.user?.email !== AdminEmail) return { error: "You are not authorized to update movie request!" };

  const data = await prisma?.movieRequests.update({ where: { id }, data: { isAdded } });
  return { data };
}

export async function getAllMovieRequests() {
  const session = await auth();
  if (!session || session.user?.email !== AdminEmail) return { error: "You are not authorized to see movie requests!" };
  const requests = await prisma.movieRequests.findMany();

  return { requests };
}
