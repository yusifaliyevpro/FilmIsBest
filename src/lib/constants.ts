export const BASE_URL =
  process.env.NODE_ENV === "production" ? "https://filmisbest.com" : "http://localhost:3000";
export const isInDevelopment = process.env.NODE_ENV === "development";
export const AdminEmail = process.env.ADMIN_EMAIL;
