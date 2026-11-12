"use client";

import { useEffect, useState } from "react";
import { OtpInput } from "@/registry/components/otp-input/otp-input";
import { useDemoLoop } from "@/components/demos/use-demo-loop";

const CODES = ["604358", "482913", "730146", "195827"];

export default function OtpInputDemo() {
  const [code, setCode] = useState(CODES[0]);
  const [target, setTarget] = useState(0);
  const [auto, setAuto] = useState(true);
  const [checking, setChecking] = useState(false);

  const ref = useDemoLoop(() => setTarget((t) => (t + 1) % CODES.length), 4000, auto);

  // A new code arrives digit by digit, left to right, rolling over the old one.
  useEffect(() => {
    if (!auto) return;
    const goal = CODES[target];
    const i = [...goal].findIndex((d, k) => code[k] !== d);
    if (i === -1) return;
    const id = window.setTimeout(() => setCode(goal.slice(0, i + 1) + code.slice(i + 1)), 70);
    return () => window.clearTimeout(id);
  }, [auto, code, target]);

  return (
    <div
      ref={ref}
      onFocus={() => {
        // Hand the field over empty so the visitor can type their own code.
        if (!auto) return;
        setAuto(false);
        setCode("");
      }}
    >
      <OtpInput
        value={code}
        onValueChange={setCode}
        onComplete={() => {
          setChecking(true);
          window.setTimeout(() => setChecking(false), 1500);
        }}
        verifying={auto ? code.length === 6 : checking}
      />
    </div>
  );
}
