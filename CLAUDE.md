<!--
 *              © 2026 Visa
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 -->
# CLAUDE.md

This file provides context for AI assistants working on this codebase.

## Project Overview

This is `@visa/nova-angular` (v6.0.2), the Angular implementation of the Visa Product Design System (VPDS/Nova). It is a component library published as an npm package, accompanied by a workshop documentation app.

## Repository Structure

```
projects/
  nova-angular/          # The publishable Angular component library
    src/
      index.ts           # Public API barrel file
      lib/               # ~105 component/directive directories (flat structure)
  workshop/              # Documentation site / example showcase app
    src/app/
      components/        # Component doc pages and examples
      patterns/          # Complex pattern examples (dynamic-table, file-upload, etc.)
      utilities/         # Utility doc pages
      foundations/        # Foundation doc pages
      services/          # Service doc pages
      shared/            # Shared workshop components and services
bin/                     # Build scripts (route-gen, metadata, themes, stats)
```

## Tech Stack

- **Angular 21** (library supports ^19 || ^20 || ^21)
- **TypeScript 5.9**
- **pnpm** (v8.12.0) - enforced via `preinstall` check
- **ng-packagr** for library builds
- **Jest 30** with `@testing-library/angular` for tests
- **@floating-ui/dom** for positioning (tooltips, dropdowns, comboboxes)
- **@visa/nova-styles** for base CSS/theme tokens
- **@visa/nova-icons-angular** for icons
- **Prettier** for formatting (120 char width, single quotes, no trailing commas, 2-space indent)

## Key Commands

```bash
pnpm build:lib           # Build the library (output: dist/nova-angular/)
pnpm build:docs          # Build the workshop documentation app
pnpm test:lib            # Run library unit tests
pnpm test:lib:watch      # Run library tests in watch mode
pnpm test:docs           # Run workshop tests
pnpm test                # Run all tests (both projects)
pnpm start               # Serve the workshop app locally
pnpm generate-routes     # Auto-generate workshop route files (run during prepare)
pnpm generate:themes     # Generate theme files (run during prepare)
pnpm api                 # Generate Compodoc API docs (run during prepare)
```

## Architecture Conventions

### Directives over Components

Most library building blocks are **standalone Directives**, not Components. They use the `host` property to bind CSS classes and attributes to the host element. Only use a Component when a template is truly needed (e.g., `CircularProgressComponent`, `IconComponent`, `InputContainerComponent`, `ListboxItemComponent`, `VisaLogoComponent`).

```typescript
// Typical directive pattern
@Directive({
  host: {
    class: 'v-button',
    '[class.v-button-secondary]': 'buttonColor() === "secondary"',
    '[attr.disabled]': 'disabled() ? "disabled" : null',
  },
  selector: '[v-button]',
  standalone: true,
})
export class ButtonDirective { ... }
```

### Signals-Based (Zoneless)

The library is fully migrated to Angular signals. Use these APIs exclusively:

- `input()` / `input.required()` for inputs (not `@Input()`)
- `model()` for two-way bindable values
- `output()` for outputs (or `EventEmitter` for pre-existing patterns)
- `signal()` / `computed()` for internal state
- `effect()` for side effects
- `contentChild()` / `contentChildren()` for content queries (not `@ContentChild`)
- `viewChild()` / `viewChildren()` for view queries

### CSS Class Convention

All directives apply `v-` prefixed CSS classes from `@visa/nova-styles`. Selectors follow attribute syntax: `[v-button]`, `[v-combobox]`, `[v-divider]`, etc.

### Constants Pattern

Use `as const` objects with derived types instead of TypeScript enums:

```typescript
export const ButtonSize = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const;
export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];
```

### Dependency Injection Patterns

- `ListenerService` is provided per-directive (in `providers: [ListenerService]`) for lifecycle-aware listener cleanup
- `FloatingUIService`, `NovaLibService`, `ListboxService` are `providedIn: 'root'`
- Use `inject()` function instead of constructor injection
- Parent/child communication is done via `inject(ParentDirective, { optional: true, host: true })`

### Input Aliasing

Inputs that map to native HTML attributes use the `alias` option:

```typescript
readonly disabledInput = input<boolean | null, unknown>(null, {
  alias: 'disabled',
  transform: booleanAttribute,
});
```

The internal signal name often has an `Input` suffix (e.g., `disabledInput`) while a separate `computed()` named `disabled` merges the user input with parent/child state.

## File Conventions

### License Header

