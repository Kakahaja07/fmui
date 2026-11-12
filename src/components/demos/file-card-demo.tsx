"use client";

import { useState } from "react";
import { FileCard } from "@/registry/components/file-card/file-card";

const initialFiles = [
  { name: "Q3 board update - final review.pdf", size: 4_832_112, modified: "Edited 2h ago" },
  { name: "Onboarding flow v4.fig", size: 18_420_000, modified: "Edited yesterday" },
  { name: "launch-teaser.mp4", size: 142_600_000, modified: "Nov 8" },
  { name: "brand-assets.zip", size: 63_900, modified: "Oct 30" },
];

export default function FileCardDemo() {
  const [files, setFiles] = useState(initialFiles);
  const [log, setLog] = useState("Open a share menu");

  return (
    <div className="flex flex-col gap-2">
      {files.map((file) => (
        <FileCard
          key={file.name}
          {...file}
          url={`https://files.example.com/${encodeURIComponent(file.name)}`}
          onCopyLink={() => setLog(`Copied link to ${file.name}`)}
          onDownload={() => setLog(`Downloading ${file.name}`)}
          onRename={() => setLog(`Rename ${file.name}`)}
          onDelete={() => {
            setFiles((list) => (list.length > 1 ? list.filter((f) => f.name !== file.name) : initialFiles));
            setLog(`Deleted ${file.name}`);
          }}
        />
      ))}
      <p className="truncate px-1 pt-1 text-xs text-muted-foreground">{log}</p>
    </div>
  );
}
