<!--
 *              © 2025 Visa
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
# Nova Angular 6 comprehensive migration guide

## Table of contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Migration steps](#migration-steps)
- [Breaking changes](#breaking-changes)
  - [Angular support](#angular-support)
  - [Dependencies](#dependencies)
  - [Services](#services)
  - [Components](#components)
  - [Utilities](#utilities)
- [Benefits after migration](#benefits-after-migration)
- [Troubleshooting](#troubleshooting)
- [Looking forward](#looking-forward)

## Overview

Nova Angular 6 represents the largest architectural change to the library since its release. The codebase has been refactored to be more efficient and leverage the latest Angular features, with a focus on:

- **Zoneless Angular**: Removed Zone.js dependency for more efficient change detection
- **Signals-based**: Migrated to Angular's signals for reactive state management
- **User priority**: Inputs now take precedence over internal state

This guide will help you navigate the migration process from Nova Angular 5.1.3 or higher to version 6.

## Prerequisites

Before starting the **migration:**

1. **Update to Nova Angular 5.2.0+**: 5.2.0 is the earliest Nova Angular version that supports an overlapping Angular version as 6.0.0. For the simplest migration, update to 5.2.2. This version includes deprecation warnings to ease the upgrade process
2. **Update to Angular 18**: Nova Angular 6 requires Angular 18 or higher. Follow [Angular's Update Guide](https://angular.dev/update-guide?v=17.0-18.0&l=1).
3. **Audit your codebase**: Identify where you're using Nova Angular components, especially any custom implementations or service injections

## Migration steps

Follow these steps to migrate your application to Nova Angular 6:

### 1. Install Nova Angular 6

```bash
npm install @visa/nova-angular@latest
```

### 2. Update Angular (optional)

Now that you have updated to 6.0.0, you can move to an Angular version higher than 18. Follow [Angular's Update Guide](https://angular.dev/update-guide?v=18.0-19.0&l=1) to go from the version you're on to a new version.

### 3. Update dependencies

If you're using components that require specific functionality:

- For Dialog components: `npm install @angular/cdk`
- For Icon components: `npm install @visa/nova-icons-angular`

Some package managers may require you to install our peer dependency packages if you don't have them already:
  - `"@angular/forms": "^18 || ^19 || ^20"`
  - `"@floating-ui/dom": "^1.6.5"`
  - `"@visa/nova-styles": "^1.6.3"`

### 4. Update import statements

If you are importing the entire `NovaLibModule` rather than individual components, you can skip this step.

If you are importing specific components or services that have been renamed or removed, update your import statements accordingly. These include:
| Before                       | After                 |
| ---------------------------- | --------------------- |
| `AvatarRoleImgDirective`     | `AvatarDirective`     |
| `ButtonAsDisabledATag`       | `ButtonDirective`     |
| `ButtonDisabledDirective`    | `ButtonDirective`     |
| `ButtonIconDirective`        | `ButtonDirective`     |
| `ButtonStackedDirective`     | `ButtonDirective`     |
| `DialogComponent`            | `DialogDirective`     |
| `PanelComponent`             | `PanelDirective`      |
| `TabItemDisclosureDirective` | `TabItemDirective`    |
| `TbodyDirective`             | **removed**           |
| `TrDirective`                | **removed**           |
| `TypographyColor`            | `TypographyDirective` |
| `SwitchLabel`                | `LabelDirective`      |


### 5. Address breaking changes

While we tried to mitigate breaking changes as much as possible, some were unavoidable. Follow the [Breaking Changes](#breaking-changes) section below to update your components based on the changes in Nova Angular 6.


### 6. Interact with component properties via HTML only

Nova Angular 6 uses a new pattern for input properties that prioritizes user inputs over internal state. Update your component usage to take advantage of this pattern:

**Typescript**
```typescript
// Before (Nova Angular 5)
@ViewChild(ListboxDirective) listbox: ListboxDirective;

handleReset() {
  this.listbox.value = '';
}

// After (Nova Angular 6)
readonly value: WritableSignal<SingleSelectValue | null> = signal<SingleSelectValue | null>(null);

handleReset() {
  this.value.set(null);
}
```

**HTML**
```html
// Before (Nova Angular 5)
<ul v-listbox...>...</ul>

// After (Nova Angular 6)
<ul v-listbox [(value)]="value">...</ul>
```

### 7. Implement Angular best practices
Familiarize yourself with the latest [Angular best practices](https://angular.dev/style-guide) and implement them into your application. We specifically recommend updating to the new [control flow](https://angular.dev/guide/templates/control-flow).

### 8. Test your application

Thoroughly test your application to ensure all components are functioning correctly after the migration.

## Breaking changes

### Angular support

- **Dropped Angular 16/17 support**: Nova Angular 6 requires Angular 18 or higher

### Dependencies

The following dependencies have been removed and are now optional:

- `@angular/cdk`
- `@angular/router`
- `rxjs`
- `zone.js`

If your application requires these dependencies, you'll need to install them separately.

### Services

#### Removed services

The following services have been removed and replaced:

- **AccordionService**
  - Replaced with HTML details/summary elements
    - **Migration**: Use native HTML elements instead

- **PaginationService**
  - Replaced with `PaginationControl`
    - **Migration**: Update your pagination implementation to use `PaginationControl`
  - Example:

```html
<!-- Before (elements stripped of aria and style inputs for comparison) -->
 <nav>
  <ul v-pagination>
    <li>
      <button
        v-button-icon
        [disabled]="isFirst()"
        (click)="changePage(startPage)"
      >
        <svg v-icon-visa-arrow-start-tiny></svg>
      </button>
    </li>
    <li>
      <button
        v-button-icon
        [disabled]="isFirst()"
        (click)="changePage(currentPage-1)"
      >
        <svg v-icon-visa-chevron-left-tiny></svg>
      </button>
    </li>
    <li>
      <button
        (click)="changePage(startPage)"
        [aria-current]="currentPage === startPage ? 'page' : false"
        v-button
      >
        {{startPage}}
      </button>
    </li>
    <li v-pagination-overflow *ngIf="pagesExceedBlockLimit && showStartingEllipses">
      <svg v-icon-visa-option-horizontal-tiny></svg>
    </li>
    <ng-container *ngFor="let page of visiblePages()">
      <li>
        <button
          (click)="changePage(page)"
          [aria-current]="currentPage === page ? 'page' : false"
          v-button
        >
          {{page}}
        </button>
      </li>
    </ng-container>
    <li v-pagination-overflow *ngIf="showEndingEllipses && pagesExceedBlockLimit">
      <svg v-icon-visa-option-horizontal-tiny></svg>
    </li>
    <li>
      <button
        (click)="changePage(lastPage)"
        [aria-current]="currentPage == lastPage ? 'page' : false"
        v-button
      >
        {{lastPage}}
      </button>
    </li>
    <li>
      <button
        v-button-icon
        [disabled]="isLast()"
        (click)="changePage(currentPage+1)"
      >
        <svg v-icon-visa-chevron-right-tiny></svg>
      </button>
    </li>
    <li>
      <button
        v-button-icon
        [disabled]="isLast()"
        (click)="changePage(lastPage)"
      >
        <svg v-icon-visa-arrow-end-tiny></svg>
      </button>
    </li>
  </ul>
</nav>

<!-- After (elements stripped of aria and style inputs for comparison) -->
<nav>
  <ul v-pagination>
    <li>
      <button
        v-button-icon
        [disabled]="paginationControl.isFirstPage()"
        (click)="paginationControl.goToFirstPage()"
      >
        <svg v-icon-visa-arrow-start-tiny />
      </button>
    </li>
    <li>
      <button
        v-button-icon
        [disabled]="paginationControl.isFirstPage()"
        (click)="paginationControl.goToPreviousPage()"
      >
        <svg v-icon-visa-chevron-left-tiny />
      </button>
    </li>
    <!-- create all the visible pages here -->
    @for (page of paginationControl.pages(); track $index) {
      @if (page !== -1) {
        <li>
          <button
            [aria-current]="paginationControl.isCurrentPage(page) ? 'page' : false"
            v-button
            (click)="paginationControl.goToPage(page)"
          >
            {{ page }}
          </button>
        </li>
      } @else {
      <li v-pagination-overflow>
        <svg v-icon-visa-option-horizontal-tiny />
      </li>
      }
    }
    <li>
      <button
        v-button-icon
        [disabled]="paginationControl.isLastPage()"
        (click)="paginationControl.goToNextPage()"
      >
        <svg v-icon-visa-chevron-right-tiny />
      </button>
    </li>
    <li>
      <button
        v-button-icon
        [disabled]="paginationControl.isLastPage()"
        (click)="paginationControl.goToLastPage()"
      >
        <svg v-icon-visa-arrow-end-tiny />
      </button>
    </li>
  </ul>
</nav>
```

```typescript
// Before
currentPage: number = 1;
middleLimit: number = 5;
startEndLimit: number = 5;
startPage: number = 1;
totalPages: number = 100;
lastPage = this.totalPages + this.startPage - 1;
visiblePages = computed(() => this.pagination?.paginationService.visiblePages());
isFirst = computed(() => this.pagination?.paginationService.isFirst());
isLast = computed(() => this.pagination?.paginationService.isLast());
pagesExceedBlockLimit = true;
showStartingEllipses: boolean = false;
showEndingEllipses: boolean = true;

changePage(page: number) {
  this.currentPage = this.pagination.paginationService.changePage(page);
  this.showStartingEllipses = this.currentPage >= this.startEndLimit + this.startPage;
  this.showEndingEllipses = this.currentPage <= this.lastPage - this.startEndLimit;
}

ngAfterViewInit() {
  if (this.pagination) {
    this.pagination.paginationService.currentPage = this.currentPage;
    this.pagination.paginationService.middleLimit = this.middleLimit;
    this.pagination.paginationService.startEndLimit = this.startEndLimit;
    this.pagination.paginationService.startPage = this.startPage;
    this.pagination.paginationService.totalPages = this.totalPages;
    if (this.totalPages <= this.startEndLimit) {
      this.pagesExceedBlockLimit = false;
    }

    this.visiblePages = computed(() => this.pagination.paginationService.visiblePages());
    this.isFirst = computed(() => this.pagination.paginationService.isFirst());
    this.isLast = computed(() => this.pagination.paginationService.isLast());

    this.pagination.paginationService.initializePages(this.currentPage);
  }
}

// After
readonly paginationControl = new PaginationControl({
  blockMaxLength: 5,
  defaultSelected: 1,
  defaultTotalPages: 100
});
```

- **UuidGenerator**
  - Replaced with `IdGenerator` for deterministic IDs
    - Replace `UuidGenerator` with `IdGenerator`
  - Example:

  ```typescript
  // Before
  id = this.uuidGenerator.generate(); // e.g., "f47ac10b-58cc-4372-a567-0e02b2c3d479"

  // After
  id = this.idGenerator.newId('button'); // e.g., "button-0"
  ```

#### Modified services
- **AppReadyService**
  - Not entirely removed, but it's recommended to use `afterNextRender` from `@angular/core` where possible
    - Consider replacing `AppReadyService` usage with `afterNextRender` for better performance and compatibility with zoneless Angular

- **NovaLibService**
  - `getCurrentRoute` method and `routeChange` observable are removed
    - Use Angular's Router and toSignal instead (see breadcrumb component examples)
  - `selectItems`, `selectItem`, `deselectItems`, `deselectItem` are deprecated from this service and moved to `ListboxService`
  - `setAriaCurrent` method is deprecated - use `handleAriaCurrent` for a list of LinkDirectives or manipulate the property via template binding to `[attr.aria-current]`

### Components

#### All components

- Nearly all internal properties have been migrated to signals
- If you inject directives programmatically, you'll need to update how you interface with them
- **Recommendation:** Interface with components through HTML inputs rather than directly accessing properties

#### Accordion

- The custom button markup is no longer supported. If you haven't yet, move to the native details and summary markup.
**Before:**
```html
<div v-accordion>
  <button v-button v-accordion-heading>
    <v-icon-visa-toggle>
      <svg v-toggle-default-template v-icon-visa-chevron-right-tiny></svg>
      <svg v-toggle-rotated-template v-icon-visa-chevron-down-tiny></svg>
    </v-icon-visa-toggle>
    Accordion title
  </button>
  <div v-accordion-panel>This is required text that describes the accordion section in more detail.</div>
  ...
</div>
```

**After:**
```html
<div v-accordion>
  <details v-accordion-item>
    <summary v-accordion-heading v-button>
      <v-icon-visa-toggle>
        <svg v-toggle-default-template v-icon-visa-chevron-right-tiny />
        <svg v-toggle-rotated-template v-icon-visa-chevron-down-tiny />
      </v-icon-visa-toggle>
      <div vFlex vAlignItemsCenter vGap="6">Accordion title</div>
    </summary>
    <div v-accordion-panel>This is required text that describes the accordion section in more detail.</div>
  </details>
  ...
</div>
```
---
- `ToggleIcon` enum moved to `IconToggle` to simplify enums offered.

| Before                 | After                            |
| ---------------------- | -------------------------------- |
| `ToggleIcon.EXPANDED`  | `IconToggle.ACCORDION_EXPANDED`  |
| `ToggleIcon.COLLAPSED` | `IconToggle.ACCORDION_COLLAPSED` |

#### Anchor Link Menu

- `AnchorLinkMenuHeader` no longer applies `id` by default
- Users can no longer access `AnchorLinkMenuDirective.ariaLabel` as the property was removed. Use the HTML `aria-label` property as needed.

#### Base Interactive

- Removed `BaseInteractiveDirective`
- Replace event handlers:

**Before:**
```html
<input v-input (blurred)="handleBlur($event)" (clicked)="handleClick($event)" (focused)="handleFocus($event)"/>
```

**After:**
```html
<input v-input
(blur)="handleBlur($event)" (click)="handleClick($event)" (focus)="handleFocus($event)"/>
```

#### Button

- `aria-controls` is a no-op and was removed. Replace `[aria-controls]` with the HTML attribute `[attr.aria-controls]` or `aria-controls` depending on usage.

#### Checkbox

- Users can no longer access `CheckboxDirective.value` as the property was a no-op and is removed.

#### Combobox

- No longer supports setting the value to an empty string (`''`)
  - To reset the value, set it to `null`, `{ label: '', value: ''}`, or `{ label: '', value: []}`
- `autoFilterDisplayedItems` is deprecated.
  - Use `autoFilter(combobox, listItems, 'label')` instead, where listItems is the same list you pass to the combobox template.
  - If you copied our documentation logic, this will allow you to drop the `extractList` method
**Before**
```typescript
  filteredItems = this.cardTypes;

  ngAfterViewInit(): void {
    if (this.combobox) {
      // ComboboxService provider needed to get unique reference to filteredListEmitter
      this.combobox.filteredListEmitter.subscribe((listItems: ListboxItemComponent[]) => {
        this.extractList(listItems);
      });

      this.comboboxService.autoFilterDisplayedItems(this.combobox);
      this.cdRef.detectChanges(); // force change detection for initial view

      // autoSelectItem MUST be called after autoFilterDisplayedItems
      this.comboboxService.autoSelectItem(this.combobox);
    }
  }

  /**
   * This function takes the ListboxItems[] and transforms it into the filtered array of the same shape of cardTypes ([{ label: '', value: '' }])
   * @param listItems
   */
  extractList(listItems: ListboxItemComponent[]) {
    let values: (string | number)[] = [];
    if (!listItems.length) this.filteredItems = [];
    listItems.forEach((item: ListboxItemComponent) => {
      if (item.value) values.push(item.value);
    });
    this.filteredItems = this.cardTypes.filter((item) => values.includes(item.value));
  }
```

**After**
```typescript
  readonly filteredItems = signal<ListboxItemType[]>(this.cardTypes);

  ngAfterViewInit(): void {
    // ComboboxService provider needed to get unique reference to filteredListEmitter
    this.combobox().filteredListEmitter.subscribe((listItems: ListboxItemType[]) => {
      this.filteredItems.set(listItems);
    });

    this.comboboxService?.autoFilterBasedOnList(this.combobox(), this.cardTypes);
    this.comboboxService?.autoSelectItem(this.combobox());
  }
```
---
- `v-combobox` no longer adds `v-floating-ui-container` logic by default
  - Add both `v-combobox v-floating-ui-container` to your element

**Before:**
```html
<div v-combobox>...</div>
```

**After:**
```html
<div v-combobox v-floating-ui-container>...</div>
```
---
- Per Angular best practices, value recognition is now top-down. To bind a value to combobox, ensure it is on `v-combobox` rather than `v-listbox` or `v-input`

**Before:**

The code below shows a value passed to a listbox directly, but the same is true if you are passing `active` to a `v-listbox-item` or if you were passing `value` to `v-input` directly.

```html
<div v-combobox>
  ...
  <div v-listbox-container v-floating-ui-element>
    <ul v-listbox value="option-a">
      <li v-listbox-item value="option-a">Option A</li>
      <li v-listbox-item value="option-b">Option B</li>
    </ul>
  </div>
</div>
```

**After:**
```html
<div v-combobox v-floating-ui-container [value]="{ label: 'Option A', value: 'option-a'}">
  ...
  <div v-listbox-container v-floating-ui-element>
    <ul v-listbox>
      <li v-listbox-item value="option-a">Option A</li>
      <li v-listbox-item value="option-b">Option B</li>
    </ul>
  </div>
</div>
```

#### Dialog

- `DialogComponent` converted to `DialogDirective`
- Requires focus trapping implementation
  - Wrap the content of the `<dialog>` with `<div cdkTrapFocus cdkTrapFocusAutoCapture ...>` as shown below.
- No longer applies id by default

**Before:**
```typescript
import { Component, ElementRef, viewChild } from '@angular/core';
import { DialogComponent, NovaLibModule } from '@visa/nova-angular';

@Component({
  imports: [NovaLibModule],
  selector: "some-component",
  standalone: true,
  template: `<dialog v-dialog v-message>
    <div v-message-content ...>
      {{ ... }}
    </div>
    <button
      v-button-icon
      ...
    >
      {{ ... }}
    </button>
  </dialog>`
})
export class SomeComponent(){
  readonly dialog = viewChild<DialogComponent, ElementRef<HTMLDialogElement>>(DialogComponent, {
    read: ElementRef
  });

  toggleDialog(open: boolean) {
    open ? this.dialog()?.nativeElement.showModal() : this.dialog()?.nativeElement.close();
  }
}
```

**After:**
```typescript
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Component, ElementRef, viewChild } from '@angular/core';
import { DialogDirective, NovaLibModule } from '@visa/nova-angular';

@Component({
  imports: [NovaLibModule, CdkTrapFocus],
  selector: "some-component",
  standalone: true,
  template: `<dialog v-dialog v-message>
    <div cdkTrapFocus cdkTrapFocusAutoCapture vFlex vFlexRow>
      <div v-message-content ...>
        {{ ... }}
      </div>
      <button
        v-button-icon
        ...
      >
        {{ ... }}
      </button>
    </div>
  </dialog>`
})
export class SomeComponent(){
  readonly dialog = viewChild<DialogDirective, ElementRef<HTMLDialogElement>>(DialogDirective, {
    read: ElementRef
  });

  toggleDialog(open: boolean) {
    open ? this.dialog()?.nativeElement.showModal() : this.dialog()?.nativeElement.close();
  }
}
```

#### DropdownMenu

- `DropdownMenuDirective` - `zIndex` renamed to `z-index` to align with native CSS
- Padding has been built into the class via Nova Styles, and you may no longer need to add any padding utilities depending on your version of Nova Styles.

**Before:**
```html
<button v-dropdown-item vPX="8" vPY="11">Label 1</button>
```

**After:**
```html
<button v-dropdown-item>Label 1</button>
```

#### Floating UI Element

- `FloatingUIElementDirective` - `zIndex` renamed to `z-index` to align with native CSS

#### Listbox

- No longer supports variant with radio and checkbox components embedded (styles are still available, but state management is limited)
- `v-listbox-item` no longer supports `invalid` since there is no single listbox item invalid state.
  - set the invalid state on the `v-listbox` instead
- Deprecated Listbox service method `selectContiguousItems`
  - use `selectContiguousItems` instead

#### Panel

- `PanelDirective` no longer applies `id` by default
- Converted `PanelComponent` to `PanelDirective`
- Make sure `<button v-panel-toggle>...</button>` is the first child of `<div v-panel>...</div>` if your panel has a panel toggle

**Before:**
```html
<dialog
  v-panel
  expandable
  vML="auto"
  [expanded]="panelOpen()"
  aria-describedby="modal-expandable-subtitle"
  aria-labelledby="modal-expandable-title"
>
  @if(panelOpen()){
  <div v-panel-content>
    <header vFlex vJustifyContentBetween vGap="4">
      <h3 vTypography="headline-4" id="modal-expandable-title">Panel title</h3>
    </header>
    <div v-panel-body>
      <h4 vTypography="subtitle-2" id="modal-expandable-subtitle">Subtitle of panel</h4>
      <p>
        panel content shows here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse purus sem,
        fringilla ac lorem vel, maxialiquam urna.
      </p>
    </div>
  </div>
  }

  <button
    v-panel-toggle
    autofocus
    buttonSize="large"
    v-button-icon
    aria-label="collapse panel"
    (click)="panelOpen.set(false)"
  >
    <svg v-icon-visa-media-fast-forward-tiny v-icon-two-color />
  </button>
</dialog>
```

**After:**
```html
<dialog
  v-panel
  expandable
  vML="auto"
  [expanded]="panelOpen()"
  aria-describedby="modal-expandable-subtitle"
  aria-labelledby="modal-expandable-title"
>
  <button
    v-panel-toggle
    autofocus
    buttonSize="large"
    v-button-icon
    aria-label="collapse panel"
    (click)="panelOpen.set(false)"
  >
    <svg v-icon-visa-media-fast-forward-tiny v-icon-two-color />
  </button>

  @if(panelOpen()){
  <div v-panel-content>
    <header vFlex vJustifyContentBetween vGap="4">
      <h3 vTypography="headline-4" id="modal-expandable-title">Panel title</h3>
    </header>
    <div v-panel-body>
      <h4 vTypography="subtitle-2" id="modal-expandable-subtitle">Subtitle of panel</h4>
      <p>
        panel content shows here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse purus sem,
        fringilla ac lorem vel, maxialiquam urna.
      </p>
    </div>
  </div>
  }
</dialog>
```

#### Switch

- `SwitchDirective` no longer applies `id` by default

#### Table
---

- `TbodyDirective` (`v-tbody`) was removed since it didn't bind to any properties or add any logic

**Before:**
```html
<tbody v-tbody>...</tbody>
```

**After:**
```html
<tbody>...</tbody>
```
---
- `TrDirective` (`v-tr`) was removed since it didn't bind to any properties or add any logic

**Before:**
```html
<tr v-tr>...</tr>
```

**After:**
```html
<tr>...</tr>
```

#### Toggle

- `ToggleButton` - `required` property was removed since it didn't add any functionality
- No longer supports variant with radio and checkbox components embedded (styles are still available, but state management is limited)

#### Tooltip

- `TooltipDirective` - `zIndex` renamed to `z-index` to align with native CSS


#### Wizard

- The `_activeIndex` property is removed from `WizardDirective`
- The `complete` and `invalid` properties are removed from `WizardStepDirective`

### Utilities

- `vGap` - no longer adds `vFlex` by default. If the element does not have `display: flex` you will have to explicitly add css or a flex display directive.
- This allows you to now easily add `vGap` to grid layouts

**Before:**
```html
<div vGap>...</div>
```

**After:**
```html
<div vGap vFlex>...</div>
```

## Implementation details

### Input property prioritization

Nova Angular 6 implements a new pattern for handling input properties that ensures user-provided inputs always take precedence over internal state. This creates a more predictable API that respects developer intentions.

The pattern uses signals and computed properties:

```typescript
// Example from a component
readonly buttonSizeInput = input<ButtonSize>('medium');  // User input with default
readonly buttonSizeInternal = signal<ButtonSize>('medium');  // Internal state
// User input is always prioritized over internal state
readonly buttonSize = computed(() => this.buttonSizeInput() ?? this.buttonSizeInternal());
```

This pattern is used throughout the library and provides several benefits:
- Prevents internal component state from overriding developer-specified inputs
- Creates a more predictable API
- Reduces support requests and allows for workarounds
- Allows components to have internal state that doesn't conflict with user inputs

### Deterministic IDs

Nova Angular 6 replaces random UUID generation with deterministic ID generation. This ensures consistent behavior across renders while still providing unique identifiers.

The ID generator creates predictable IDs based on component type and instance count:

```typescript
// Example usage
id = this.idGenerator.newId('button'); // Generates "button-0" for first instance
```

Benefits of deterministic IDs:
- Makes testing more predictable and reliable
- Simplifies analytics tracking
- Ensures consistent behavior across renders
- Improves debugging experience

### PaginationControl

The new PaginationControl replaces PaginationService with a more flexible, signals-based approach:

```typescript
// Creating a basic pagination control
readonly paginationControl = new PaginationControl({
  totalItems: 100,
  itemsPerPage: 10
});

// Using the pagination control
paginationControl.goToNextPage();
paginationControl.goToPage(5);
const currentPage = paginationControl.currentPage;
```

Key features:
- Signals-based reactivity
- Support for bringing your own signal for selected page
- Better type safety
- Easier to use with multiple pagination instances
- More customization options

### Technical improvements

- Migrated from `@HostListener`/`@HostBinding` to `host: {}` property
- Added deterministic IDs for better testing and analytics
- Improved component customization options
- Supports Angular 18, 19, and 20
- Reactive architecture with signals
- More atomic directives
- Smaller bundle size of library
- Faster components
- Less services

## Troubleshooting

### Common issues

1. **Component not rendering correctly**
   - Check if you're using any removed directives like `TbodyDirective` or `TrDirective`
   - Ensure you've updated event handlers from custom events to native events

2. **Service injection errors**
   - If you're injecting services that have been removed, update to the recommended alternatives

3. **Styling issues**
   - If using `vGap`, make sure to add `vFlex` if you need flex layout
   - Update any renamed properties like `zIndex` to `z-index`

4. **Dialog focus issues**
   - Ensure you've added focus trapping to your dialogs
   - Import and use `CdkTrapFocus` from `@angular/cdk/a11y`

## Looking forward

Nova Angular 6 sets the foundation for a more native, lightweight component library that will:

- Allow developers to bring their own state/logic
- Focus on providing styles and optional controllers
- Simplify future Angular version upgrades
- Continue improving performance and developer experience

The future of Nova Angular is more native, customizable, and lightweight. The plan going forward is to migrate to a more native approach to components, and do less under-the-hood logic. This allows users to bring their own state/logic, making the library more flexible and easier to integrate with different application architectures.
