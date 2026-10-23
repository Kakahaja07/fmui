import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  AccessIcon,
  ArrowRight01Icon,
  Clock01Icon,
  CodeSquareIcon,
  Download04Icon,
  InformationSquareIcon,
  Layers02Icon,
  Link04Icon,
  Settings02Icon,
  SourceCodeIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { allComponents, getComponent, getRelatedComponents, statusLabel } from "@/lib/component-catalog";
import { categoryById } from "@/data/categories";
import { componentDocs } from "@/content/components";
import { absoluteUrl, siteConfig } from "@/lib/metadata";
import { readSourceFiles } from "@/lib/source";
import { highlight } from "@/lib/highlight";
import { formatDate } from "@/lib/utils";
import { hasDemo } from "@/components/demos";
import { DocsSidebar } from "@/components/layout/docs-sidebar";
import { DocsToc, type TocItem } from "@/components/layout/docs-toc";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ComponentPreview } from "@/components/docs/component-preview";
import { CodeFrame, CodeViewer, CopyButton, FileLabel } from "@/components/docs/code-viewer";
import { InstallCommand } from "@/components/docs/install-command";
import { PropsTable } from "@/components/docs/props-table";
import { RelatedComponents } from "@/components/docs/related-components";
import { StatusBadge } from "@/components/gallery/status-badge";
import { AuthorCredit, AuthorXLink } from "@/components/layout/author-credit";
import { Button, ButtonArrow } from "@/components/ui/button";

