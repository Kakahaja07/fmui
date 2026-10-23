"use client";

import { StreamingText } from "@/registry/components/streaming-text/streaming-text";

const text =
  "Streaming responses feel faster because the first words arrive immediately. This component renders tokens as they come in, keeps a caret at the end, and lets the reader pause or replay the stream.";

export default function StreamingTextDemo() {
  return (
    <div className="w-full max-w-lg">
      <StreamingText text={text} />
    </div>
  );
}
