import { allComponents, getComponent } from "@/lib/component-catalog";
import { categoryById } from "@/data/categories";
import { renderOgImage } from "@/lib/og";

// One social preview per component, exported as /components/<slug>/og.png.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return allComponents.map((c) => ({ slug: c.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getComponent(slug);
  if (!c) return new Response("Not found", { status: 404 });
  const status = c.status === "coming-soon" ? "Coming soon" : c.status === "preview" ? "Preview" : "React component";
  return renderOgImage({
    eyebrow: `${categoryById[c.category].name} · ${status}`,
    title: c.name,
    description: c.description,
    footer: `fmui.dev/components/${c.slug}`,
  });
}
