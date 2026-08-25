---
name: proto-refactoring
description: Refactor apps/proto, apps/proto-api, or the other apps in this Nx workspace (deckenmaster, delux-drapes, metadb, proto-storybook) toward Angular/NestJS best practices — mechanical cleanups, import-cycle hunting, structural audits. Use whenever asked to "improve", "clean up", or "bring code in line with guidelines" in this repo. Encodes the verification process and a portable checklist of Angular gotchas found in a sibling codebase (proto.git) that shares heritage with this one's libs/atlas and libs/ui.
metadata:
  author: session-derived
  version: '1.0'
---

# Proto.cms refactoring playbook

This is a starter skill, not yet battle-tested against this specific repo's
own bugs — it was seeded from a much longer refactoring session on a sibling
codebase (`C:\git\proto.git`, an older, legacy version of this product) that
shares library naming (`libs/atlas`, `libs/ui`) but has since diverged
significantly: this repo (`C:\git\proto.cms`) already has `libs/atlas`
split into real Nx sub-libraries (`core`, `form`, `table`) and `libs/ui`
built on `@spartan-ng`/shadcn-style components, not the vendored
Material/ng-zorro forks the legacy repo carries. **Do not assume any specific
bug, file path, or finding from the legacy repo applies here** — re-verify
everything against this repo's actual current state before acting on it.
Update this file with real findings as they're made here, the same way the
legacy repo's equivalent skill was built up over its session.

## Verified facts about this workspace (re-check if stale)

- Nx monorepo, Nx Cloud enabled (`nxCloudId` in `nx.json`).
- Angular ~21.2, TypeScript ~5.9, `@angular/build`/`@angular/cli` 21.2.7.
- Apps: `proto`, `proto-api` (NestJS + Prisma, `apps/proto-api/prisma/`),
  `deckenmaster`, `delux-drapes`, `metadb`, `proto-storybook` — several
  apparently unrelated products in one workspace, not just proto.
- `libs/atlas/{core,form,table}` and `libs/ui/*` (one folder per
  `@spartan-ng/helm/*` component: alert, button, dialog, sidebar, table,
  etc.) are **already real Nx libraries** with their own `src/index.ts` and
  path aliases in `tsconfig.base.json` — no equivalent of the legacy repo's
  "convert lift-and-shift folders into libraries" task is needed here.
  Also has `libs/metadb/core` and `libs/fonts`.
- No `strict`/`strictTemplates` override found in `tsconfig.base.json` at a
  glance — don't assume either way without checking the actual effective
  config (Angular CLI/TS defaults apply unless overridden somewhere else,
  e.g. a per-app tsconfig).

## Process — same discipline as any Angular/Nx refactor here

1. **Read-only audit first**, grouped by category/risk, before any mechanical
   edit — especially across multiple apps in this workspace, since a shared
   `libs/*` change can affect `proto`, `deckenmaster`, `delux-drapes`, and
   `metadb` simultaneously.
2. **Build-verify per batch, not once at the end**: `npx nx build <project>
   --configuration development` for whichever app(s) the change reaches
   (check `nx graph` / `nx show project <name>` for the real dependency
   edges before assuming only one app is affected).
3. **A green build does not prove the app boots.** The sibling legacy repo
   hit multiple incidents (standalone-component migration, idiom migration,
   a barrel-import evaluation-order bug, several `NG0919: Cannot read
   @Component metadata` circular-dependency crashes) that were all
   `ng build`-clean and runtime-broken — type-checking doesn't execute the
   app. Load the affected app in a browser after a batch of changes, not
   just after the last one.
4. **Flag structural duplication, don't merge it inline** unless asked — a
   judgment call about product intent belongs to the user, not a mechanical
   pass.

## Portable Angular gotcha found in the legacy repo — worth checking here too

A widespread pattern in the legacy repo's `libs/atlas` (vendored
Material/ng-zorro forks) caused real `NG0919` circular-dependency crashes: a
component's own `.ts` file importing its **sibling wrapping NgModule** (or a
mutually-referencing sibling component) into its own `@Component({ imports:
[...] })` array, even though the import was never used in the component's
own template/logic — dead self-reference closing a same-directory cycle
(`XComponent -> XModule -> XComponent`). Confirmed to break Angular's Ivy
metadata read under Vite's dev bundler (TDZ/hoisting-order sensitive) even
though `nx build` reported 0 errors.

This repo's `libs/ui` is spartan-ng-based (different origin, likely doesn't
carry this exact legacy pattern), but `libs/atlas` shares naming/heritage
with the legacy repo's `libs/atlas` and is worth a quick check if any
`NG0919`/circular-dependency crash shows up here: grep for a component
importing a same-directory `.module.ts` (or sibling component) that wraps
itself, verify it's actually unused (check the template + the `.ts` logic,
not just the `imports:` array), and drop the dead import if so — cheap,
low-risk, and was the fix in every confirmed instance in the legacy repo.

## What's NOT yet known about this repo

Everything below needs its own investigation here before it can be trusted
— none of it was verified in this session, only in the legacy sibling repo,
and this repo has diverged too much to assume parity:
- Whether any of the multiple apps (`deckenmaster`, `delux-drapes`,
  `metadb`, `proto-storybook`) share more than `libs/*` with `proto`/
  `proto-api`, or are fully independent products that happen to live in the
  same workspace.
- Known-dead code, vendored-fork boundaries, or a circular-dependency
  cluster equivalent to the legacy repo's `form-adapters`/box-adapter one —
  don't assume one exists here without checking.
- Seeding, Docker, and Prisma workflow specifics for `apps/proto-api` (it
  has its own `prisma/` and `supabase/` directories, structured differently
  from the legacy repo's).
