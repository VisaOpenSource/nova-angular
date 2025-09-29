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
  booleanAttribute,
  computed,
  contentChild,
  Directive,
  input,
  InputSignal,
  InputSignalWithTransform,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import { PanelToggleDirective } from '../panel-toggle-button/panel-toggle-button.directive';

@Directive({
  host: {
    class: 'v-panel',

    '[attr.aria-modal]': 'responsive() ? null : true',
    '[attr.role]': 'role()',
    '[class.v-panel-expandable]': 'expandable() || toggleButton()',
    '[class.v-panel-responsive]': 'responsive()',
    '[class.v-panel-skrim]': 'skrim()'
  },
  selector: '[v-panel]',
  standalone: true
})
export class PanelDirective implements AfterContentInit {
  protected readonly toggleButton: Signal<PanelToggleDirective | undefined> = contentChild(PanelToggleDirective);

  /**
   * Sets panel to expandable variant when true.
   * @default false
   * @default true if panel contains a <code>PanelToggleDirective</code>.
   */
  readonly expandable: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Expands panel by default when true. <br />
   * To be used when <code>expandable</code> is true.
   * @default false
   */
  readonly expandedInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'expanded',
    transform: booleanAttribute
  });
  private readonly expandedInternal: WritableSignal<boolean | null> = signal<boolean | null>(null);
  public readonly expanded = computed(() => this.expandedInput() ?? this.expandedInternal());

  /**
   * Sets panel to responsive variant when true and places panel on same layer as content around it.
   * @default false
   */
  readonly responsive: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets custom role.
   * @default 'dialog' if panel is not responsive.
   * @builtin true
   */
  readonly roleInput: InputSignal<string | null> = input<HTMLElement['role']>(null, { alias: 'role' });
  protected readonly role: Signal<string | null> = computed(
    () => this.roleInput() ?? (this.responsive() ? null : 'dialog')
  );

  /**
   * Adds skrim (shadow overlay) to modal variant (responsive="false") when true.
   * @default false
   */
  readonly skrim: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  ngAfterContentInit(): void {
    const toggleButton = this.toggleButton()?.button;
    if (!toggleButton) return;
    toggleButton.ariaExpandedInternal.set(!!this.expanded());

    // subscriptions will be cleaned up by the base interactive directive
    toggleButton.listenerService.subscriptions.push(
      toggleButton.clicked.subscribe(() => {
        this.expandedInternal.update((expanded) => !expanded);
        toggleButton.ariaExpandedInternal.set(this.expanded());
      })
    );
  }
}
