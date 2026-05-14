export const BASE_URL = process.env.NODE_ENV === "production" ? "https://filmisbest.vercel.app" : "http://localhost:3000";
export const isInDevelopment = process.env.NODE_ENV === "development";
