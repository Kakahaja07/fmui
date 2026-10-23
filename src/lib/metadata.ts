export const siteConfig = {
  name: "FMUI",
  /** Homepage and default title: under 60 characters, keyword first, brand last. */
  title: "Free Shadcn UI Components for React & Tailwind CSS | FMUI",
  description:
    "Free, open-source shadcn-compatible React components built with Tailwind CSS v4 and TypeScript. Live demos, copyable source, and docs. MIT licensed.",
  /** Public origin plus any base path, set per deployment (e.g. https://kakahaja07.github.io/fmui). */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://fmui.dev")
    .replace(/\/+$/, "")
    // GitHub Pages reports http:// until "Enforce HTTPS" is on; canonical URLs should always be https.
    .replace(/^http:\/\/(?!localhost|127\.0\.0\.1)/, "https://"),
  /** Public GitHub repository as "owner/name". Drives the header link, live star count, and hero CTA. */
  githubRepo: "Kakahaja07/fmui" as string | null,
  author: {
    name: "Prashant Sharma",
    handle: "@Prsnt50",
    x: "https://x.com/Prsnt50",
  },
  /** Set when a community channel exists. Hidden until then. */
  discord: null as string | null,
} as const;

/**
 * Joins the site URL and a path without dropping a base path like /fmui.
 * The GitHub Pages export uses trailing slashes, so page URLs get one there to
 * match the served URLs exactly (no redirect for crawlers).
 */
export function absoluteUrl(path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `${siteConfig.url}/`;
  const isFile = /\.[a-z0-9]+$/i.test(clean);
  const slash = process.env.GITHUB_PAGES === "true" && !isFile && !clean.endsWith("/") ? "/" : "";
  return `${siteConfig.url}${clean}${slash}`;
}
