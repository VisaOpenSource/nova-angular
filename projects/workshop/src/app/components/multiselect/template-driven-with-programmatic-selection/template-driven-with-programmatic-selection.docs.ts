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
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OutputRefSubscription,
  viewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboboxDirective, ComboboxService, ListboxItemType, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny } from '@visa/nova-icons-angular';

/** @ignore */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-multiselect-template-driven-with-programmatic-selection',
  templateUrl: './template-driven-with-programmatic-selection.docs.html',
  standalone: true,
  imports: [FormsModule, NovaLibModule, VisaChevronDownTiny, VisaChevronUpTiny]
})
export class TemplateDrivenProgrammaticSelectionMultiselectComponent implements AfterViewInit {
  readonly combobox = viewChild(ComboboxDirective);
  readonly comboboxService = inject(ComboboxService);

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

  filteredItems = this.optionTypes;
  value: ListboxItemType | null = this.filteredItems[0];
  comboboxFilterSubscription?: OutputRefSubscription;

  ngAfterViewInit(): void {
    const combobox = this.combobox();
    if (!combobox) return;
    // ComboboxService provider needed to get unique reference to filteredListEmitter
    combobox.filteredListEmitter.subscribe((listItems: ListboxItemType[]) => {
      this.filteredItems = listItems;
    });

    this.comboboxService.autoFilterBasedOnList(combobox, this.optionTypes, 'label');
  }

  reset() {
    this.filteredItems = this.optionTypes;
    this.value = null;
    this.comboboxFilterSubscription?.unsubscribe();
  }

  selectItem(item: ListboxItemType) {
    this.value = item;
  }

  ngOnDestroy(): void {
    this.comboboxFilterSubscription?.unsubscribe();
  }
}
