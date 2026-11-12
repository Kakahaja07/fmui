"use client";

import { useState } from "react";
import { LikeButton } from "@/registry/components/like-button/like-button";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

export default function LikeButtonDemo() {
  const [count, setCount] = useState(1283);
  const [liked, setLiked] = useState(false);
  const [auto, setAuto] = useState(true);

  // Someone likes, then the like is "handed off" to the count so the next one can land.
  const ref = useDemoLoop(
    () => {
      if (liked) {
        setLiked(false);
        setCount((c) => c + 1);
      } else {
        setLiked(true);
      }
    },
    1600,
    auto,
  );

  return (
    <div ref={ref}>
      <LikeButton
        count={count}
        liked={liked}
        onLikedChange={(next) => {
          setAuto(false);
          setLiked(next);
        }}
      />
    </div>
  );
}
