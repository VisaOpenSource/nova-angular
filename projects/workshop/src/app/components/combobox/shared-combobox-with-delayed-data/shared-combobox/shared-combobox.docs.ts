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
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  output,
  OutputRefSubscription,
  Signal,
  signal,
  viewChild
} from '@angular/core';
import { ComboboxDirective, ComboboxService, NovaLibModule, ComboboxValue, ListboxItemType } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny } from '@visa/nova-icons-angular';

@Component({
  selector: 'nova-workshop-combobox-shared-combobox',
  templateUrl: './shared-combobox.docs.html',
  standalone: true,
  providers: [ComboboxService],
  imports: [CommonModule, NovaLibModule, VisaChevronDownTiny, VisaChevronUpTiny]
})
export class SharedComboboxDocsComponent implements AfterViewInit {
  readonly combobox = viewChild.required(ComboboxDirective);
  readonly comboboxService = inject(ComboboxService, { host: true, optional: true });
  readonly firstIndex = signal(0);
  readonly lastIndex = signal(0);
  readonly showLoadMore: Signal<boolean> = computed(() => {
    const items = forwardRef(() => this.items()); // use forwardRef as items is not yet defined
    if (items) {
      return items.length > 500;
    }
    return false;
  });
  readonly chunkSize = 50;

  // combobox label
  readonly label = input<string>();

  // selected item (one item since combobox)
  readonly selectedValue = input<ListboxItemType>();
  readonly selectedValueEffect = effect(() => {
    const selectedValue = this.selectedValue();
    this.comboboxValue.set({ label: selectedValue?.label, value: selectedValue?.value ?? null });
  });
  readonly comboboxValue = signal<ComboboxValue>({ value: this.selectedValue()?.value ?? null });

  readonly items = input<ListboxItemType[]>();
  // array of items to display in the combobox
  readonly itemsEffect = effect(() => {
    const items = this.items();
    if (items) {
      if (items.length > 500) {
        console.warn('The items array is very large and may impact performance.');
        this.lastIndex.set(this.chunkSize - 1);
        // Optionally, you can handle large arrays differently here
        // For example, you could paginate the items or limit the number of items displayed
      } else {
        this.lastIndex.set(items.length - 1);
      }
    }
    this.itemsUpdated();
  });

  readonly updateValue = output<ComboboxValue>();

  // variables specific to shared combobox
  readonly filteredItems = signal<ListboxItemType[]>(this.items() ?? []);
  comboboxFilterSubscription?: OutputRefSubscription;

  ngAfterViewInit() {
    this.subscribeToFilteredList();
  }

  itemsUpdated() {
    this.filteredItems.set(this.items() ?? []);
    // unsubscribe to filtered list of previous items
    this.comboboxFilterSubscription?.unsubscribe();
    /**
     * reset combobox value so old value isn't present in input
     * uncomment the following two lines if you want to null the combobox value when items are updated
     */
    // reset filtering and auto selecting for new set of items
    this.comboboxService?.autoFilterBasedOnList(this.combobox()!, this.items() || [], 'label');
    this.comboboxService?.autoSelectItem(this.combobox()!);
    this.subscribeToFilteredList();
  }

  subscribeToFilteredList() {
    this.comboboxFilterSubscription = this.combobox()?.filteredListEmitter.subscribe((listItems: ListboxItemType[]) => {
      this.filteredItems.set(listItems);
    });
  }

  valueUpdated(value: string | number | (string | number)[] | null) {
    /**
     * Combobox's itemSelected (what is being passed to our value paramater here) emits what is essentially the listbox value
     * To see both the label and value of the combobox, we can access the combobox's full value
     */
    console.log(value); // value accessed from binding to itemSelected; equal to combobox's value.value, if not null
    this.updateValue.emit(this.combobox()?.value() || null);
  }

  loadMore() {
    this.lastIndex.set(this.lastIndex() + this.chunkSize - 1);
  }

  ngOnDestroy(): void {
    this.comboboxFilterSubscription?.unsubscribe();
  }
}
