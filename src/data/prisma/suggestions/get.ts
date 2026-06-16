"use server";

import { err, ok } from "@/lib/action-helpers";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function getAllMovieSuggestions() {
  try {
    await requireAdmin();
    const suggestions = await prisma.movieSuggestions.findMany();

    return ok(suggestions);
  } catch {
    return err("Failed to fetch movie suggestions!");
  }
}
