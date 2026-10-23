import type { ComponentStatus } from "@/types/component";
import { statusLabel } from "@/lib/component-catalog";
import { Badge } from "@/components/ui/badge";

const variants = { available: "success", preview: "info", "coming-soon": "neutral" } as const;

export function StatusBadge({ status, className }: { status: ComponentStatus; className?: string }) {
  if (status === "available") return null;
  return (
    <Badge variant={variants[status]} className={className}>
      {statusLabel[status]}
    </Badge>
  );
}
