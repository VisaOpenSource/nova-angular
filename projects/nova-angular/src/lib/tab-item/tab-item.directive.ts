/**
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
 **/
import {
  AfterContentInit,
  Directive,
  InputSignal,
  InputSignalWithTransform,
  ModelSignal,
  OutputEmitterRef,
  Signal,
  WritableSignal,
  afterNextRender,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal
} from '@angular/core';
import { ButtonDirective } from '../button/button.directive';
import { FloatingUITriggerDirective } from '../floating-ui-trigger/floating-ui-trigger.directive';
import { TabListDirective } from '../tab-list/tab-list.directive';
import { defaultEffectParam } from '../nova-lib.constants';

@Directive({
  host: {
    class: 'v-tab',

    '[attr.role]': 'role()',
    '[class.v-tab-section-title]': 'sectionTitle()'
  },
  selector: '[v-tab-item]',
  standalone: true
})
export class TabItemDirective implements AfterContentInit {
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
   * Not to be used with navigational tabs. To set a navigational tab as active, view [Angular's tutorial on identifying the active route](https://angular.dev/guide/routing/router-tutorial#identify-the-active-route).
   * Use [active] when you want to handle the active state of the listbox item.
   * Use (activeChange) when you want the library to handle the active state of the listbox item, but get notified of changes.
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
   * @default false
   */
  readonly expandedInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'expanded',
    transform: booleanAttribute
  });
  private readonly expandedInternal: WritableSignal<boolean | null> = signal<boolean | null>(null);
  readonly expanded: Signal<boolean | null> = computed(() => this.expandedInput() ?? this.expandedInternal());
  private readonly expandedEffect = effect(() => {
    const expanded = this.expanded();
    if (expanded === null || !this.disclosureTab()) return;
    this.disclosureTabToggled.emit(expanded);
  }, defaultEffectParam);

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

        this.expandedInternal.update((expanded) => !expanded);
        // update the aria-expanded attribute on the button
        button.ariaExpandedInternal.set(!!this.expanded());
      })
    );
    if (!this.disclosureTab()) return;
    // set the initial expanded state
    button.ariaExpandedInternal.set(!!this.expanded());
  }
}
