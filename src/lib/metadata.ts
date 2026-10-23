export const siteConfig = {
  name: "FMUI",
  title: "FMUI — Free Modern UI Components",
  description:
    "A thoughtfully crafted collection of 50 free React components for modern interfaces. Copy, customize, and own the code.",
  url: "https://fmui.dev",
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

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
