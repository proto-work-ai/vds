# shtorivdom Nx monorepo conventions

## Target structure

```text
apps/
  shtorivdom-site/       # Angular 22 static site
  shtorivdom-storybook/  # shared UI stories

libs/
  atlas/core/
  atlas/form/
  fonts/
  metadb/core/
  ui/site-kit/
```

Do not invent future apps unless requested. A reserved README is acceptable.

## Angular

Use Angular 22 standalone components, signals and `ApplicationConfig` providers. Keep browser-only behavior in Angular components or directives instead of global DOM scripts.

## TypeScript access modifiers

Use explicit access modifiers and the narrowest useful visibility for class members.

- Use `private` for implementation details, injected dependencies, helpers, and state that is only used inside the class.
- Use `protected` for Angular component members and methods that are consumed by the component template but are not part of the component's external API.
- Use `public` for intentional external APIs such as service methods, controller handlers, and members that other classes are expected to consume.
- Prefer `readonly` for injected dependencies, signals, computed values, column definitions, configuration objects, and any field that should not be reassigned.
- Do not make Angular template bindings `private` because templates must be able to access them.
- NestJS constructor dependencies should normally be `private readonly` unless they intentionally form part of a subclass API.

Example:

```ts
export class ExampleComponent {
  private readonly http = inject(HttpClient);

  protected readonly loading = signal(false);
  protected query = '';

  protected submit(): void {
    this.load();
  }

  private load(): void {
    // Internal implementation.
  }
}
```

## Tailwind CSS

Use the existing Tailwind 4 setup. Verify changed classes with `npm run check:tailwind-classes`; Tailwind silently ignores invalid utility names.

## Taiga UI

Use the installed Taiga UI 5.22 packages and the repository `taiga-ui` skill. Do not mix APIs from other versions.

## Prettier

Use one root Prettier config. Mandatory rule: every created or modified `.ts` file must be formatted before completion. For repository-wide TypeScript formatting use:

```bash
npm run format
npm run format:check
```

## Angular template rule

Inline `template` is allowed only when normalized content is `<= 100` characters. Anything longer must use a sibling `.component.html` via `templateUrl`. After extraction, format both `.ts` and `.html`.

## Verification

Before completing a repository change:

- confirm dependency compatibility;
- confirm substantial Angular templates use `templateUrl`;
- confirm each `templateUrl` exists;
- run Prettier/checks when dependencies are available;
- run affected Nx checks and `npm run site:build` for site changes;
- never claim successful execution if it did not run.
- preserve unrelated working-tree changes;
- do not commit, merge, push, or deploy without an explicit owner command.
