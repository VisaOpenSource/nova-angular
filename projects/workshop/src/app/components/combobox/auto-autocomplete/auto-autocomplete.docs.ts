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
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import { ComboboxDirective, ComboboxService, ListboxItemType, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny } from '@visa/nova-icons-angular';

/** #docs **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-combobox-auto-autocomplete',
  templateUrl: './auto-autocomplete.docs.html',
  providers: [ComboboxService],
  standalone: true,
  imports: [NovaLibModule, VisaChevronDownTiny, VisaChevronUpTiny]
})
export class AutoAutocompleteComboboxComponent implements AfterViewInit {
  readonly combobox = viewChild.required(ComboboxDirective);
  readonly comboboxService = inject(ComboboxService, { host: true, optional: true });

  readonly cardTypes: ListboxItemType[] = [
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

  readonly filteredItems = signal<ListboxItemType[]>(this.cardTypes);

  ngAfterViewInit(): void {
    // ComboboxService provider needed to get unique reference to filteredListEmitter
    this.combobox().filteredListEmitter.subscribe((listItems: ListboxItemType[]) => {
      this.filteredItems.set(listItems);
    });

    this.comboboxService?.autoFilterBasedOnList(this.combobox(), this.cardTypes);
    this.comboboxService?.autoSelectItem(this.combobox());
  }
}
