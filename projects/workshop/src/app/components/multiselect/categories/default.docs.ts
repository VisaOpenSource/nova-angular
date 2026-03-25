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
import {
  ComboboxDirective,
  ListboxItemComponent,
  ListboxItemType,
  MultiSelectValue,
  NovaLibModule,
  SingleSelectValue
} from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaClearAltTiny } from '@visa/nova-icons-angular';
type Category = 'Italian' | 'Mexican' | 'Japanese';

/** #docs */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-multiselect-default',
  templateUrl: './default.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaChevronDownTiny, VisaChevronUpTiny, VisaClearAltTiny]
})
export class DefaultMultiselectComponent {
  readonly combobox = viewChild(ComboboxDirective);

  readonly options: Record<Category, { value: string; label: string }[]> = {
    Italian: [
      { value: 'pasta', label: 'Pasta' },
      { value: 'garlic_bread', label: 'Garlic Bread' },
      { value: 'pizza', label: 'Pizza' },
      { value: 'risotto', label: 'Risotto' },
      { value: 'lasagna', label: 'Lasagna' }
    ],
    Mexican: [
      { value: 'queso', label: 'Queso' },
      { value: 'salsa', label: 'Salsa' },
      { value: 'taco', label: 'Taco' },
      { value: 'burrito', label: 'Burrito' },
      { value: 'enchilada', label: 'Enchilada' }
    ],
    Japanese: [
      { value: 'sushi', label: 'Sushi' },
      { value: 'ramen', label: 'Ramen' },
      { value: 'tempura', label: 'Tempura' },
      { value: 'udon', label: 'Udon' },
      { value: 'teriyaki', label: 'Teriyaki' }
    ]
  };

  readonly chipArray: Signal<ListboxItemType[] | null> = computed(() => {
    const value = this.combobox()?.value()?.value || [];
    // Flatten all options into a single array, then map and filter as before
    const allOptions = Object.values(this.options).flat();
    return (value as MultiSelectValue)
      .map((v: SingleSelectValue) => allOptions.find((option) => option && option.value === v))
      .filter((item) => !!item);
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

  getCategoryOptions(category: Category) {
    return this.options[category] || [];
  }

  getCategories() {
    return Object.keys(this.options) as Category[];
  }
}
