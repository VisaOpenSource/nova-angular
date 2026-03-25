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
  signal,
  viewChild,
  WritableSignal
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComboboxDirective, ComboboxService, ListboxItemType, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny } from '@visa/nova-icons-angular';

/** #framework-specific **/

/** @ignore */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-combobox-model-driven-with-programmatic-selection',
  templateUrl: './model-driven-with-programmatic-selection.docs.html',
  standalone: true,
  providers: [ComboboxService],
  imports: [ReactiveFormsModule, NovaLibModule, VisaChevronDownTiny, VisaChevronUpTiny]
})
export class ModelDrivenProgrammticSelectionComboboxComponent implements AfterViewInit {
  readonly combobox = viewChild.required(ComboboxDirective);
  readonly comboboxService = inject(ComboboxService, { host: true, optional: true });
  comboboxFilterSubscription?: OutputRefSubscription;

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

  readonly filteredItems: WritableSignal<ListboxItemType[]> = signal(this.optionTypes);
  readonly value = new FormControl(this.filteredItems()[0]);

  ngAfterViewInit(): void {
    // ComboboxService provider needed to get unique reference to filteredListEmitter
    this.comboboxFilterSubscription = this.combobox().filteredListEmitter.subscribe((listItems: ListboxItemType[]) => {
      this.filteredItems.set(listItems);
    });

    this.comboboxService?.autoFilter(this.combobox()!, this.optionTypes);
  }

  reset() {
    this.filteredItems.set(this.optionTypes);
    this.value.reset();
  }

  ngOnDestroy(): void {
    this.comboboxFilterSubscription?.unsubscribe();
  }
}
