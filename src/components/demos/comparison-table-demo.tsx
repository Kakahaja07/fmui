"use client";

import { ComparisonTable } from "@/registry/components/comparison-table/comparison-table";

const plans = [
  { id: "free", name: "Free", price: "$0" },
  { id: "pro", name: "Pro", price: "$12 / mo" },
  { id: "team", name: "Team", price: "$29 / mo" },
  { id: "enterprise", name: "Enterprise", price: "Custom" },
];

const sections = [
  {
    title: "Usage",
    rows: [
      { feature: "Projects", values: { free: 3, pro: "Unlimited", team: "Unlimited", enterprise: "Unlimited" } },
      { feature: "Storage", values: { free: "2 GB", pro: "100 GB", team: "1 TB", enterprise: "Custom" } },
      { feature: "API requests / day", values: { free: 1000, pro: 50000, team: 250000, enterprise: "Custom" } },
    ],
  },
  {
    title: "Collaboration",
    rows: [
      { feature: "Seats", values: { free: 1, pro: 1, team: 10, enterprise: "Unlimited" } },
      { feature: "Shared workspaces", values: { free: false, pro: true, team: true, enterprise: true } },
      { feature: "Comments & mentions", values: { free: true, pro: true, team: true, enterprise: true } },
      { feature: "Guest access", values: { free: false, pro: false, team: true, enterprise: true } },
    ],
  },
  {
    title: "Security",
    rows: [
      { feature: "Two-factor auth", values: { free: true, pro: true, team: true, enterprise: true } },
      { feature: "SSO / SAML", values: { free: false, pro: false, team: false, enterprise: true } },
      { feature: "Audit log", values: { free: false, pro: false, team: "30 days", enterprise: "1 year" } },
    ],
  },
];

export default function ComparisonTableDemo() {
  return <ComparisonTable plans={plans} sections={sections} highlight="pro" maxHeight={300} />;
}
