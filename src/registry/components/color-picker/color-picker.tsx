"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

export interface ColorPickerProps {
  /** A 6-digit hex color like `#3358EB`. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Quick picks shown under the hue slider. */
  presets?: string[];
  className?: string;
}

const DEFAULT_PRESETS = ["#3358EB", "#EB5833", "#33EBA7", "#7F33EB", "#EBB433"];
const RAINBOW = "linear-gradient(to right, #f00, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00)";
const MAX_HUE = 359;

function hexToHsl(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => c / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (d) h = max === r ? ((g - b) / d + 6) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [Math.min(h * 60, MAX_HUE), s, l];
}

function hslToHex(h: number, s: number, l: number) {
  const a = s * Math.min(l, 1 - l);
  const channel = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(c * 255).toString(16).padStart(2, "0");
  };
  return `#${channel(0)}${channel(8)}${channel(4)}`.toUpperCase();
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * A hue picker. Saturation and lightness come from the current color, so
 * every hue on the slider stays in the same family as the presets.
 */
export function ColorPicker({
  value: valueProp,
  defaultValue = DEFAULT_PRESETS[0],
  onValueChange,
  presets = DEFAULT_PRESETS,
  className,
}: ColorPickerProps) {
  const [valueState, setValueState] = useState(defaultValue);
  const value = (valueProp ?? valueState).toUpperCase();
  const [targetHue, s, l] = hexToHsl(value);
  const [hue, setHue] = useState(targetHue);
  const hueRef = useRef(targetHue);

  // Glide the shown hue to the new color, so the thumb travels and the swatch fades.
  useEffect(() => {
    const from = hueRef.current;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 700;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = duration ? Math.min(1, (now - start) / duration) : 1;
      hueRef.current = from + (targetHue - from) * easeInOut(t);
      setHue(hueRef.current);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [targetHue]);

  const shown = Math.abs(hue - targetHue) < 0.5 ? value : hslToHex(hue, s, l);

  function commit(next: string) {
    if (valueProp === undefined) setValueState(next);
    onValueChange?.(next);
  }

  // Direct manipulation skips the glide: the thumb sits under the pointer.
  function setHueNow(h: number) {
    const next = Math.round(Math.min(MAX_HUE, Math.max(0, h)));
    hueRef.current = next;
    setHue(next);
    commit(hslToHex(next, s, l));
  }

  function hueAt(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    return ((e.clientX - rect.left) / rect.width) * MAX_HUE;
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const steps: Record<string, number> = {
      ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 15, PageDown: -15,
    };
    const rounded = Math.round(targetHue);
    if (e.key in steps) setHueNow(rounded + steps[e.key]);
    else if (e.key === "Home") setHueNow(0);
    else if (e.key === "End") setHueNow(MAX_HUE);
    else return;
    e.preventDefault();
  }

  return (
    <div className={cn("w-[232px] rounded-[24px] bg-accent p-4", className)}>
      <div className="flex h-[72px] items-end rounded-[14px] p-3" style={{ backgroundColor: shown }}>
        <span className="font-mono text-[11px] font-semibold tracking-wide text-white/95">{shown}</span>
      </div>

      <div
        role="slider"
        tabIndex={0}
        aria-label="Hue"
        aria-valuemin={0}
        aria-valuemax={MAX_HUE}
        aria-valuenow={Math.round(targetHue)}
        aria-valuetext={`Hue ${Math.round(targetHue)} degrees, ${value}`}
        onKeyDown={onKeyDown}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          setHueNow(hueAt(e));
        }}
        onPointerMove={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) setHueNow(hueAt(e));
        }}
        className="relative mt-4 h-[18px] cursor-pointer touch-none rounded-full"
      >
        <div className="absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2 rounded-full" style={{ background: RAINBOW }} />
        <div className="absolute inset-0" style={{ transform: `translateX(${(hue / MAX_HUE) * 100}%)` }}>
          <span className="absolute top-0 left-0 grid size-[18px] -translate-x-1/2 place-items-center rounded-full bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.12),0_1px_3px_rgb(0_0_0/0.2)]">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: shown }} />
          </span>
        </div>
      </div>

      <div role="group" aria-label="Presets" className="mt-4 flex justify-between">
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            aria-label={preset}
            aria-pressed={preset.toUpperCase() === value}
            onClick={() => commit(preset.toUpperCase())}
            className={cn(
              "size-7 rounded-[8px] transition-transform duration-150 ease-out-strong active:scale-[0.94]",
              preset.toUpperCase() === value && "ring-2 ring-heading ring-offset-2 ring-offset-accent",
            )}
            style={{ backgroundColor: preset }}
          />
        ))}
      </div>
    </div>
  );
}
