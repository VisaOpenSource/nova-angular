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
import { computed, Directive, inject, input, InputSignal, Signal } from '@angular/core';
import { IdGenerator } from '../id-generator/id-generator.service';
import { MessageType } from '../message/message.constants';

@Directive({
  host: {
    'aria-modal': 'true',
    class: 'v-dialog',
    role: 'dialog',

    '[attr.aria-describedby]': 'descriptionLabel()',
    '[attr.aria-labelledby]': 'label()',
    '[attr.id]': 'id()',
    '[class.v-dialog-default]': '!this.messageType() || this.messageType() === "information"'
  },
  selector: '[v-dialog]',
  standalone: true
})
export class DialogDirective {
  private readonly idGenerator: IdGenerator = inject(IdGenerator);

  /**
   * Aria attribute pointing to id of descriptive element.
   * @default '&lt;this.id&gt;-description'
   * @builtin true
   */
  readonly descriptionLabelInput: InputSignal<null | string> = input<null | string>(null, {
    alias: 'aria-describedby'
  });
  readonly descriptionLabel: Signal<string> = computed(
    () => this.descriptionLabelInput() ?? `${this.id()}-description`
  );

  /**
   * Sets custom id.
   * @default idGenerator.newId('v-dialog')
   * @builtin true
   */
  readonly id: InputSignal<string> = input<string>(this.idGenerator.newId('v-dialog'));

  /**
   * Aria attribute pointing to id of labelling element.
   * @default '&lt;this.id&gt;-title'
   * @builtin true
   */
  readonly labelInput: InputSignal<null | string> = input<null | string>(null, { alias: 'aria-labelledby' });
  readonly label: Signal<string> = computed(() => this.labelInput() ?? `${this.id()}-title`);

  /**
   * @ignore
   */
  readonly messageType: InputSignal<MessageType | undefined> = input<MessageType | undefined>();
}
