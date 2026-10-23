import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon } from "@hugeicons/core-free-icons";
import { siteConfig } from "@/lib/metadata";
import { formatStars, getGithubStars } from "@/lib/github";

/** GitHub icon plus live star count. Renders nothing until a repository is configured. */
export async function GithubLink() {
  const repo = siteConfig.githubRepo;
  if (!repo) return null;
  const stars = await getGithubStars(repo);

  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noreferrer"
      aria-label={stars === null ? "FMUI on GitHub" : `FMUI on GitHub, ${stars.toLocaleString("en-US")} stars`}
      className="inline-flex h-8 items-center gap-1.5 rounded-[8px] px-2 text-[13px] font-medium tabular-nums text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-heading"
    >
      <HugeiconsIcon icon={GithubIcon} size={17} strokeWidth={1.8} />
      {stars !== null && <span className="hidden sm:inline">{formatStars(stars)}</span>}
    </a>
  );
}
