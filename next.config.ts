import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages is opt-in: the deploy workflow sets
 * GITHUB_PAGES=true and NEXT_PUBLIC_BASE_PATH (e.g. "/fmui" for a project site,
 * or "" when a custom domain points at the site). Local dev and `next build`
 * without these variables behave exactly as before.
 */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

// Every page is generated at build time (no Cache Components), which is what
// static export for GitHub Pages requires.
const nextConfig: NextConfig = {
  ...(isGithubPages && { output: "export" as const, trailingSlash: true }),
  basePath,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
