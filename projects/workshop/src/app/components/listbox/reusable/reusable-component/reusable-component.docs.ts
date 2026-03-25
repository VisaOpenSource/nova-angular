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
  Provider,
  untracked,
  viewChildren
} from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IdGenerator, ListboxItemComponent, ListboxValue, NovaLibModule, NovaLibService } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

export interface ListboxOption {
  disabled?: boolean;
  label: string;
  value: number | string;
  active?: boolean;
}

/// This allows for reactive `formControl`'s or `ngModel`'s
const LISTBOX_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ReusableListbox),
  multi: true
};

/** #AI-first */
@Component({
  selector: 'nova-reusable-listbox',
  imports: [NovaLibModule, VisaErrorTiny],
  templateUrl: './reusable-component.docs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LISTBOX_VALUE_ACCESSOR]
})
export class ReusableListbox extends DefaultValueAccessor {
  // Unique ID for the input
  private readonly generatedId = inject(IdGenerator).newId('reusable-listbox');
  private readonly novaLibService = inject(NovaLibService);

  // View children:
  private readonly listItems = viewChildren(ListboxItemComponent);

  // Inputs:
  readonly autoSelect = input(null, { transform: booleanAttribute });
  readonly containHeight = input(true, { transform: booleanAttribute });
  readonly disabledInput = input(null, { alias: 'disabled', transform: booleanAttribute });
  readonly idInput = input<string | null>(null, { alias: 'id' });
  readonly invalid = input(null, { transform: booleanAttribute });
  readonly label = input('');
  readonly message = input<string>();
  readonly multiselect = input(null, { transform: booleanAttribute });
  readonly options = input<ListboxOption[]>([]);
  readonly value = model<ListboxValue>('');

  // Computed values:
  protected readonly disabled = linkedSignal(() => this.disabledInput());
  protected readonly id = computed(() => this.idInput() ?? this.generatedId);
  // This is used for the `aria-labelledby` attribute on the listbox container,
  // and should include the IDs of any elements that describe the listbox (e.g. label, message)
  protected readonly listboxDescribedBy = computed(() => {
    const id = this.id();
    const labelId = id + '-label';
    const messageId = this.message() ? id + '-message' : false;
    return [labelId, messageId].filter(Boolean).join(' ');
  });

  // Effects:
  protected readonly autoSelectEffect = effect(() => {
    const autoSelect = !!this.autoSelect();
    const options = this.options();
    const items = this.listItems();
    if (!options || !autoSelect || !items) return;
    this.novaLibService.addAutomaticActivation(this.listItems());
  });
  protected readonly disabledEffect = effect(() => {
    const disabled = !!this.disabled();
    this.setDisabledState(disabled);
  });
  // If the current value type does not match the multiselect mode, adjust it.
  protected readonly multiselectEffect = effect(() => {
    const multiselect = !!this.multiselect();
    const currentValue = untracked(() => this.value());
    const valueIsArray = Array.isArray(currentValue);
    if (!currentValue || (multiselect && valueIsArray) || (!multiselect && !valueIsArray)) return;
    if (multiselect && !valueIsArray) {
      return this.writeValue(currentValue ? [currentValue] : []);
    }
    if (!valueIsArray) return;
    this.writeValue(currentValue[0] ?? null);
  });

  // Events:
  protected handleBlur() {
    this.onTouched();
  }

  /// These are to allow for reactive `formControl`'s or `ngModel`'s
  override setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  override writeValue(value: any): void {
    this.value.set(value);
    super.writeValue(value);
    this.onChange(value);
  }
}
