import type { Metadata } from "next";
import { siteConfig } from "@/lib/metadata";
import { authorLd, jsonLd, pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/hero";
import { ComponentShowcase } from "@/components/home/component-showcase";
import { FeaturedComponents } from "@/components/home/featured-components";
import { CategoryGrid } from "@/components/home/category-grid";
import { Features } from "@/components/home/features";
import { InstallPreview } from "@/components/home/install-preview";

export const metadata: Metadata = pageMetadata({
  title: siteConfig.title,
  absoluteTitle: true,
  description: siteConfig.description,
  path: "/",
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: `${siteConfig.url}/`,
      name: siteConfig.name,
      alternateName: "Free Modern UI",
      description: siteConfig.description,
      inLanguage: "en",
      publisher: authorLd,
    },
    ...(siteConfig.githubRepo
      ? [
          {
            "@type": "SoftwareSourceCode",
            name: "FMUI component library",
            description: siteConfig.description,
            codeRepository: `https://github.com/${siteConfig.githubRepo}`,
            programmingLanguage: ["TypeScript", "React"],
            runtimePlatform: "React",
            license: "https://opensource.org/licenses/MIT",
            isAccessibleForFree: true,
            author: authorLd,
          },
        ]
      : []),
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <Hero />
      <FeaturedComponents />
      <ComponentShowcase />
      <CategoryGrid />
      <Features />
      <InstallPreview />
    </>
  );
}
