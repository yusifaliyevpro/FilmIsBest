"use server";

import { err, ok } from "@/lib/action-helpers";
import { auth } from "@/lib/auth";
import { AdminEmail } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export async function getAllMovieRequests() {
  const session = await auth();
  if (!session || session.user?.email !== AdminEmail)
    return err("You are not authorized to view movie requests!");
  try {
    const requests = await prisma.movieRequests.findMany();

    return ok(requests);
  } catch {
    return err("Failed to fetch movie requests!");
  }
}
