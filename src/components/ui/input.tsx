import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, type = "text", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-[10px] border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground transition-[border-color,box-shadow] duration-200 hover:border-border-strong focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
