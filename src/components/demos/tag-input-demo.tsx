"use client";

import { useState } from "react";
import { TagInput } from "@/registry/components/tag-input/tag-input";

export default function TagInputDemo() {
  const [tags, setTags] = useState(["Design", "Motion", "React"]);

  return (
    <TagInput
      label="Skills"
      placeholder="Add a skill"
      max={6}
      value={tags}
      onValueChange={setTags}
    />
  );
}
