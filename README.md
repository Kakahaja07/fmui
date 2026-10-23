# FMUI

Free Modern UI: a collection of 50 planned React components you copy into your own project and own. This repository contains the website ([fmui.dev](https://fmui.dev)) and the component source.

## Status

- 20 components are available with live demos, documentation, and source code.
- 4 more are in preview: Progress Ring, Animated Counter, Morphing Dialog, and Floating Dock.
- 26 are listed as coming soon. They have catalog entries only: no source, no install command, and `noindex`.
- Blocks (full page sections) are planned; the Blocks page shows the plan, not downloads.
- The shadcn registry endpoint (`fmui.dev/r/*.json`) is not live yet. Install commands on the site are labelled as illustrative; copy the source from any component page instead.

## Stack

Next.js 16 (App Router, Cache Components), React 19, TypeScript (strict), Tailwind CSS v4, Radix UI, cmdk, Motion, Shiki, Hugeicons, and next-themes. Tests run with Vitest and Testing Library.

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Other scripts:

```bash
pnpm build      # production build
pnpm typecheck  # next typegen + tsc
pnpm lint
pnpm test
```

## Deployment (GitHub Pages)

Every push to `main` builds a static export and deploys it with `.github/workflows/deploy.yml`.

1. In the repository, open **Settings > Pages** and set **Source** to **GitHub Actions** (one time).
2. Push to `main`, or run the workflow from the **Actions** tab. The site is served at `https://<user>.github.io/fmui/`.

To try the static export locally:

```bash
GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/fmui pnpm build   # writes ./out
```

### Custom domain

1. In **Settings > Pages > Custom domain**, enter your domain and save.
2. At your DNS provider, add records that point to GitHub Pages:
   - Subdomain (for example `ui.example.com`): a `CNAME` record to `<user>.github.io`.
   - Apex domain (for example `example.com`): `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`.
3. When the DNS check passes, enable **Enforce HTTPS**.
4. Re-run the deploy workflow. The base path switches to `/` and canonical URLs use the new domain automatically.

## Project layout

```
src/
  app/                  routes: /, /components, /components/[slug], /blocks, /showcase, /roadmap, /changelog, /about
  components/
    ui/                 shared primitives (buttons, dialogs, menus, cards)
    layout/             header, footer, frame, mobile nav, docs sidebar, table of contents, search (Ctrl+K)
    home/ gallery/ docs/ blocks/ roadmap/   page sections and documentation widgets
    demos/              one demo per implemented component, lazy-loaded, plus card layout sizes
  registry/components/  the copyable component source, one folder per component
  content/components/   usage, variants, props, and accessibility notes per component
  data/                 typed catalog (components.ts is the single source of truth), categories, blocks, roadmap, changelog
  lib/                  catalog queries, source reader, Shiki highlighter, site config
```

Every component page reads its Code tab from the real file listed in `sourceFiles`. A missing file fails the build and the unit tests, so the site never shows code that does not exist.

## Adding a component

1. Create `src/registry/components/<slug>/<slug>.tsx` (client component, Tailwind classes, `cn` from `@/lib/utils`).
2. Add `src/components/demos/<slug>-demo.tsx`, register it in `src/components/demos/index.ts`, and give it a card width in `demoLayout`.
3. Add the docs entry in `src/content/components/index.ts`.
4. Change the catalog entry in `src/data/components.ts` from `planned(...)` to `available(...)`.
5. Run `pnpm test` to verify the catalog invariants, then `pnpm build`.

## Contributing

Issues and pull requests are welcome. For a new component, open an issue first to agree on scope, then send a pull request that includes the component, its demo, and its documentation entry.

## License

[MIT](LICENSE) © 2026 Prashant Sharma

Fonts in `public/fonts` are licensed separately under the SIL Open Font License 1.1: [Geomini](https://github.com/fontbob/geomini) (headings) and [Uncut Sans](https://uncut.wtf/) by Kasper Nordkvist (body text).

Developed by Prashant Sharma ([@Prsnt50](https://x.com/Prsnt50)).
