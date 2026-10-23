import { ImageResponse } from "next/og";

// Exported as /apple-touch-icon.png (180x180) for iOS home screens and link previews.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#171717" }}>
        <svg width="120" height="120" viewBox="0 0 28 28">
          <path d="M8 20V8h8.5M8 14h6.5" stroke="#ffffff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="19" cy="19" r="2" fill="#ffffff" />
        </svg>
      </div>
    ),
    { width: 180, height: 180 },
  );
}
