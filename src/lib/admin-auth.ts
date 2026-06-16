import { headers } from "next/headers";
import { auth } from "./auth";

export async function getAdminSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;
  if (session.user.role !== "admin") return null;

  return { ...session, isAdmin: true };
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}
