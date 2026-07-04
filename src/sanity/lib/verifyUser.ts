import "server-only";
import { projectId } from "../env";

/**
 * Verifies that the given personal token belongs to a member of this Sanity
 * project. The Studio configures its client with the logged-in user's personal
 * token, so a valid token here means the caller is authenticated in our Studio.
 *
 * The project-scoped `users/me` endpoint returns the current user (including
 * their role in this project) and responds with 401 if the token is invalid or
 * the user isn't a member of the project.
 */
export async function isSanityProjectMember(token: string | undefined): Promise<boolean> {
  if (!token) return false;

  try {
    const res = await fetch(`https://${projectId}.api.sanity.io/v2021-06-07/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) return false;

    const user = (await res.json()) as { id?: string; role?: string } | null;
    return Boolean(user?.id);
  } catch {
    return false;
  }
}
