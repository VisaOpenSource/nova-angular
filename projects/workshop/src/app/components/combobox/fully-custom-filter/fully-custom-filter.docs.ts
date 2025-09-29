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
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComboboxFilterType, MultiSelectValue, NovaLibModule, SingleSelectValue } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny } from '@visa/nova-icons-angular';

/** #custom **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-combobox-fully-custom-filter',
  templateUrl: './fully-custom-filter.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaChevronDownTiny, VisaChevronUpTiny]
})
export class CustomFilterComboboxComponent {
  readonly cardTypes = [
    {
      label: 'Option A',
      value: 'option-a',
      keywords: ['a', 'option', 'first', '1', 'one']
    },
    {
      label: 'Option B',
      value: 'option-b',
      keywords: ['b', 'option', 'second', '2', 'two']
    },
    {
      label: 'Option C',
      value: 'option-c',
      keywords: ['c', 'option', 'third', '3', 'three']
    },
    {
      label: 'Option D',
      value: 'option-d',
      keywords: ['d', 'option', 'fourth', '4', 'four']
    },
    {
      label: 'Option E',
      value: 'option-e',
      keywords: ['e', 'option', 'fifth', '5', 'five']
    }
  ];

  readonly filteredItems = signal(this.cardTypes);

  filter(filterEvent: {
    type: ComboboxFilterType; // the type of filter being used
    input?: string | null; // the input value for INPUT type, or the selected value for SELECTION type
    listbox?: SingleSelectValue | MultiSelectValue | null; // the listbox value for LISTBOX type
  }): void {
    this.filteredItems.set([]);
    if (filterEvent.type === ComboboxFilterType.INPUT && filterEvent.input) {
      this.cardTypes.forEach((item) => {
        if (
          item.keywords.some((keyword) => keyword.toLowerCase().includes(filterEvent.input!.toLowerCase())) ||
          item.label.toLowerCase().includes(filterEvent.input!.toLowerCase())
        ) {
          this.filteredItems.update((items) => items.concat(item));
        }
      });
    } else if (filterEvent.type === ComboboxFilterType.SELECTION && filterEvent.listbox) {
      const selectedItem = this.cardTypes.find((item) => item.value === filterEvent.listbox);
      if (selectedItem) {
        this.filteredItems.update((items) => items.concat(selectedItem));
      }
    } else {
      this.filteredItems.set(this.cardTypes);
    }
  }
}
