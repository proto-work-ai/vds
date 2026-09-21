---
name: nx-monorepo-conventions
description: Apply the shtorivdom Nx monorepo conventions when creating, updating, refactoring, reviewing, or scaffolding the Angular site and shared libraries.
---

# Nx conventions for shtorivdom

Follow [references/conventions.md](references/conventions.md) as the authoritative project defaults unless the user explicitly overrides them.

## Workflow

1. Inspect `package.json`, `nx.json`, affected `project.json` files, `tsconfig.base.json`, and relevant Angular/NestJS bootstrap files before editing.
2. Preserve application/library boundaries and reuse root dependencies/shared configuration.
3. Put reusable site UI in `libs/ui/site-kit`; keep page composition in `apps/shtorivdom-site`.
4. Use `templateUrl` for Angular templates longer than 100 normalized characters.
5. Format changed files with the repository formatter without touching unrelated files.
6. Run `npm run check:tailwind-classes` after template or Tailwind changes.
7. Run the narrowest applicable Nx check and `npm run site:build` for site changes. Never claim success if it was not executed.

## Shared UI stack

- Tailwind: layout, spacing, responsive utilities.
- Taiga UI: Angular controls/forms/dialogs/dropdowns/tabs/notifications.
- Static prerender through `apps/shtorivdom-site`.

## Repository writes

Do not commit, merge, push, or deploy unless the owner explicitly requests that action.
