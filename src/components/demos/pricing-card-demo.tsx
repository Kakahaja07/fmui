"use client";

import { PricingCard } from "@/registry/components/pricing-card/pricing-card";

export default function PricingCardDemo() {
  return (
    <div className="w-full max-w-2xl">
      <PricingCard
        plans={[
          { id: "starter", name: "Starter", description: "For side projects.", monthly: 0, yearly: 0, features: ["3 projects", "Community support", "Basic analytics"], cta: "Get started" },
          { id: "pro", name: "Pro", description: "For growing teams.", monthly: 24, yearly: 19, features: ["Unlimited projects", "Priority support", "Advanced analytics", "Custom domains"], highlighted: true },
          { id: "team", name: "Team", description: "For larger organizations.", monthly: 49, yearly: 39, features: ["Everything in Pro", "SSO and audit logs", "Dedicated success manager"] },
        ]}
      />
    </div>
  );
}
