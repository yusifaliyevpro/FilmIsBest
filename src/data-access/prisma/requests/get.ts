// No need to be server action
import { auth } from "@/lib/auth";
import { AdminEmail } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export async function getAllMovieRequests() {
  const session = await auth();
  if (!session || session.user?.email !== AdminEmail)
    return { error: "You are not authorized to see movie requests!" };
  const requests = await prisma.movieRequests.findMany();

  return { requests };
}
