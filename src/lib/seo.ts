import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/metadata";

interface PageSeo {
  /** Page title. Gets " | FMUI" appended unless `absoluteTitle` is set. */
  title: string;
  /** 140-160 characters works best in search results. */
  description: string;
  /** Route path, e.g. "/components". */
  path: string;
  absoluteTitle?: boolean;
  noindex?: boolean;
  type?: "website" | "article";
  /** Social preview image path (a real .png). Defaults to the site-wide /og.png. */
  image?: { path: string; alt: string };
}

const defaultImage = { path: "/og.png", alt: "FMUI: free shadcn-compatible React components for Tailwind CSS" };

/**
 * One place that builds title, description, canonical, Open Graph, and Twitter
 * tags so every page stays consistent. Preview images are static .png files
 * (see app/og.png and app/components/[slug]/og.png).
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  noindex,
  type = "website",
  image = defaultImage,
}: PageSeo): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const ogImage = { url: absoluteUrl(image.path), width: 1200, height: 630, alt: image.alt, type: "image/png" };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: "en_US",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: siteConfig.author.handle,
      images: [ogImage],
    },
  };
}

export const authorLd = {
  "@type": "Person",
  name: siteConfig.author.name,
  url: siteConfig.author.x,
  sameAs: [siteConfig.author.x, ...(siteConfig.githubRepo ? [`https://github.com/${siteConfig.githubRepo.split("/")[0]}`] : [])],
};

/** Serializes JSON-LD safely for inline <script> tags. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
