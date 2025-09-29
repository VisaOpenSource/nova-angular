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
import {
  Component,
  computed,
  inject,
  Signal,
  viewChild,
  OutputRefSubscription,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  ComboboxDirective,
  ComboboxService,
  ListboxItemType,
  MultiSelectValue,
  NovaLibModule,
  SingleSelectValue
} from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny } from '@visa/nova-icons-angular';

/** @ignore */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-multiselect-model-driven-with-programmatic-selection',
  templateUrl: './model-driven-with-programmatic-selection.docs.html',
  standalone: true,
  imports: [ReactiveFormsModule, NovaLibModule, VisaChevronDownTiny, VisaChevronUpTiny]
})
export class ModelDrivenProgrammticSelectionMultiselectComponent {
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

  readonly chipArray: Signal<ListboxItemType[] | null> = computed(() => {
    const value = this.combobox()?.value()?.value || [];
    return (value as MultiSelectValue)
      .map((v: SingleSelectValue) => this.optionTypes.find((option) => option && option.value === v))
      .filter((item): item is ListboxItemType => !!item);
  });
  filteredItems = this.optionTypes;
  readonly value = new FormControl(this.optionTypes[0]);
  comboboxFilterSubscription?: OutputRefSubscription;

  ngAfterViewInit(): void {
    const combobox = this.combobox();
    if (!combobox) return;
    // ComboboxService provider needed to get unique reference to filteredListEmitter
    this.comboboxFilterSubscription = combobox.filteredListEmitter.subscribe((listItems: ListboxItemType[]) => {
      this.filteredItems = listItems;
    });

    this.comboboxService.autoFilterBasedOnList(combobox, this.optionTypes, 'label');
  }

  reset() {
    this.filteredItems = this.optionTypes;
    this.value.reset();
    this.comboboxFilterSubscription?.unsubscribe();
  }

  ngOnDestroy(): void {
    this.comboboxFilterSubscription?.unsubscribe();
  }
}
