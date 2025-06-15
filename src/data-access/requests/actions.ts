"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MovieRequestData } from "@/lib/useForm";

export async function createMovieRequest(data: Pick<MovieRequestData, "fullName" | "movieName" | "email">) {
  const request = await prisma?.movieRequests.create({ data });
  return { data: request };
}

export async function removeMovieRequest(id: string) {
  const session = await auth();
  if (!session || session.user?.email !== "yusifaliyevpro@gmail.com")
    return { error: "You are not authorized to remove movie request!" };

  const data = await prisma?.movieRequests.delete({ where: { id } });
  return { data };
}

export async function updateMovieRequest(id: string, isAdded: boolean) {
  const session = await auth();
  if (!session || session.user?.email !== "yusifaliyevpro@gmail.com")
    return { error: "You are not authorized to update movie request!" };

  const data = await prisma?.movieRequests.update({ where: { id }, data: { isAdded } });
  return { data };
}

export async function getAllMovieRequests() {
  const session = await auth();
  if (!session || session.user?.email !== "yusifaliyevpro@gmail.com")
    return { error: "You are not authorized to see movie requests!" };
  const requests = await prisma.movieRequests.findMany();

  return { requests };
}
