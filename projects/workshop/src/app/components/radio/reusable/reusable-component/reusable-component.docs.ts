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
  ElementRef,
  forwardRef,
  inject,
  input,
  linkedSignal,
  model,
  viewChild
} from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IdGenerator, NovaLibModule } from '@visa/nova-angular';

/// This allows for reactive `formControl`'s or `ngModel`'s
const RADIO_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ReusableRadio),
  multi: true
};

/** #AI-first */
@Component({
  selector: 'nova-reusable-radio',
  imports: [CommonModule, NovaLibModule],
  templateUrl: './reusable-component.docs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RADIO_VALUE_ACCESSOR]
})
export class ReusableRadio extends DefaultValueAccessor {
  // Unique ID for the input
  private readonly generatedId = inject(IdGenerator).newId('reusable-radio');

  private readonly radioInput = viewChild('radioInput', { read: ElementRef });

  // Inputs:
  readonly alignEnd = input(null, { transform: booleanAttribute });
  readonly checked = model<boolean | null>(null);
  readonly disabledInput = input(null, { alias: 'disabled', transform: booleanAttribute });
  readonly idInput = input<string | null>(null, { alias: 'id' });
  readonly invalid = input(null, { transform: booleanAttribute });
  readonly label = input('');
  readonly message = input<string>();
  readonly name = input<string>('radio-button');
  readonly panel = input(false, { transform: booleanAttribute });
  readonly required = input(null, { transform: booleanAttribute });
  readonly showLabel = input(true, { transform: booleanAttribute });
  readonly showMessage = input(true, { transform: booleanAttribute });
  readonly value = input<string | number>('radio-value');

  // Computed values:
  protected readonly disabled = linkedSignal(() => this.disabledInput());
  protected readonly id = computed(() => this.idInput() ?? this.generatedId);
  protected readonly inputDescribedBy = computed(() => {
    if (this.message() && this.showMessage()) {
      return `${this.id()}-message`;
    }
    return null;
  });

  // Effects:
  protected readonly disabledEffect = effect(() => {
    const disabled = !!this.disabled();
    this.setDisabledState(disabled);
  });

  // Events:
  protected handleChange(event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.writeValue(value);
  }

  protected persistClick() {
    // Find the radio input element and click it
    const radioElement = this.radioInput();
    if (!radioElement || this.disabled()) return;
    radioElement.nativeElement.click();
  }

  /// These are to allow for reactive `formControl`'s or `ngModel`'s

  override setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  override writeValue(value: any): void {
    this.checked.set(value === this.value());
    super.writeValue(value);
    this.onChange(value);
  }
}
