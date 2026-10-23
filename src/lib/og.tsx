import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), "src", "assets", "og-fonts");
let fontsPromise: Promise<{ heading: Buffer; body: Buffer }> | null = null;
function loadFonts() {
  fontsPromise ??= Promise.all([
    readFile(join(fontDir, "Geomini-SemiBold.ttf")),
    readFile(join(fontDir, "UncutSans-Regular.ttf")),
  ]).then(([heading, body]) => ({ heading, body }));
  return fontsPromise;
}

/**
 * Shared 1200x630 social preview: the FMUI mark, an eyebrow, a large title,
 * a description, and a footer. Matches the site: neutral page, framed card.
 */
export async function renderOgImage({
  eyebrow,
  title,
  description,
  footer = "fmui.dev",
}: {
  eyebrow: string;
  title: string;
  description: string;
  footer?: string;
}) {
  const { heading, body } = await loadFonts();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#fafafa",
          padding: 40,
          fontFamily: "Uncut Sans",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#ffffff",
            border: "1px solid #e5e5e5",
            borderRadius: 28,
            padding: "56px 64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "#171717",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="34" height="34" viewBox="0 0 28 28">
                <path d="M8 20V8h8.5M8 14h6.5" stroke="#ffffff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="19" cy="19" r="2.1" fill="#ffffff" />
              </svg>
            </div>
            <div style={{ fontFamily: "Geomini", fontSize: 34, color: "#171717", letterSpacing: -0.5 }}>FMUI</div>
            <div
              style={{
                marginLeft: 12,
                display: "flex",
                padding: "6px 16px",
                borderRadius: 999,
                border: "1px solid #e5e5e5",
                background: "#f4f4f4",
                color: "#525252",
                fontSize: 22,
              }}
            >
              {eyebrow}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                fontFamily: "Geomini",
                fontSize: title.length > 28 ? 64 : 76,
                lineHeight: 1.05,
                letterSpacing: -2.5,
                color: "#171717",
                maxWidth: 980,
              }}
            >
              {title}
            </div>
            <div style={{ fontSize: 30, lineHeight: 1.4, color: "#737373", maxWidth: 960 }}>{description}</div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#737373", fontSize: 24 }}>
            <div style={{ display: "flex" }}>Free React components for Tailwind CSS</div>
            <div style={{ display: "flex", color: "#171717" }}>{footer}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geomini", data: heading, weight: 600, style: "normal" },
        { name: "Uncut Sans", data: body, weight: 400, style: "normal" },
      ],
    },
  );
}
