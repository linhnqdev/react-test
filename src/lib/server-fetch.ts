type ServerFetchOptions = {
  /** revalidate in seconds (Next.js cache) */
  revalidate?: number;
} & RequestInit;

async function readPublicJson<T>(path: string): Promise<T> {
  const fs = await import("node:fs/promises");
  const nodePath = await import("node:path");

  // path like "/jsons/foo.json" -> "<cwd>/public/jsons/foo.json"
  const filePath = nodePath.join(process.cwd(), "public", path.replace(/^\//, ""));
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

/**
 * Generic server-side JSON fetch helper.
 * - Handles base URL
 * - Integrates with Next.js caching via `next.revalidate`
 * - Throws on non-2xx responses with a readable error
 */
export async function serverFetchJson<T>(path: string, options: ServerFetchOptions = {}): Promise<T> {
  const { revalidate, ...init } = options;

  const isAbsolute = path.startsWith("http://") || path.startsWith("https://");

  // During build/prerender, we can't rely on a running HTTP server.
  // For local mock assets under /public/jsons, read them directly from disk.
  if (!isAbsolute && path.startsWith("/jsons/")) {
    return readPublicJson<T>(path);
  }

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

