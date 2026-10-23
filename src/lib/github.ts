import "server-only";
import { cacheLife } from "next/cache";

/**
 * Real star count for a public repository, cached for an hour so the header
 * stays part of the static shell. Returns null on any failure: the link still
 * renders, just without a number. Never returns a made-up value.
 */
export async function getGithubStars(repo: string): Promise<number | null> {
  "use cache";
  cacheLife("hours");
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
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
