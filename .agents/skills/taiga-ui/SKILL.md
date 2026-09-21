---
name: taiga-ui
description: Use before changing Taiga UI code in shtorivdom. Grounds components, forms, textfields, icons, theming, and provider setup in the installed Taiga UI 5.22 API and this site's conventions.
---

# Taiga UI 5.22 in shtorivdom

Unofficial skill, hand-assembled from the official machine-readable docs
(`https://taiga-ui.dev/llms-full.txt`). Taiga UI publishes no
official `SKILL.md`. The `references/` files in this skill are verbatim extracts of
those docs — treat them as the source of truth over memory.

## Versions in this repository

| Package         | Version   | Notes                                                    |
| --------------- | --------- | -------------------------------------------------------- |
| `@taiga-ui/*`   | `5.22.0`  | v5 — standalone components/directives only, no NgModules |
| `@angular/core` | `~22.1.x` | standalone + signals                                     |

Treat `package.json` as the source of truth for installed packages. Do not add another
`@taiga-ui/*` package without checking that it is required and version-compatible.

## Workflow

1. Read `.agents/skills/nx-monorepo-conventions/SKILL.md` and the nearby implementation.
2. Before using any `Tui*` symbol, look it up in
   [references/import-map.md](references/import-map.md) and import it from the package
   listed there. Wrong import package is the number one cause of compile errors.
3. Before returning generated code, run through
   [references/checklist-and-mistakes.md](references/checklist-and-mistakes.md).
4. If the docs in `references/` do not cover what you need, fetch
   `https://taiga-ui.dev/llms-full.txt` — do not guess an API from memory.

## Project setup (already done — do not duplicate)

Inspect the existing providers in `apps/shtorivdom-site` before changing global defaults.
Icons are served from `/assets/taiga-ui/icons`; production copies only the explicit SVG
list in `apps/shtorivdom-site/project.json`.

## Hard rules

- **v5 API only.** Anything `NgModule`-based (`TuiInputModule`, `TuiButtonModule`, …) is
  v3 and does not exist here. In v5, `TuiButton` is a _directive_ on a native
  `<button>`/`<a>`, not a wrapper component.
- **`ChangeDetectionStrategy.OnPush`** on every component.
- **CDK types, not native ones.** Dates and times are `TuiDay`, `TuiMonth`, `TuiYear`,
  `TuiDayRange`, `TuiTime` from `@taiga-ui/cdk` — never `Date` or a plain number. Output
  events emit those types too, not DOM `Event`.
- **No arrow functions or complex expressions in templates.** Move logic into a getter or
  method on the class.
- **Structural directives must be imported.** `*tuiDropdown`, `*tuiItem` and friends each
  need their directive class in the component's `imports`.
- **Forms:** `FormsModule` for `[(ngModel)]`, `ReactiveFormsModule` for
  `FormControl`/`FormGroup`. Missing them is a silent template failure.
- **Never copy `@demo/emulate/*` imports** from documentation examples — they are
  demo-site internals.
- **Textfields:** use `<tui-textfield>` with `<label tuiLabel>` and a native
  `<input tuiInput>` or `<textarea tuiTextarea>`. Put control icons on the textfield via
  `iconStart`/`iconEnd`.
- **Phone:** use `TuiInputPhone`/`tuiInputPhone`; apply `*appDefer` only to the telephone
  textfield where the existing mask initialization requires it.
- **Required fields:** displayed name and city fields are required and marked `*`; city
  also uses the verified location icon.
- **Success:** preserve the form success block beginning with “Спасибо!”.

## Icon workflow

1. Verify the `@tui.*` name and v5 API.
2. Use the control's `iconStart` or `iconEnd` input.
3. Add a missing SVG to the explicit asset glob in `apps/shtorivdom-site/project.json`.
4. Build and verify that the icon remains visible after hydration.
5. Report that Taiga icons need manual server synchronization unless the owner explicitly
   requested deployment with `--with-taiga-icons`.

## References

- [references/import-map.md](references/import-map.md) — every exported symbol per
  package. Check here before importing.
- [references/checklist-and-mistakes.md](references/checklist-and-mistakes.md) —
  pre-return checklist and the eight most common Taiga UI errors.
- [references/getting-started.md](references/getting-started.md) — bootstrap, styles,
  assets, dark-mode script, `TuiOptions`, SSR.
- [references/migration-guide.md](references/migration-guide.md) — major-version upgrade
  procedure. This is an Nx repo, so the migration path is `nx migrate @taiga-ui/cdk`
  followed by `nx migrate --run-migrations=migrations.json`, not `ng update`.

Upstream, kept in sync manually: `https://taiga-ui.dev/llms-full.txt`. Taiga UI also ships
an official MCP server (`npx @taiga-ui/mcp@latest --source-url=https://taiga-ui.dev/llms-full.txt`)
if live doc lookups are preferred over these vendored extracts.
