"use server";

import prisma from "./prisma";

export async function getOMDB_Data(imdbID: string) {
  const OMDB_API_KEY = process.env.OMDB_API_KEY;
  const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`);
  return await response.json();
}

export async function newMovieRequest(fullName: string, email: string, added: boolean, movieName: string, createdAt?: Date) {
  try {
    const res = await prisma?.movieRequests.create({
      data: { fullName, email, added, movieName, createdAt },
    });
    return { res };
  } catch (e) {
    return { e };
  }
}

export async function removeMovieRequest(id: string) {
  try {
    const res = await prisma?.movieRequests.delete({
      where: { id },
    });
    return { res };
  } catch (e) {
    return { e };
  }
}

export async function updateMovieRequest(id: string, added: boolean) {
  try {
    const res = await prisma?.movieRequests.update({
      where: { id },
      data: { added },
    });
    return { res };
  } catch (e) {
    return { e };
  }
}
