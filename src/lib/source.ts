import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

const REGISTRY_ROOT = path.join(process.cwd(), "src", "registry", "components");

export interface SourceFile {
  /** Path relative to the registry root, e.g. "stepper/stepper.tsx". */
  path: string;
  filename: string;
  code: string;
}

/** Reads real registry source files. Throws if a catalog entry points at a missing file. */
export async function readSourceFiles(relativePaths: string[]): Promise<SourceFile[]> {
  return Promise.all(
    relativePaths.map(async (rel) => {
      const abs = path.join(REGISTRY_ROOT, rel);
      const code = await fs.readFile(abs, "utf8");
      return { path: rel, filename: path.basename(rel), code };
    }),
  );
}
