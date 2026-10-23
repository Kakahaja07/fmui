import "server-only";
import { cacheLife } from "next/cache";
import { createHighlighter, type Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  highlighterPromise ??= createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: ["tsx", "ts", "bash", "json"],
  });
  return highlighterPromise;
}

/**
 * Highlighted HTML for a code string. Cached by (code, lang) so the output is
 * part of the static shell; Shiki's internal timers would otherwise mark the
 * render as request-time.
 */
export async function highlight(code: string, lang: "tsx" | "ts" | "bash" | "json" = "tsx") {
  "use cache";
  cacheLife("max");
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}
