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
import { computed, Directive, ElementRef, inject, signal, Signal, WritableSignal } from '@angular/core';
import { FloatingUIContainer } from '../floating-ui-container/floating-ui-container.directive';
import { ButtonDirective } from '../button/button.directive';

@Directive({
  host: {
    class: 'v-dropdown',

    '[attr.aria-controls]': '(triggersDropdownMenu() && button) ? floatingElemID() : null',
    '[attr.aria-describedby]': 'triggersTooltip() ? floatingElemID() : null',
    '[attr.aria-expanded]': '(triggersDropdownMenu() && button) ? isShown() : null'
  },
  selector: '[v-floating-ui-trigger]',
  standalone: true
})
export class FloatingUITriggerDirective {
  public readonly el: ElementRef = inject(ElementRef);
  public readonly button: ButtonDirective | null = inject(ButtonDirective, {
    optional: true,
    host: true
  });
  private readonly floatingUIContainer: FloatingUIContainer | null = inject(FloatingUIContainer, {
    optional: true,
    host: true
  });
  // the following are determined by floating-ui-container and used to set correct aria roles
  protected readonly floatingElemID: Signal<string | null> = computed(
    () => this.floatingUIContainer?.floatingElementID() ?? null
  );
  protected readonly triggersDropdownMenu: Signal<boolean | null> = computed(
    () => this.floatingUIContainer?.triggersDropdownMenu() ?? null
  );
  protected readonly triggersTooltip: Signal<boolean | null> = computed(
    () => this.floatingUIContainer?.triggersTooltip() ?? null
  );
  public readonly isShown: WritableSignal<boolean> = signal(false); // aria-expanded should be set to true or false if shown
}
