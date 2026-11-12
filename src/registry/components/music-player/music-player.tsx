"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface MusicTrack {
  title: string;
  artist: string;
  /** Length in seconds. */
  duration: number;
  /** Base artwork color. The highlight and shadow are mixed from it. */
  color: string;
}

export interface MusicPlayerProps {
  tracks?: MusicTrack[];
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  playing?: boolean;
  defaultPlaying?: boolean;
  onPlayingChange?: (playing: boolean) => void;
  className?: string;
}

const DEFAULT_TRACKS: MusicTrack[] = [
  { title: "Late Bloom", artist: "Juno Vale", duration: 187, color: "#2f55f0" },
  { title: "Saturn Walk", artist: "Kaito", duration: 204, color: "#f0694a" },
  { title: "Glass House", artist: "Mira Lane", duration: 171, color: "#1f9d74" },
];

const BARS = [
  { rest: 0.45, duration: 520 },
  { rest: 0.7, duration: 410 },
  { rest: 0.35, duration: 600 },
  { rest: 0.85, duration: 470 },
];

const time = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

const artwork = (color: string) =>
  `radial-gradient(130% 120% at 18% 0%, color-mix(in oklab, ${color} 55%, white) 0%, ${color} 42%, color-mix(in oklab, ${color} 30%, black) 100%)`;

