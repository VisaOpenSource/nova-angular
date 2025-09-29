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
import { computed, Directive, inject, input, InputSignal, Signal, signal, WritableSignal } from '@angular/core';
import { IconToggle } from '../icon/icon.constants';
import { AccordionDetailsDirective } from '../accordion-item/accordion-item.directive';
import { FloatingUIContainer } from '../floating-ui-container/floating-ui-container.directive';

/**
 * This directive can be used alongside the <code>v-icon</code> component to show a toggle icon when the item is collapsed or expanded. <br>
 * It is for use in icons that are part of icon sprites and not standalone icons.
 */
@Directive({
  host: {
    '[class.v-accordion-toggle-icon]': '!!accordion'
  },
  selector: '[v-icon-toggle]',
  standalone: true
})
export class IconToggleDirective {
  protected readonly accordion: AccordionDetailsDirective | null = inject(AccordionDetailsDirective, {
    optional: true,
    host: true
  });
  private readonly floatingContainer: FloatingUIContainer | null = inject(FloatingUIContainer, {
    optional: true,
    host: true
  });
  readonly rotatedInternal: WritableSignal<boolean | null> = signal<boolean | null>(null); // used in floating-ui-container
  public readonly expanded: Signal<boolean | string | null> = computed<boolean | string | null>(
    () => this.rotatedInternal() ?? this.accordion?.expanded() ?? this.floatingContainer?.isShown() ?? null
  );

  /**
   * Icon to show when item is collapsed / hidden. <br>
   * Will render this icon when no <code>icon</code> or <code>customIcon</code> is provided to <code>v-icon</code>. <br>
   * Should refer to an icon in VPDS' [Icon Library](https://design.visa.com/components/icons-illustrations/).
   * @default 'chevron-right' / IconToggle.COLLAPSED <br>
   * @builtin true
   */
  readonly collapsedIconInput: InputSignal<string | null> = input<IconToggle | null | string>(null, {
    alias: 'collapsedIcon'
  });
  public readonly collapsedIcon: Signal<string> = computed(
    () => this.collapsedIconInput() ?? (!!this.accordion ? IconToggle.ACCORDION_COLLAPSED : IconToggle.COLLAPSED)
  );

  /**
   * Icon to show when item is expanded / shown. <br>
   * Will render this icon when no <code>icon</code> or <code>customIcon</code> is provided to <code>v-icon</code>. <br>
   * Should refer to an icon in VPDS' [Icon Library](https://design.visa.com/components/icons-illustrations/).
   * @default 'chevron-down' / IconToggle.EXPANDED <br>
   * @builtin true
   */
  readonly expandedIconInput: InputSignal<IconToggle | null> = input<IconToggle | null>(null, {
    alias: 'expandedIcon'
  });
  public readonly expandedIcon: Signal<string> = computed(
    () => this.expandedIconInput() ?? (!!this.accordion ? IconToggle.ACCORDION_EXPANDED : IconToggle.EXPANDED)
  );
}
