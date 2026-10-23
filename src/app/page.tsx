import { Hero } from "@/components/home/hero";
import { ComponentShowcase } from "@/components/home/component-showcase";
import { FeaturedComponents } from "@/components/home/featured-components";
import { CategoryGrid } from "@/components/home/category-grid";
import { Features } from "@/components/home/features";
import { InstallPreview } from "@/components/home/install-preview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedComponents />
      <ComponentShowcase />
      <CategoryGrid />
      <Features />
      <InstallPreview />
    </>
  );
}
