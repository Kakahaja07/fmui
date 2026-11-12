"use client";

import { FocusTimer } from "@/registry/components/pomodoro-timer/pomodoro-timer";

export default function FocusTimerDemo() {
  // The timer ticks on its own; the demo just starts it mid-session like the video.
  return <FocusTimer duration={25 * 60} defaultRemaining={11 * 60 + 12} />;
}
