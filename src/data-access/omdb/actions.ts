"use server";

import { auth, signIn } from "@/lib/auth";

export async function getOMDBDataById(imdbID: string) {
  const session = await auth();
  if (!session || session.user?.email !== "yusifaliyevpro@gmail.com") await signIn("github");
  const OMDB_API_KEY = process.env.OMDB_API_KEY;
  const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`);
  return await response.json();
}
