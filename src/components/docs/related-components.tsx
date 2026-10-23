import type { FMUIComponent } from "@/types/component";
import { ComponentCard } from "@/components/gallery/component-card";

export function RelatedComponents({ items }: { items: FMUIComponent[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {items.map((c) => (
        <li key={c.slug}>
          <ComponentCard component={c} />
        </li>
      ))}
    </ul>
  );
}
