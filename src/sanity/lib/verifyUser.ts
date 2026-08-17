import { projectId } from "../env";

export async function isSanityProjectMember(token: string | undefined): Promise<boolean> {
  if (!token) return false;

  try {
    const res = await fetch(`https://${projectId}.api.sanity.io/v2021-06-07/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) return false;

    const user: { id?: string; role?: string } | null = await res.json();
    return Boolean(user?.id);
  } catch {
    return false;
  }
}
