# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See also: `../CLAUDE.md` for shared monorepo conventions (tech stack, env vars, shadcn/ui usage).

## Commands

```sh
npm run dev          # dev server on port 8080
npm run build        # production build
npm run lint         # eslint
```

No test runner is configured.

## Architecture

Single-page MOJJU AI film production landing page. No client-side routing — `App.tsx` renders 8 sections in sequence with anchor-based smooth scrolling (`#hero`, `#portfolio`, `#awards`, `#about`, `#services`, `#team`, `#contact`, footer).

### CMS-driven content

All section content comes from Supabase `posts` table, queried via `src/hooks/use-posts.ts`:

- `usePostsByCategory(category)` — fetches published posts filtered by category string, ordered by `sort_order`
- Categories in use: `portfolio`, `award`, `service`, `team`
- The `metadata` JSONB column stores per-category styling/config (e.g., `video_url`, `rotation`, `bounty`, `color`)

Each section component (`Portfolio`, `Awards`, `Services`, `Team`) calls `usePostsByCategory` and maps posts to its visual format. There is no admin UI — content is managed directly in Supabase.

### Supabase

- Project ID: `vkpfnvnnpbfttedatjlb` (shared skogai-web project, connected via monorepo `.mcp.json`)
- Client: `src/integrations/supabase/client.ts` (hardcoded URL + anon key)
- Auto-generated types: `src/integrations/supabase/types.ts` — do not edit manually
- Tables: `posts` (main content), `comments`, `user_roles`
- Migrations in `supabase/migrations/`

### Entry points

- `src/main.tsx` — wraps `App` in `QueryClientProvider` (TanStack React Query)
- `src/App.tsx` — section layout, no router
- `src/pages/Index.tsx` — unused Lovable scaffold page (not rendered)

### Section themes

Each section has a distinct visual identity:
- **Hero** — fullscreen AWS S3 WebM video background with autoplay/mute toggle, fixed navbar with scroll-based opacity, mobile slide-out menu
- **Portfolio** — featured project with embedded video iframe, details from `metadata.details` and `metadata.video_url`
- **Services** — polaroid photos on clotheslines (darkroom aesthetic), images from `metadata.color`/`metadata.rotation`
- **Team** — "WANTED" poster board with SVG mustache overlays, bounty amounts from `metadata.bounty`, fallback PNG imports in `src/assets/`

### Key patterns

- `src/components/figma/ImageWithFallback.tsx` — image component with error fallback, used across sections
- Framer Motion for entry animations (Hero navbar, title reveals)
- CSS custom animations defined in `src/index.css`: `rope-sway`, `photo-sway-*`, `float-gentle`, `pulse-glow`
- Glass effect utilities: `glass-effect`, `glass-navbar` CSS classes
