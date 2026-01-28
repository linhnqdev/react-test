type ServerFetchOptions = {
  /** revalidate in seconds (Next.js cache) */
  revalidate?: number;
} & RequestInit;

/**
 * Generic server-side JSON fetch helper.
 * - Handles base URL
 * - Integrates with Next.js caching via `next.revalidate`
 * - Throws on non-2xx responses with a readable error
 */
export async function serverFetchJson<T>(path: string, options: ServerFetchOptions = {}): Promise<T> {
  const { revalidate, ...init } = options;

  const isAbsolute = path.startsWith("http://") || path.startsWith("https://");
  const base = isAbsolute ? "" : (await import("./env")).env.appUrl;
  const url = `${base}${path}`;

  const res = await fetch(url, {
    ...init,
    next: revalidate !== undefined ? { revalidate } : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Server fetch failed: ${res.status} ${res.statusText} ${text}`);
  }

  return res.json() as Promise<T>;
}

