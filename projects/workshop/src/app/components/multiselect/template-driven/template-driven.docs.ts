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
import { ChangeDetectionStrategy, Component, computed, Signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ComboboxDirective,
  ListboxItemComponent,
  ListboxItemType,
  MultiSelectValue,
  NovaLibModule,
  SingleSelectValue
} from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaClearAltTiny } from '@visa/nova-icons-angular';

/** #framework-specific **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-multiselect-template-driven',
  templateUrl: './template-driven.docs.html',
  standalone: true,
  imports: [NovaLibModule, FormsModule, VisaClearAltTiny, VisaChevronDownTiny, VisaChevronUpTiny]
})
export class TemplateDrivenMultiselectComponent {
  readonly combobox = viewChild(ComboboxDirective);
  value = { label: 'Option B', value: 'option-b' };

  readonly optionTypes: ListboxItemType[] = [
    {
      label: 'Option A',
      value: 'option-a'
    },
    {
      label: 'Option B',
      value: 'option-b'
    },
    {
      label: 'Option C',
      value: 'option-c'
    },
    {
      label: 'Option D',
      value: 'option-d'
    },
    {
      label: 'Option E',
      value: 'option-e'
    }
  ];

  readonly chipArray: Signal<ListboxItemType[] | null> = computed(() => {
    const value = this.combobox()?.value()?.value || [];
    return (value as MultiSelectValue)
      .map((v: SingleSelectValue) => this.optionTypes.find((option) => option && option.value === v))
      .filter((item): item is ListboxItemType => !!item);
  });

  deleteChip(value: string | number) {
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
}
