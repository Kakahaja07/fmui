export type ComponentStatus = "available" | "preview" | "coming-soon";

export type ComponentCategory =
  | "interactive"
  | "cards-data"
  | "forms-inputs"
  | "motion-feedback"
  | "ai"
  | "navigation-layout";

export interface FMUIComponent {
  slug: string;
  name: string;
  description: string;
  category: ComponentCategory;
  tags: string[];
  status: ComponentStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  dependencies: string[];
  /** Paths relative to src/registry/components. Must exist on disk. */
  sourceFiles: string[];
  previewId?: string;
  registryItem?: string;
}

export interface CategoryMeta {
  id: ComponentCategory;
  name: string;
  shortName: string;
  description: string;
}

export interface PropDoc {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface VariantDoc {
  name: string;
  description: string;
}

export interface ComponentDoc {
  usage: string;
  variants: VariantDoc[];
  props: PropDoc[];
  accessibility: string[];
}
