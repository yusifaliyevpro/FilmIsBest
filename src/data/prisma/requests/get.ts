"use server";

import { err, ok } from "@/lib/action-helpers";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function getAllMovieRequests() {
  try {
    await requireAdmin();
    const requests = await prisma.movieRequests.findMany();

    return ok(requests);
  } catch {
    return err("Failed to fetch movie requests!");
  }
}
