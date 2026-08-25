# proto.cms — project context

Nx monorepo with Nx Cloud enabled (`nxCloudId` in `nx.json`). Multiple apps
live in one workspace: `apps/proto` (Angular frontend), `apps/proto-api`
(NestJS + Prisma), and three apparently separate products —
`apps/deckenmaster`, `apps/delux-drapes`, `apps/metadb` — plus
`apps/proto-storybook`. Verify which apps actually share code before
assuming a `libs/*` change is proto-only.

## Versions

Angular ~21.2 (`@angular/build`, `@angular/cli` 21.2.7), TypeScript ~5.9.

## Libraries

`libs/atlas` is split into real Nx sub-libraries: `libs/atlas/core`,
`libs/atlas/form`, `libs/atlas/table` — each with its own `src/index.ts` and
`tsconfig.base.json` path entry. `libs/ui` is one folder per
`@spartan-ng/helm/*` component (alert, button, dialog, sidebar, table,
select, etc.) — this is a shadcn-style component library via Spartan NG, not
a vendored Material/ng-zorro fork. There's also `libs/metadb/core` and
`libs/fonts`.

This repo shares library naming with a separate, older sibling codebase
(`C:\git\proto.git`) but has diverged substantially — do not assume any
finding, bug, or convention from that repo applies here without re-verifying
against this repo's actual current code.

## Building and verifying

```bash
npx nx build proto --configuration development
npx nx build proto-api
```

Check `npx nx show project <name>` / `npx nx graph` for real dependency
edges before assuming a `libs/*` change only affects one app — this
workspace has several apps sharing the same library tree.

## Status of this file

This is a starter document written from a first structural pass, not a deep
audit — versions, app list, and library layout above were verified directly;
anything not listed here (strict-mode status, known dead code, seeding/
Docker workflow, vendored-fork boundaries, circular-dependency clusters)
has not been investigated in this repo yet. Extend this file with real
findings as they're made, rather than assuming parity with the sibling
`proto.git` repo's much more extensively documented CLAUDE.md.