export function generateStaticParams() {
  return allComponents.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/components/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const component = getComponent(slug);
  if (!component) return {};
  const soon = component.status === "coming-soon";
  return {
    title: `${component.name} - ${categoryById[component.category].name}`,
    description: component.description,
    alternates: { canonical: absoluteUrl(`/components/${slug}`) },
    robots: soon ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${component.name} | ${siteConfig.name}`,
      description: component.description,
      url: absoluteUrl(`/components/${slug}`),
      type: "article",
    },
  };
}

function Section({
  id,
  title,
  icon,
  children,
}: {
  id: string;
  title: string;
  icon: IconSvgElement;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="flex items-center gap-2.5 text-lg tracking-[-0.02em]">
        <span className="flex size-7 items-center justify-center rounded-[8px] border border-border bg-surface text-heading">
          <HugeiconsIcon icon={icon} size={15} strokeWidth={1.8} />
        </span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

const inlineCode = "rounded-[5px] border border-border bg-surface px-1 py-px font-mono text-[12px] text-heading";

export default async function ComponentPage({ params }: PageProps<"/components/[slug]">) {
  const { slug } = await params;
  const component = getComponent(slug);
  if (!component) notFound();

  const category = categoryById[component.category];
  const doc = componentDocs[slug];
  const implemented = component.status !== "coming-soon" && hasDemo(component.previewId) && !!doc;
  const related = getRelatedComponents(component);

  const sources = implemented ? await readSourceFiles(component.sourceFiles) : [];
  const tabs = await Promise.all(sources.map(async (s) => ({ ...s, html: await highlight(s.code, "tsx") })));
  const usageHtml = doc ? await highlight(doc.usage, "tsx") : "";

  const toc: TocItem[] = implemented
    ? [
        { id: "preview", label: "Preview" },
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "variants", label: "Variants" },
        { id: "props", label: "Props" },
        { id: "accessibility", label: "Accessibility" },
        { id: "source", label: "Source" },
        { id: "related", label: "Related" },
      ]
    : [
        { id: "status", label: "Status" },
        { id: "related", label: "Related" },
      ];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Components", item: absoluteUrl("/components") },
      { "@type": "ListItem", position: 3, name: component.name, item: absoluteUrl(`/components/${slug}`) },
    ],
  };

  return (
    <div className="container-site" data-frame="wide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="flex gap-6 xl:gap-8">
        <aside className="sticky top-(--header-height) hidden h-[calc(100vh-var(--header-height))] w-[240px] shrink-0 py-6 lg:block">
          <Suspense fallback={<div className="h-8 w-full animate-pulse rounded-[8px] bg-accent" />}>
            <DocsSidebar />
          </Suspense>
        </aside>

        <article className="min-w-0 flex-1 py-6">
          <div className="rounded-[18px] border border-border bg-surface shadow-xs outline outline-1 outline-offset-[3px] outline-border/60">
          <div className="-mx-px -mt-px rounded-[18px] border border-border bg-background px-5 py-7 sm:px-8 sm:py-9">
            <div className="flex items-center justify-between gap-3">
              <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1 text-[13px] text-muted-foreground">
                <Link href="/components" className="shrink-0 hover:text-heading">
                  Components
                </Link>
                <HugeiconsIcon icon={ArrowRight01Icon} size={12} strokeWidth={2} className="shrink-0" />
                <Link href={`/components?category=${category.id}`} className="shrink-0 hover:text-heading">
                  {category.name}
                </Link>
                <HugeiconsIcon icon={ArrowRight01Icon} size={12} strokeWidth={2} className="shrink-0" />
                <span className="truncate font-medium text-heading">{component.name}</span>
              </nav>
              <div className="lg:hidden">
                <MobileNav showComponents />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <h1 className="text-[32px] leading-[1.1] tracking-[-0.04em] md:text-[38px]">{component.name}</h1>
              <StatusBadge status={component.status} />
            </div>
            <p className="mt-2 text-[15.5px] leading-[1.6] text-muted-foreground md:text-base">{component.description}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
              {component.tags.map((t) => (
                <li key={t} className="rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {t}
                </li>
              ))}
            </ul>

            {implemented && component.previewId && doc ? (
              <div className="mt-8 flex flex-col gap-12">
                <section id="preview" className="scroll-mt-24">
                  <h2 className="sr-only">Preview</h2>
                  <ComponentPreview previewId={component.previewId} name={component.name} tabs={tabs} />
                </section>

                <Section id="installation" title="Installation" icon={Download04Icon}>
                  <p className="mb-4 text-sm leading-6 text-muted-foreground">
                    The CLI command below is illustrative until the registry endpoint ships. Until then, copy the
                    source from the Code tab into <code className={inlineCode}>components/fmui/</code>. Every component
                    expects Tailwind CSS v4, the <code className={inlineCode}>cn</code> helper (clsx + tailwind-merge),
                    and Hugeicons
                    {component.dependencies.length > 0 && <> plus {component.dependencies.join(", ")}</>}.
                  </p>
                  <InstallCommand registryItem={component.registryItem ?? slug} />
                  <div className="mt-3 flex items-center justify-between gap-3 rounded-[12px] border border-border bg-surface py-2 pl-3.5 pr-2 text-[13px]">
                    <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
                      <HugeiconsIcon icon={SourceCodeIcon} size={14} strokeWidth={1.8} className="shrink-0" />
                      <span className="truncate font-mono text-[12px] text-heading">{component.sourceFiles.join(", ")}</span>
                    </span>
                    <CopyButton text={sources[0]?.code ?? ""} label="Copy source" />
                  </div>
                </Section>

                <Section id="usage" title="Usage" icon={CodeSquareIcon}>
                  <CodeFrame header={<FileLabel name="example.tsx" />} copyText={doc.usage} html={usageHtml} />
                </Section>

                <Section id="variants" title="Variants" icon={Layers02Icon}>
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {doc.variants.map((v) => (
                      <li key={v.name} className="rounded-[12px] border border-border bg-surface p-4">
                        <p className="text-sm font-semibold text-heading">{v.name}</p>
                        <p className="mt-1 text-[13.5px] leading-[1.55] text-muted-foreground">{v.description}</p>
                      </li>
                    ))}
                  </ul>
                </Section>

                <Section id="props" title="Props" icon={Settings02Icon}>
                  <PropsTable props={doc.props} />
                </Section>

                <Section id="accessibility" title="Accessibility" icon={AccessIcon}>
                  <ul className="flex flex-col gap-2.5">
                    {doc.accessibility.map((a) => (
                      <li key={a} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                        <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-heading text-page">
                          <HugeiconsIcon icon={Tick02Icon} size={10} strokeWidth={3} />
                        </span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </Section>

                <Section id="source" title="Source" icon={SourceCodeIcon}>
                  <CodeViewer tabs={tabs} />
                </Section>

                <Section id="related" title="Related components" icon={Link04Icon}>
                  <RelatedComponents items={related} />
                </Section>
              </div>
            ) : (
              <div className="mt-8 flex flex-col gap-12">
                <Section id="status" title="Status" icon={InformationSquareIcon}>
                  <div className="rounded-[14px] border border-dashed border-border-strong bg-surface p-6">
                    <p className="text-sm font-semibold text-heading">{statusLabel[component.status]}</p>
                    <p className="mt-1 max-w-lg text-sm leading-6 text-muted-foreground">
                      {component.name} is on the roadmap but has not been built yet. There is no source to copy and
                      no install command. Follow the changelog to see when it lands.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="secondary">
                        <Link href="/changelog">View changelog</Link>
                      </Button>
                      <Button asChild size="sm" variant="ghost">
                        <Link href={`/components?category=${category.id}`}>
                          Browse {category.name}
                          <ButtonArrow />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Section>
                <Section id="related" title="Available alternatives" icon={Link04Icon}>
                  <RelatedComponents items={related} />
                </Section>
              </div>
            )}

            <p className="mt-12 flex items-center gap-1.5 text-xs text-muted-foreground">
              <HugeiconsIcon icon={Clock01Icon} size={13} strokeWidth={1.8} />
              Added {formatDate(component.createdAt)}. Last updated {formatDate(component.updatedAt)}.
            </p>
          </div>

          <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 px-5 py-5 sm:px-8 sm:py-6">
            <div>
              <p className="font-heading text-[15px] font-semibold tracking-[-0.02em] text-heading">
                FMUI <span className="text-muted-foreground">ui</span>
              </p>
              <p className="mt-1">
                <AuthorCredit />
                <span className="text-[13px] text-muted-foreground">. Free and open source, MIT licensed.</span>
              </p>
            </div>
            <AuthorXLink />
          </footer>
          </div>
        </article>

        <aside className="sticky top-(--header-height) hidden h-[calc(100vh-var(--header-height))] w-[180px] shrink-0 py-8 xl:block">
          <DocsToc items={toc} />
        </aside>
      </div>
    </div>
  );
}
