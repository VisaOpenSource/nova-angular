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
import { Injectable } from '@angular/core';
import { ListboxItemComponent } from '../listbox-item/listbox-item.component';
import { ComboboxFilterType } from './combobox.constants';
import { ComboboxDirective } from './combobox.directive';

/**
 * Service containing optional functions for the ComboboxDirective. <br />
 * Can only be used within the context of a ComboboxDirective. <br />
 */
@Injectable({
  providedIn: 'root'
})
export class ComboboxService {
  /**
   * The closeMenuOnItemClick method automatically closes the menu when an item is selected. <br />
   * To keep the menu open after an item is selected, you must provide <code>[closeOnClick]="false"</code> to the combobox component.
   * @param combobox Combobox to apply behavior to.
   */
  public closeMenuOnItemClick(combobox: ComboboxDirective): void {
    const listbox = combobox.listbox();
    listbox?.listItems()?.forEach((item: ListboxItemComponent) => {
      combobox.listenerService.subscriptions.push(
        item.clicked.subscribe(() => {
          combobox.floatingContainer?.floatingUIService?.hidefloatingUI();
        })
      );
    });
  }

  /**
   * The selectHighlightedOnMenuClose method selects the last highlighted item when the menu is closed.
   * This method is called by default within <code>autoSelectItem</code>. <br />
   * @param combobox Combobox to apply behavior to.
   */
  public selectHighlightedOnMenuClose(combobox: ComboboxDirective): void {
    combobox.listenerService.subscriptions.push(
      combobox.floatingContainer?.floatingUIToggled.subscribe((isShown) => {
        if (!isShown && combobox.highlightedIndex() !== null) {
          combobox.listbox()?.highlightedItem()?.selectItem(true);
        }
      })
    );
  }

  /**
   * The autoFilter method filters items in the combobox based on the list of items you pass. <br />
   * This method allows customization of the filtering criteria, enabling you to filter items based on properties such as id, label, value, etc. To access the filtered list, subscribe to <code>the filteredListEmitter</code>, which emits the filtered list in the same shape as <code>fullList</code>. <br />
   * @param combobox Combobox to apply filter function to.
   * @param fullList List of all items to filter through.
   * @param condition Condition to filter the list by. Should match what is passed to the listbox item's inner text. ie if you want to use id, your html should look like `<li v-listbox-item>{{ item.id }}</li>`
   */
  public autoFilter<T extends Record<string | number, unknown> = Record<string | number, unknown>>(
    combobox: ComboboxDirective,
    fullList: T[],
    condition: string = 'label'
  ): void {
    this.autoFilterBasedOnList(combobox, fullList, condition);
  }

  /**
   * The autoFilterBasedOnList method filters items in the combobox based on the list of items you pass. <br />
   * This method allows customization of the filtering criteria, enabling you to filter items based on properties such as id, label, value, etc. To access the filtered list, subscribe to <code>the filteredListEmitter</code>, which emits the filtered list in the same shape as <code>fullList</code>. <br />
   * @param combobox Combobox to apply filter function to.
   * @param fullList List of all items to filter through.
   * @param condition Condition to filter the list by. Should match what is passed to the listbox item's inner text. ie if you want to use id, your html should look like `<li v-listbox-item>{{ item.id }}</li>`
   */
  public autoFilterBasedOnList<T extends Record<string | number, unknown> = Record<string | number, unknown>>(
    combobox: ComboboxDirective,
    fullList: T[],
    condition: keyof T = 'label'
  ): void {
    const listData = fullList;
    let filteredData: T[] = fullList;

    if (!combobox || !listData || !filteredData) return;
    // filter list with defaultValue
    if (combobox.value()) {
      // only filter single select combobox on initial render
      if (!combobox.listbox()?.multiselect()) {
        const selectedItem = listData?.find(
          (item) => item[condition]?.toString()?.toLowerCase() === combobox.value()?.['label']?.toLocaleLowerCase()
        );
        if (selectedItem) {
          filteredData = selectedItem ? [selectedItem] : [];
          combobox.prevActiveItem = selectedItem;
          this.updateList(combobox, filteredData);
        }
      }
    }

    combobox.listenerService.subscriptions.push(
      combobox.filter.subscribe((filterEvent) => {
        filteredData = [];
        if (filterEvent.type === ComboboxFilterType.SELECTION) {
          if (combobox.listbox()?.multiselect()) {
            filteredData = listData;
          } else {
            // if an item is selected, the list should only include that item
            filteredData = listData?.filter(
              (item) => item[condition]?.toString()?.toLowerCase() === filterEvent.input?.toLowerCase()
            );
            if (filteredData && filteredData.length === 1) combobox.prevActiveItem = filteredData[0];
          }
        } else if (filterEvent.type === ComboboxFilterType.INPUT) {
          const inputText = filterEvent.input?.toLowerCase();
          // filter list based on input value
          if (!inputText) {
            filteredData = listData;
          } else if (inputText.length > 0) {
            // filter list based on input value
            listData.forEach((item) => {
              if (item[condition]?.toString()?.toLowerCase().includes(inputText)) {
                filteredData.push(item);
              }
            });
          }
        } else if (filterEvent.type === ComboboxFilterType.RESET) {
          filteredData = listData;
        }
        this.updateList(combobox, filteredData);
      })
    );
  }

  /**
   * The updateList method updates the combobox component with the given filtered list items,
   setting the active and highlighted index appropriately. <br />
   * This method is called by default within <code>autoFilterDisplayedItems</code> and <code>autoFilterBasedOnList</code>.
   * @param combobox Combobox to update.
   * @param filteredListItems Filtered array of listbox items.
   */
  private updateList<T extends Record<string | number, unknown> = Record<string | number, unknown>>(
    combobox: ComboboxDirective,
    filteredListItems: T[]
  ): void {
    if (combobox.listbox()?.multiselect()) {
      // reset multiselect keyboard traversal altogether
      // combobox.activeIndex = null;
      combobox.listbox()?.highlightedItem.set(null);
    } else if (combobox.prevActiveItem && filteredListItems?.includes(combobox.prevActiveItem)) {
      // combobox.activeIndex = filteredListItems.findIndex((item) => item === combobox.prevActiveItem);
    } else {
      // combobox.activeIndex = null;
      combobox.listbox()?.highlightedItem.set(null);
    }

    combobox.filteredListEmitter.emit(filteredListItems);
  }

  /**
   * The autoSelectItem method highlights the first list item based on user input. <br />
   * This ensures that when the menu closes, if an input value was entered, an item is selected.
   * @param combobox Combobox to apply automatic selection to.
   */
  public autoSelectItem(combobox: ComboboxDirective): void {
    this.selectHighlightedOnMenuClose(combobox);
    combobox.autoSelect.set(true);
  }
}
