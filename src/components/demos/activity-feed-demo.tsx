"use client";

import { Message01Icon, Rocket01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { ActivityFeed } from "@/registry/components/activity-feed/activity-feed";

const now = "2026-10-23T15:30:00Z";

export default function ActivityFeedDemo() {
  return (
    <ActivityFeed
      now={now}
      filters={[
        { value: "all", label: "All" },
        { value: "comment", label: "Comments" },
        { value: "deploy", label: "Deploys" },
        { value: "member", label: "Members" },
      ]}
      items={[
        { id: "1", actor: "Ada", action: "commented on", target: "Pricing page", at: "2026-10-23T15:12:00Z", type: "comment", icon: Message01Icon },
        { id: "2", actor: "Deploy bot", action: "shipped", target: "v2.4.1 to production", at: "2026-10-23T13:40:00Z", type: "deploy", icon: Rocket01Icon },
        { id: "3", actor: "Noor", action: "joined the", target: "Design team", at: "2026-10-23T09:05:00Z", type: "member", icon: UserIcon },
        { id: "4", actor: "Sam", action: "replied to", target: "Onboarding flow", at: "2026-10-22T18:20:00Z", type: "comment", icon: Message01Icon },
        { id: "5", actor: "Deploy bot", action: "shipped", target: "v2.4.0 to staging", at: "2026-10-22T11:00:00Z", type: "deploy", icon: Rocket01Icon },
        { id: "6", actor: "Lee", action: "left a note on", target: "Billing settings", at: "2026-10-20T16:45:00Z", type: "comment", icon: Message01Icon },
      ]}
    />
  );
}
