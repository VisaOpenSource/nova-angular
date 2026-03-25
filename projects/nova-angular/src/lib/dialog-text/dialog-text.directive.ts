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
import { computed, Directive, inject, input, InputSignal, Signal } from '@angular/core';
import { DialogDirective } from '../dialog/dialog.directive';

@Directive({
  host: {
    '[attr.id]': 'id()'
  },
  selector: '[v-dialog-text]',
  standalone: true
})
export class DialogTextDirective {
  private readonly dialog: DialogDirective | null = inject(DialogDirective, { optional: true });

  /**
   * Sets custom id.
   * @default '&lt;parent-dialog-id&gt;-description' if no id is provided.
   * @builtin true
   */
  readonly idInput: InputSignal<HTMLElement['id'] | null> = input<HTMLElement['id'] | null>(null, { alias: 'id' });
  protected readonly id: Signal<string | undefined> = computed(() => this.idInput() ?? this.dialog?.descriptionLabel());
}
