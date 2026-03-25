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
  OutputRefSubscription,
  Provider,
  untracked,
  viewChild
} from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  ComboboxDirective,
  ComboboxService,
  ComboboxValue,
  IdGenerator,
  ListboxItemComponent,
  ListboxItemType,
  MultiSelectValue,
  NovaLibModule,
  SingleSelectValue
} from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaClearAltTiny, VisaErrorTiny } from '@visa/nova-icons-angular';

export interface MultiselectOption {
  disabled?: boolean;
  label: string;
  value: number | string;
  [key: string]: unknown;
}

/// This allows for reactive `formControl`'s or `ngModel`'s
const MULTISELECT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ReusableMultiselect),
  multi: true
};

/** #AI-first */
@Component({
  selector: 'nova-reusable-multiselect',
  imports: [NovaLibModule, VisaChevronDownTiny, VisaErrorTiny, VisaChevronUpTiny, VisaClearAltTiny],
  templateUrl: './reusable-component.docs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ComboboxService, MULTISELECT_VALUE_ACCESSOR]
})
export class ReusableMultiselect extends DefaultValueAccessor {
  // View children:
  private comboboxFilterSubscription?: OutputRefSubscription;
  private readonly combobox = viewChild(ComboboxDirective);
  private readonly comboboxService = inject(ComboboxService);

  // Unique ID for the input
  private readonly generatedId = inject(IdGenerator).newId('reusable-multiselect');

  // Inputs:
  readonly autoFilter = input(false, { transform: booleanAttribute });
  readonly autoSelect = input(false, { transform: booleanAttribute });
  readonly disabledInput = input(null, { alias: 'disabled', transform: booleanAttribute });
  readonly hideSelectionButtons = input(false, { transform: booleanAttribute });
  readonly hideDropdownButton = input(false, { transform: booleanAttribute });
  readonly idInput = input<string | null>(null, { alias: 'id' });
  readonly invalid = input(null, { transform: booleanAttribute });
  readonly label = input('');
  readonly message = input<string>();
  readonly options = input<MultiselectOption[]>([]);
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly value = model<ComboboxValue>(null);

  // Computed values:
  protected readonly chips = computed<MultiselectOption[] | null>(() => {
    const value = this.combobox()?.value()?.value || [];
    const options = untracked(this.options);
    return (value as MultiSelectValue)
      .map((v: SingleSelectValue) => options.find((option) => option && option.value === v))
      .filter((item): item is MultiselectOption => !!item);
  });
  protected readonly disabled = linkedSignal(() => this.disabledInput());
  protected readonly filteredOptions = linkedSignal(() => this.options());
  protected readonly id = computed(() => this.idInput() ?? this.generatedId);
  // This is used for the `aria-labelledby` attribute on the multiselect,
  // and should include the IDs of any elements that describe the multiselect (e.g. label, message)
  protected readonly multiselectDescribedBy = computed(() => {
    const id = this.id();
    const labelId = id + '-label';
    const messageId = this.message() ? id + '-message' : false;
    return [labelId, messageId].filter(Boolean).join(' ');
  });

  // Effects:
  protected readonly disabledEffect = effect(() => {
    const disabled = !!this.disabled();
    this.setDisabledState(disabled);
  });
  protected readonly autoFilterEffect = effect(() => {
    this.comboboxFilterSubscription?.unsubscribe();
    const combobox = this.combobox();
    const autoFilter = this.autoFilter();

    if (!combobox || !autoFilter) return;

    // ComboboxService provider needed to get unique reference to filteredListEmitter
    this.comboboxFilterSubscription = combobox.filteredListEmitter.subscribe((listItems: ListboxItemType[]) => {
      this.filteredOptions.set(listItems);
    });

    this.comboboxService.autoFilterBasedOnList(combobox, this.options(), 'label');

    if (!this.autoSelect()) return;

    // autoSelectItem MUST be called after autoFilterBasedOnList
    this.comboboxService.autoSelectItem(combobox);
  });

  // Events:
  protected handleBlur() {
    this.onTouched();
  }
  // We want to clear only the selectable options, not the disabled ones
  protected handleClearAll() {
    const currentValue = (this.combobox()?.value()?.value || []) as MultiSelectValue;
    const options = this.options();
    const newValues = (currentValue as MultiSelectValue)
      .map((value) => {
        const optionDisabled = options.find((option) => option.value === value)?.disabled;
        return optionDisabled ? value : null;
      })
      .filter(Boolean);
    this.writeValue({ label: '', value: newValues });
  }
  protected handleDeleteChip(value: string | number) {
    this.combobox()
      ?.listbox()
      ?.listItems()
      ?.find((item: ListboxItemComponent) => item.value() === value)
      ?.selectItem();
    const chipsLength = this.combobox()?.chips.length;
    if (chipsLength) {
      this.combobox()?.chips()?.[chipsLength - 1].button()?.el.nativeElement.focus();
    } else {
      this.combobox()?.input()?.el.nativeElement.focus();
    }
  }
  protected handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.writeValue(value);
  }
  // We want to select only the selectable options, not the disabled ones
  protected handleSelectAll() {
    const options = this.options();
    const currentValue = (this.combobox()?.value()?.value || []) as MultiSelectValue;
    this.writeValue({
      label: '',
      value:
        options
          .map((option) =>
            option.disabled === undefined || option.disabled === false || currentValue.includes(option.value)
              ? option.value
              : false
          )
          .filter(Boolean) || []
    });
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

  ngOnDestroy(): void {
    this.comboboxFilterSubscription?.unsubscribe();
  }
}
