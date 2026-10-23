import { siteConfig } from "@/lib/metadata";
import { renderOgImage } from "@/lib/og";

// Exported as /og.png so static hosts serve it with an image/png content type.
export const dynamic = "force-static";

export function GET() {
  return renderOgImage({
    eyebrow: "Open source",
    title: "Free Shadcn UI Components for React",
    description: siteConfig.description,
  });
}
