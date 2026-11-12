"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Folder01Icon, Home01Icon } from "@hugeicons/core-free-icons";
import { BreadcrumbTrail, type BreadcrumbItem } from "@/registry/components/breadcrumb-trail/breadcrumb-trail";

// A small folder tree: each folder lists its children by id.
const TREE: Record<string, { label: string; children: string[] }> = {
  home: { label: "Acme Inc.", children: ["projects", "finance"] },
  projects: { label: "Projects", children: ["website", "mobile"] },
  finance: { label: "Finance", children: [] },
  website: { label: "Website redesign", children: ["design", "copy"] },
  mobile: { label: "Mobile app", children: [] },
  design: { label: "Design", children: ["assets", "explorations"] },
  copy: { label: "Copy", children: [] },
  assets: { label: "Assets", children: ["icons", "photos"] },
  explorations: { label: "Explorations", children: [] },
  icons: { label: "Icons", children: [] },
  photos: { label: "Photos", children: [] },
};

const toItem = (id: string): BreadcrumbItem => ({
  id,
  label: TREE[id].label,
  icon: id === "home" ? Home01Icon : undefined,
});

export default function BreadcrumbTrailDemo() {
  const [path, setPath] = useState(["home", "projects", "website", "design", "assets"]);
  const current = path[path.length - 1];
  const children = TREE[current].children;

  return (
    <div className="w-[480px] rounded-[20px] border border-border bg-background p-3 shadow-card">
      <BreadcrumbTrail
        items={path.map(toItem)}
        maxItems={4}
        onNavigate={(item) => setPath((p) => p.slice(0, p.indexOf(item.id) + 1))}
      />
      <div className="mt-3 rounded-[14px] bg-surface p-2">
        {children.length ? (
          <ul className="grid grid-cols-2 gap-1.5">
            {children.map((id) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => setPath((p) => [...p, id])}
                  className="flex w-full items-center gap-2 rounded-[10px] bg-background px-3 py-2.5 text-left text-[13px] font-medium text-heading shadow-xs transition-transform duration-150 ease-out-strong active:scale-[0.97]"
                >
                  <HugeiconsIcon icon={Folder01Icon} size={16} strokeWidth={1.8} className="text-[#3358eb]" />
                  {TREE[id].label}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-3 py-5 text-center text-xs text-muted-foreground">
            This folder is empty. Use the breadcrumbs to go back up.
          </p>
        )}
      </div>
    </div>
  );
}
