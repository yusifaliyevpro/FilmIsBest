import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const CACHE_DIR = join(dirname(fileURLToPath(import.meta.url)), ".cache");

export type CachedResponse<T> = { ok: boolean; status: number; body: T };

export async function cachedFetchJson<T>(namespace: string, url: string): Promise<CachedResponse<T>> {
  const dir = join(CACHE_DIR, namespace);
  mkdirSync(dir, { recursive: true });
  const key = createHash("sha256").update(url).digest("hex");
  const file = join(dir, `${key}.json`);

  if (existsSync(file)) {
    const cached: CachedResponse<T> = JSON.parse(readFileSync(file, "utf8"));
    return cached;
  }

  const res = await fetch(url);
  try {
    const body: T = await res.json();
    const payload: CachedResponse<T> = { ok: res.ok, status: res.status, body };
    if (res.ok) writeFileSync(file, JSON.stringify(payload));
    return payload;
  } catch {
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    const body: T = null as T;
    return { ok: res.ok, status: res.status, body };
  }
}
