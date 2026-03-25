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
  model,
  Provider
} from '@angular/core';
import { DefaultValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IdGenerator, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaErrorTiny } from '@visa/nova-icons-angular';

export interface ReusableSelectOption<ValueType = string | number> {
  disabled?: boolean;
  hidden?: boolean;
  label: string;
  value: ValueType;
}

// This allows for reactive `formControl`'s or `ngModel`'s
const DEFAULT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ReusableSelect),
  multi: true
};

/** #AI-first */
@Component({
  selector: 'nova-reusable-select',
  imports: [NovaLibModule, VisaChevronDownTiny, VisaErrorTiny, FormsModule],
  templateUrl: './reusable-component.docs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DEFAULT_VALUE_ACCESSOR]
})
export class ReusableSelect<ValueType = string> extends DefaultValueAccessor {
  // Unique ID for the input
  private readonly generatedId = inject(IdGenerator).newId('reusable-select');

  // Inputs:
  readonly disabledInput = input(null, { alias: 'disabled', transform: booleanAttribute });
  readonly idInput = input<string | null>(null, { alias: 'id' });
  readonly inline = input(false, { transform: booleanAttribute });
  readonly invalid = input(null, { transform: booleanAttribute });
  readonly label = input('');
  readonly message = input<string>();
  readonly options = input<ReusableSelectOption<ValueType>[]>([]);
  readonly readonly = input(null, { transform: booleanAttribute });
  readonly required = input(null, { transform: booleanAttribute });
  readonly value = model<ValueType>();

  // Computed values:
  protected readonly id = computed(() => this.idInput() ?? this.generatedId);
  protected readonly disabled = linkedSignal(() => this.disabledInput());

  // Effects:
  protected readonly disabledEffect = effect(() => {
    const disabled = !!this.disabledInput();
    this.setDisabledState(disabled);
  });

  // Events:
  protected handleChange(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    this.writeValue(value as ValueType);
  }

  // These are to allow for reactive `formControl`'s or `ngModel`'s

  override setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  override writeValue(value: any): void {
    super.writeValue(value);
    this.onChange(value);
    setTimeout(() => this.value.set(value));
  }
}
