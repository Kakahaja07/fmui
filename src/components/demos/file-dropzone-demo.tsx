"use client";

import { useState } from "react";
import { FileDropzone, type DropzoneFile } from "@/registry/components/file-dropzone/file-dropzone";

function sample(id: string, name: string, type: string, megabytes: number, progress: number): DropzoneFile {
  return { id, file: new File([new ArrayBuffer(Math.round(megabytes * 1024 ** 2))], name, { type }), progress };
}

export default function FileDropzoneDemo() {
  const [initial] = useState(() => [
    sample("guidelines", "brand-guidelines.pdf", "application/pdf", 2.4, 100),
    sample("hero", "hero-shot.png", "image/png", 1.1, 0),
  ]);

  return (
    <FileDropzone
      defaultValue={initial}
      accept="image/*,.pdf"
      maxSize={5 * 1024 ** 2}
      hint="PNG, JPG or PDF up to 5 MB"
      simulate
    />
  );
}
