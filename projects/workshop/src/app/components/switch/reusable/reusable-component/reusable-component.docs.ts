/**
 *              © 2026 Visa
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
import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  linkedSignal,
  model
} from '@angular/core';
import { CheckboxControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IdGenerator, NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

// This allows for reactive `formControl`'s or `ngModel`'s
const CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ReusableSwitch),
  multi: true
};

/** #AI-first */
@Component({
  selector: 'nova-reusable-switch',
  imports: [CommonModule, NovaLibModule, VisaErrorTiny],
  templateUrl: './reusable-component.docs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CHECKBOX_VALUE_ACCESSOR]
})
export class ReusableSwitch extends CheckboxControlValueAccessor {
  // Unique ID for the input
  private readonly generatedId = inject(IdGenerator).newId('reusable-switch');

  // Inputs:
  readonly alignStart = input(null, { transform: booleanAttribute });
  readonly checked = model(false, { alias: 'selected' });
  readonly description = input<string>();
  readonly disabledInput = input(null, { alias: 'disabled', transform: booleanAttribute });
  readonly idInput = input<string | null>(null, { alias: 'id' });
  readonly invalid = input(null, { transform: booleanAttribute });
  readonly label = input('');
  readonly message = input<string>();
  readonly required = input(null, { transform: booleanAttribute });

  // Computed values:
  protected readonly disabled = linkedSignal(() => this.disabledInput());
  protected readonly id = computed(() => this.idInput() ?? this.generatedId);
  protected readonly inputDescribedBy = computed(() => {
    const id = this.id();
    const messageId = this.message() ? id + '-message' : false;
    const descriptionId = this.description() ? id + '-description' : false;
    const describedBy = [messageId, descriptionId].filter(Boolean);
    if (describedBy.length) return describedBy.join(' ');
    return null;
  });

  // Effects:
  protected readonly disabledEffect = effect(() => {
    const disabled = !!this.disabled();
    this.setDisabledState(disabled);
  });

  // Events:
  protected handleChange(event: Event) {
    const { checked } = event.target as HTMLInputElement;
    this.writeValue(checked);
  }

  // These are to allow for reactive `formControl`'s or `ngModel`'s

  override setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  override writeValue(checked: boolean): void {
    this.checked.set(checked);
    super.writeValue(checked);
  }
}
