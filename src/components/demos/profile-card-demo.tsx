"use client";

import { useState } from "react";
import { ProfileCard } from "@/registry/components/profile-card/profile-card";

const menu = [
  { id: "profile", label: "View profile" },
  { id: "copy", label: "Copy profile link" },
  { id: "mute", label: "Mute" },
  { id: "block", label: "Block", destructive: true },
];

export default function ProfileCardDemo() {
  const [following, setFollowing] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <ProfileCard
        name="Maya Okafor"
        role="Product Designer"
        handle="@maya"
        color="#3358eb"
        status="online"
        stats={[
          { label: "Followers", value: 2481 + (following ? 1 : 0) },
          { label: "Following", value: 312 },
          { label: "Shots", value: 86 },
        ]}
        following={following}
        onFollowingChange={setFollowing}
        menu={menu}
      />
      <ProfileCard
        name="Leo Brandt"
        role="Staff Engineer"
        handle="@leob"
        color="#1f9d74"
        status="away"
        stats={[
          { label: "Repos", value: 54 },
          { label: "Reviews", value: "1.2k" },
        ]}
        defaultFollowing
        menu={menu}
      />
    </div>
  );
}
