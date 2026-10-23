import "server-only";
import { createHighlighter, type Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  highlighterPromise ??= createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: ["tsx", "ts", "bash", "json"],
  });
  return highlighterPromise;
}

/** Highlighted HTML for a code string. Runs at build time; pages are statically generated. */
export async function highlight(code: string, lang: "tsx" | "ts" | "bash" | "json" = "tsx") {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}
