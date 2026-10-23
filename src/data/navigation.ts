import { CubeIcon, GridViewIcon, News01Icon, Route02Icon, StarsIcon } from "@hugeicons/core-free-icons";

export const mainNav = [
  { label: "Components", href: "/components", icon: GridViewIcon },
  { label: "Blocks", href: "/blocks", icon: CubeIcon },
  { label: "Showcase", href: "/showcase", icon: StarsIcon },
  { label: "Roadmap", href: "/roadmap", icon: Route02Icon },
  { label: "Changelog", href: "/changelog", icon: News01Icon },
] as const;

export const footerNav = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "/components" },
      { label: "Blocks", href: "/blocks", soon: true },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Installation", href: "/#installation" },
      { label: "About FMUI", href: "/about" },
      { label: "Showcase", href: "/showcase" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Submit a project", href: "/showcase", soon: true },
      { label: "Contributing", href: "/about#contributing" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "License", href: "/about#license" },
      { label: "Privacy", href: "/about#privacy" },
    ],
  },
] as const;
