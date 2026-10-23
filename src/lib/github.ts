import "server-only";

/**
 * Real star count for a public repository, fetched once at build time so the
 * header stays static. Returns null on any failure: the link still renders,
 * just without a number. Never returns a made-up value.
 */
export async function getGithubStars(repo: string): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
      cache: "force-cache",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: unknown };
    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

export function formatStars(count: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 })
    .format(count)
    .toLowerCase();
}
