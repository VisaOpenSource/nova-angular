/**
 *              © 2025-2026 Visa
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
 **/
import {
  AfterContentInit,
  Directive,
  InputSignal,
  InputSignalWithTransform,
  ModelSignal,
  OnInit,
  OutputEmitterRef,
  Signal,
  afterNextRender,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  forwardRef,
  inject,
  input,
  model,
  output
} from '@angular/core';
import { ButtonDirective } from '../button/button.directive';
import { FloatingUITriggerDirective } from '../floating-ui-trigger/floating-ui-trigger.directive';
import { TabListDirective } from '../tab-list/tab-list.directive';

@Directive({
  host: {
    class: 'v-tab',

    '[attr.role]': 'role()',
    '[class.v-tab-section-title]': 'sectionTitle()'
  },
  selector: '[v-tab-item]',
  standalone: true
})
export class TabItemDirective implements OnInit, AfterContentInit {
  ngOnInit(): void {
    // ie `<div v-tab-item expanded>` will set the checked state to '', which is truthy
    if (this.expanded() === '') {
      this.expanded.set(true);
    }
  }

  constructor() {
    afterNextRender({
      write: () => {
        // if initial active state is set, set the active state to the initial value
        // ie `<li v-tab-item active>` will set the active state to '', which is truthy
        if (this.active() === '') {
          this.active.set(true);
        }
      }
    });

    // Watch for expanded state changes and emit disclosureTabToggled
    // This handles both click-triggered and programmatic changes
    let previousExpandedValue: boolean | null | string = null;
    let isFirstRun = true;

    effect(() => {
      if (!this.disclosureTab()) return;

      const currentExpandedValue = this.expanded();

      // Skip initial run and only emit if value changed
      if (!isFirstRun && currentExpandedValue !== previousExpandedValue) {
        this.disclosureTabToggled.emit(!!currentExpandedValue);

        // Update button aria-expanded if button exists
        const button = this.button();
        if (button) {
          button.ariaExpandedInternal.set(!!currentExpandedValue);
        }
      }

      previousExpandedValue = currentExpandedValue;
      isFirstRun = false;
    });
  }

  public readonly tabList: TabListDirective | null = inject(TabListDirective, {
    optional: true,
    host: true
  });

  public readonly button: Signal<ButtonDirective | undefined> = contentChild(forwardRef(() => ButtonDirective));
  public readonly stackedButton: Signal<ButtonDirective | undefined> = computed(() =>
    this.button()?.buttonStacked() ? this.button() : undefined
  );
  public readonly trigger: Signal<FloatingUITriggerDirective | undefined> = contentChild(
    forwardRef(() => FloatingUITriggerDirective)
  );

  /**
   * Marks item as selected when true. <br />
   * Can be used with navigational tabs as an alternative to Angular Router's routerLinkActive. When active is true, child buttons will automatically receive aria-current="page".
   * Use [active] when you want to handle the active state of the tab item.
   * Use (activeChange) when you want the library to handle the active state of the tab item, but get notified of changes.
   * Use [(active)] when you want the active state to reflect changes by both you and the library.
   */
  readonly active: ModelSignal<boolean | string | null> = model<boolean | string | null>(null);

  /**
   * Marks the tab as a disclosure item when true. <br />
   * This item cannot be active and should expand and collapse when pressed.
   * @default false
   */
  readonly disclosureTab: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Emits expanded state when the child button is clicked.
   */
  readonly disclosureTabToggled: OutputEmitterRef<boolean> = output<boolean>();

  /**
   * Sets expanded state of disclosure tab item.
   * Use [expanded] when you want to handle the expanded state of the tab item.
   * Use (expandedChange) when you want the library to handle the expanded state of the tab item, but get notified of changes.
   * Use [(expanded)] when you want the expanded state to reflect changes by both you and the library.

   * @default false
   */
  readonly expanded: ModelSignal<boolean | null | string> = model<boolean | null | string>(null);

  /**
   * Sets role of tab item. <br />
   * If no custom role is set, role may be set by a parent component (nav, tabs, etc.).
   * @builtin true
   */
  readonly roleInput: InputSignal<HTMLElement['role']> = input<HTMLElement['role']>(null, { alias: 'role' });
  protected readonly role: Signal<HTMLElement['role'] | undefined> = computed(
    () =>
      this.roleInput() ??
      (this.tabList
        ? this.trigger() ||
          this.disclosureTab() ||
          this.sectionTitle() ||
          this.tabList?.tabListParent ||
          this.tabList?.navParent
          ? null
          : 'none'
        : null)
  );

  /**
   * Marks the tab as a section title when true. <br />
   * This item titles a subset of tabs and is not interactive.
   * @default false
   */
  readonly sectionTitle: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  ngAfterContentInit(): void {
    const button = this.button();
    if (!button) return;

    button.listenerService.subscriptions.push(
      button.clicked.subscribe(() => {
        this.active.set(true);

        if (!this.disclosureTab()) return;

        const newExpandedValue = !this.expanded();
        this.expanded.set(newExpandedValue);
      })
    );
    if (!this.disclosureTab()) return;
    // set the initial expanded state
    button.ariaExpandedInternal.set(!!this.expanded());
  }
}
