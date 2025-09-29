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
import { computed, contentChild, Directive, forwardRef, inject, input, InputSignal, Signal } from '@angular/core';
import { IdGenerator } from '../id-generator/id-generator.service';
import { ListboxDirective } from '../listbox/listbox.directive';

@Directive({
  host: {
    class: 'v-listbox-container',
    role: 'listbox',

    '[attr.aria-activedescendant]': 'ariaActiveDescendant()',
    '[attr.aria-invalid]': 'listbox()?.invalid() ? "true" : null',
    '[attr.aria-multiselectable]': 'listbox()?.multiselect() ? "true" : null',
    '[attr.aria-required]': 'listbox()?.required() ? "true" : null',
    '[class.v-listbox-disabled]': 'listbox()?.disabled()',
    '[class.v-listbox-error]': 'listbox()?.invalid()'
  },
  selector: '[v-listbox-container]',
  standalone: true
})
export class ListboxContainerDirective {
  private readonly idGenerator: IdGenerator = inject(IdGenerator);

  protected readonly listbox: Signal<ListboxDirective | undefined> = contentChild(forwardRef(() => ListboxDirective));

  /**
   * Aria attribute relaying what active element the listbox container refers to.
   * @builtin true
   */
  readonly ariaActiveDescendantInput: InputSignal<string | null> = input<string | null>(null, {
    alias: 'aria-activedescendant'
  });
  protected readonly ariaActiveDescendant: Signal<string | null | undefined> = computed(
    () => this.ariaActiveDescendantInput() ?? this.listbox()?.ariaActiveDescendant()
  );

  /**
   * Sets custom id.
   * @default idGenerator.newId('v-listbox-container')
   * @builtin true
   */
  readonly id: InputSignal<string> = input<string>(this.idGenerator.newId('v-listbox-container'));
}
