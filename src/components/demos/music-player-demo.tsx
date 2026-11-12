"use client";

import { useState } from "react";
import { MusicPlayer } from "@/registry/components/music-player/music-player";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

export default function MusicPlayerDemo() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [auto, setAuto] = useState(true);

  // Skip to the next track every few seconds, like someone browsing a playlist.
  const ref = useDemoLoop(() => setIndex((i) => (i + 1) % 3), 7000, auto);

  return (
    <div ref={ref}>
      <MusicPlayer
        index={index}
        onIndexChange={(next) => {
          setAuto(false);
          setIndex(next);
        }}
        playing={playing}
        onPlayingChange={(next) => {
          setAuto(false);
          setPlaying(next);
        }}
      />
    </div>
  );
}
