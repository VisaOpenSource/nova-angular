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
  booleanAttribute,
  computed,
  Directive,
  inject,
  input,
  InputSignal,
  InputSignalWithTransform,
  Signal
} from '@angular/core';
import { AccordionDetailsDirective } from '../accordion-item/accordion-item.directive';

@Directive({
  host: {
    class: 'v-wizard-step',

    '[attr.aria-current]': 'ariaCurrent() ?? (active() ? "step" : null)'
  },
  selector: '[v-wizard-step]',
  standalone: true
})
export class WizardStepDirective {
  private readonly accordion: AccordionDetailsDirective | null = inject(AccordionDetailsDirective, { optional: true });

  /**
   * Marks the step as current step when true.
   * @default false
   */
  readonly activeInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'active',
    transform: booleanAttribute
  });
  protected readonly active: Signal<string | boolean | null> = computed(
    () => this.activeInput() ?? this.accordion?.expanded() ?? null
  );

  readonly ariaCurrent: InputSignal<string | null> = input<HTMLElement['ariaCurrent'] | null>(null, {
    alias: 'aria-current'
  });
}
