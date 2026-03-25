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
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IdGenerator, NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';
import { ReusableRadio } from '../../reusable/reusable-component/reusable-component.docs';

export interface Radio {
  message?: string;
  disabled?: string;
  label: string;
  panel?: boolean;
  value: string | number;
}

/// This allows for reactive `formControl`'s or `ngModel`'s
const RADIO_GROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ReusableRadioGroup),
  multi: true
};

/** #AI-first */
@Component({
  selector: 'nova-reusable-radio-group',
  imports: [CommonModule, NovaLibModule, ReusableRadio, VisaErrorTiny],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RADIO_GROUP_VALUE_ACCESSOR],
  templateUrl: './reusable-component.docs.html'
})
export class ReusableRadioGroup extends DefaultValueAccessor {
  // Unique ID for the input
  private readonly generatedId = inject(IdGenerator).newId('reusable-radio-group');

  // Inputs:
  readonly alignEnd = input(null, { transform: booleanAttribute });
  readonly description = input<string>();
  readonly radios = model<Radio[]>([]);
  readonly disabledInput = input(null, { alias: 'disabled', transform: booleanAttribute });
  readonly idInput = input<string | null>(null, { alias: 'id' });
  readonly horizontal = input(true, { transform: booleanAttribute });
  readonly invalid = input(null, { transform: booleanAttribute });
  readonly label = input('');
  readonly message = input<string>();
  readonly name = input<string | null>(null);
  readonly formControlName = input<string | null>(null, { alias: 'formControlName' });
  readonly panel = input(null, { transform: booleanAttribute });
  readonly required = input(null, { transform: booleanAttribute });
  readonly showLabel = input(null, { transform: booleanAttribute });
  readonly showMessage = input(null, { transform: booleanAttribute });

  // Computed values:
  protected readonly disabled = linkedSignal(() => this.disabledInput());
  protected readonly fieldsetLabelledBy = computed(() => {
    const id = this.id();
    const legendId = id + '-legend';
    const descriptionId = this.description() ? id + '-description' : false;
    return [legendId, descriptionId].filter(Boolean).join(' ');
  });
  protected readonly id = computed(() => this.idInput() ?? this.generatedId);

  // Effects:
  protected readonly disabledEffect = effect(() => {
    const disabled = !!this.disabled();
    this.setDisabledState(disabled);
  });
}
