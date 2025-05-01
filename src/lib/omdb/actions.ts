"use server";
export async function getOMDB_Data(imdbID: string) {
  const OMDB_API_KEY = process.env.OMDB_API_KEY;
  const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`);
  return await response.json();
}