Every `.ts`, `.html`, and `.scss` file in the library must include the Apache 2.0 license header:

```typescript
/**
 *              © 2025 Visa
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * ...
 **/
```

### Library Component File Structure

Each directive/component lives in its own directory under `projects/nova-angular/src/lib/`:

```
button/
  button.directive.ts         # The directive/component
  button.directive.spec.ts    # Unit tests
  button.constants.ts         # Related constants/types (if any)
  __snapshots__/              # Jest snapshots (if any)
```

### Workshop Example File Structure

Each example is a standalone component in a `*.docs.ts` file:

```
components/button/
  button.docs.ts              # Main docs page component (aggregates examples)
  button.docs.html            # Main docs page template
  button.docs.spec.ts         # Snapshot test for docs
  button.routes.ts            # Auto-generated route file
  primary-default/
    primary-default.docs.ts   # Individual example component
    primary-default.docs.html # Example template
```

Workshop example components use `/** #docs */` comment before `@Component` to mark them for route generation. They import `NovaLibModule` and are `standalone: true` with `ChangeDetectionStrategy.OnPush`.

## Testing Conventions

Tests use `@testing-library/angular`:

```typescript
import { render } from "@testing-library/angular";

it("should render defaults correctly", async () => {
  const { container } = await render("<button v-button>Content</button>", {
    imports: [ButtonDirective],
  });
  expect(container).toMatchSnapshot();
});
```

- Library tests: `projects/nova-angular/jest.config.ts`
- Workshop tests: `projects/workshop/jest.config.ts`
- Accessibility testing via `jest-axe` is available
- Snapshot testing is the primary approach for verifying rendered output

## Public API

All public exports go through `projects/nova-angular/src/index.ts`. This file exports:

- Three NgModules: `NovaLibModule`, `NovaCommonModule`, `NovaFormsModule`
- All directives and components individually (for tree-shaking)
- Constants and types
- Services (`FloatingUIService`, `NovaLibService`, `ComboboxService`, `ListboxService`, `IdGenerator`, `AppReadyService`)
- The `PaginationControl` utility

When adding a new component or directive, it must be:

1. Exported from `index.ts`
2. Added to the appropriate NgModule(s) in both `imports` and `exports` arrays

## Key Services

| Service             | Scope         | Purpose                                                          |
| ------------------- | ------------- | ---------------------------------------------------------------- |
| `NovaLibService`    | Root          | Arrow key navigation, tab management, aria-current               |
| `FloatingUIService` | Root          | Floating UI positioning for tooltips/dropdowns/comboboxes        |
| `ListboxService`    | Root          | Listbox scroll and selection management                          |
| `ComboboxService`   | Root          | Combobox filtering logic                                         |
| `ListenerService`   | Per-directive | Lifecycle-aware cleanup of Renderer2 listeners and subscriptions |
| `IdGenerator`       | Root          | Unique ID generation for accessibility attributes                |

## Workshop Route Generation

Route files (`*.routes.ts`) under `projects/workshop/` are **auto-generated** by `bin/route-gen.mjs`. Do not manually edit files marked with `/** This file is autogenerated */`. Run `pnpm generate-routes` to regenerate them.

## Pre-commit Hooks

Husky runs on pre-commit:

1. Prettier formatting on workshop component docs files
2. `bin/workshop/check-docs-naming.js` to verify naming conventions

## Content Guidelines (MCP Integration)

When writing or modifying workshop documentation, examples, or code:

1. **Always consult VPDS content guidelines** via the design-api-dev MCP before writing component documentation
2. **Use MCP tools to get guidelines** for the specific component you're documenting:
   - Use `mcp__design-api-dev__get_guidelines` with the library name, version, and component name
   - Apply the returned content guidelines to ensure documentation follows VPDS standards
3. **Check for component properties** using `mcp__design-api-dev__get_properties` to ensure all available properties are accurately documented
4. **Reference official examples** using `mcp__design-api-dev__get_examples` when creating workshop examples

This ensures all workshop content aligns with official VPDS content standards and guidelines.

## Things to Avoid

- Do not use TypeScript enums; use `as const` objects with derived types
- Do not use `@Input()` / `@Output()` / `@ContentChild()` decorators; use signal-based equivalents
- Do not use Zone.js-dependent patterns (e.g., `setTimeout` for change detection)
- Do not manually edit auto-generated route files
- Do not import from deep library paths; import from `@visa/nova-angular`
- Do not add components to NgModules without also exporting them