/** A compact player card with crossfading artwork, a live equalizer, and a ticking progress bar. */
export function MusicPlayer({
  tracks = DEFAULT_TRACKS,
  index: indexProp,
  defaultIndex = 0,
  onIndexChange,
  playing: playingProp,
  defaultPlaying = false,
  onPlayingChange,
  className,
}: MusicPlayerProps) {
  const [indexState, setIndexState] = useState(defaultIndex);
  const [playingState, setPlayingState] = useState(defaultPlaying);
  const index = (indexProp ?? indexState) % tracks.length;
  const playing = playingProp ?? playingState;
  const track = tracks[index];

  // Elapsed time belongs to one track; switching tracks starts it from zero.
  const [position, setPosition] = useState({ index, elapsed: 0 });
  const elapsed = position.index === index ? position.elapsed : 0;

  function select(next: number) {
    const wrapped = (next + tracks.length) % tracks.length;
    if (indexProp === undefined) setIndexState(wrapped);
    setPosition({ index: wrapped, elapsed: 0 });
    onIndexChange?.(wrapped);
  }

  function togglePlaying() {
    if (playingProp === undefined) setPlayingState(!playing);
    onPlayingChange?.(!playing);
  }

  const tick = useEffectEvent(() => {
    if (elapsed + 1 >= track.duration) select(index + 1);
    else setPosition({ index, elapsed: elapsed + 1 });
  });

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(tick, 1000);
    return () => window.clearTimeout(id);
  }, [playing, index, elapsed]);

  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  useEffect(() => {
    if (!playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animations = barRefs.current.map((bar, i) =>
      bar?.animate(
        [{ transform: "scaleY(0.3)" }, { transform: "scaleY(1)" }, { transform: `scaleY(${BARS[i].rest})` }],
        { duration: BARS[i].duration, iterations: Infinity, direction: "alternate", easing: "ease-in-out" },
      ),
    );
    return () => animations.forEach((a) => a?.cancel());
  }, [playing]);

  const progress = Math.min(1, elapsed / track.duration);

  return (
    <section aria-label="Music player" className={cn("w-[236px] rounded-[26px] bg-[#111] p-3 text-white", className)}>
      <div className="relative grid aspect-[1.6] overflow-hidden rounded-[16px]">
        {tracks.map((t, i) => (
          <div
            key={t.title}
            aria-hidden="true"
            className={cn(
              "[grid-area:1/1] transition-[opacity,filter] duration-500 ease-out-strong",
              i === index ? "opacity-100 blur-0" : "opacity-0 blur-[2px]",
            )}
            style={{ backgroundImage: artwork(t.color) }}
          />
        ))}
        <span
          aria-hidden="true"
          className="absolute -bottom-4 -right-3 size-[60px] rounded-full border-[7px] border-white/15"
        />
      </div>

      <div className="mt-3 flex items-end justify-between gap-2 px-1">
        <div className="grid min-w-0">
          {tracks.map((t, i) => (
            <div
              key={t.title}
              aria-hidden={i !== index}
              className={cn(
                "[grid-area:1/1] min-w-0 transition-[opacity,filter] duration-300 ease-out-strong",
                i === index ? "opacity-100 blur-0" : "opacity-0 blur-[2px]",
              )}
            >
              <p className="truncate text-[15px]/[18px] font-semibold">{t.title}</p>
              <p className="truncate text-xs text-white/45">{t.artist}</p>
            </div>
          ))}
        </div>
        <span aria-hidden="true" className="mb-1.5 flex h-3.5 items-end gap-[2px]">
          {BARS.map((bar, i) => (
            <span
              key={i}
              ref={(el) => {
                barRefs.current[i] = el;
              }}
              className="h-full w-[3px] origin-bottom rounded-[1px] bg-[#3358eb]"
              style={{ transform: `scaleY(${bar.rest})` }}
            />
          ))}
        </span>
      </div>

      <div
        role="progressbar"
        aria-label="Playback position"
        aria-valuemin={0}
        aria-valuemax={track.duration}
        aria-valuenow={elapsed}
        aria-valuetext={`${time(elapsed)} of ${time(track.duration)}`}
        className="relative mx-1 mt-3 h-[3px] rounded-full bg-white/15"
      >
        <span
          className="absolute inset-0 origin-left rounded-full bg-white transition-transform duration-1000 ease-linear motion-reduce:transition-none"
          style={{ transform: `scaleX(${progress})` }}
        />
        <span
          className="absolute inset-0 transition-transform duration-1000 ease-linear motion-reduce:transition-none"
          style={{ transform: `translateX(${progress * 100}%)` }}
        >
          <span className="absolute left-0 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        </span>
      </div>
      <div className="mx-1 mt-1.5 flex justify-between text-[10px] text-white/40 tabular-nums">
        <span>{time(elapsed)}</span>
        <span>{time(track.duration)}</span>
      </div>

      <div className="mt-1 flex items-center justify-center gap-5 pb-1">
        <button
          type="button"
          aria-label="Previous track"
          onClick={() => select(index - 1)}
          className="grid size-8 place-items-center rounded-full transition-transform duration-150 ease-out-strong active:scale-[0.9]"
        >
          <svg viewBox="0 0 12 12" width="11" height="11" fill="currentColor" aria-hidden="true">
            <rect x="1" y="1.5" width="1.8" height="9" rx="0.6" />
            <path d="M10.5 2.2v7.6a.6.6 0 0 1-.92.5L3.9 6.5a.6.6 0 0 1 0-1l5.68-3.8a.6.6 0 0 1 .92.5z" />
          </svg>
        </button>
        <button
          type="button"
          aria-label={playing ? "Pause" : "Play"}
          onClick={togglePlaying}
          className="grid size-10 place-items-center rounded-full bg-white text-[#111] transition-transform duration-150 ease-out-strong active:scale-[0.94]"
        >
          <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true">
            {playing ? (
              <>
                <rect x="3" y="2.5" width="2" height="7" rx="0.6" />
                <rect x="7" y="2.5" width="2" height="7" rx="0.6" />
              </>
            ) : (
              <path d="M3.5 2.4v7.2a.6.6 0 0 0 .9.52l6-3.6a.6.6 0 0 0 0-1.04l-6-3.6a.6.6 0 0 0-.9.52z" />
            )}
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next track"
          onClick={() => select(index + 1)}
          className="grid size-8 place-items-center rounded-full transition-transform duration-150 ease-out-strong active:scale-[0.9]"
        >
          <svg viewBox="0 0 12 12" width="11" height="11" fill="currentColor" aria-hidden="true">
            <rect x="9.2" y="1.5" width="1.8" height="9" rx="0.6" />
            <path d="M1.5 2.2v7.6a.6.6 0 0 0 .92.5L8.1 6.5a.6.6 0 0 0 0-1L2.42 1.7a.6.6 0 0 0-.92.5z" />
          </svg>
        </button>
      </div>
    </section>
  );
}
