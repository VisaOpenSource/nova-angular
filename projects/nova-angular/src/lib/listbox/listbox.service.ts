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
import { inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { AppReadyService } from '../app-ready/app-ready.service';
import { ListboxItemComponent } from '../listbox-item/listbox-item.component';
import {
  DOWN_ARROW_KEY,
  END_KEY,
  ENTER_KEY,
  HOME_KEY,
  SPACE_CODE,
  SPACE_KEY,
  TAB_KEY,
  UP_ARROW_KEY
} from '../nova-lib.constants';
import { NovaLibService } from '../nova-lib.service';
import { ListboxDirective } from './listbox.directive';

/**
 * Service used to create listbox behavior. Some functions are used within listbox component, others are optional additions.
 */
@Injectable({
  providedIn: 'root'
})
export class ListboxService {
  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  /** @ignore */
  private appReadyService: AppReadyService = inject(AppReadyService);
  private novaLibService: NovaLibService = inject(NovaLibService);
  private rendererFactory: RendererFactory2 = inject(RendererFactory2);
  /** @ignore */
  private renderer: Renderer2;

  /**
   * The setUpListbox method configures the listbox with the expected keyboard behaviors and sets the aria-activedescendant attribute. <br>
   * This method is called by default within <code>ListboxDirective</code>.
   * @param listbox Listbox to set up.
   */
  public setUpListbox(listbox: ListboxDirective): void {
    listbox.listeners.forEach((listener) => listener()); // remove previous listeners
    listbox.listeners = []; // reset listeners

    this.novaLibService.addArrowKeyNavigation(listbox.listItems(), true, 'both', listbox);
    this.addShortcuts(listbox);
  }

  /**
   * The scrollItemIntoView method scrolls given item to top of listbox. <br>
   * It’s called by default in <code>ListBoxDirective</code> unless <code>customScrollControl</code> is present. <br>
   * This method can also call to scroll to a custom index. By default it will scroll to the first active item, but you can provide a specific item if desired.
   * @param listbox Listbox to scroll.
   * @param indexToScrollTo Optional specific index to scroll to top (othwerwise, scrolls to first active item).
   */
  public scrollItemIntoView(listbox: ListboxDirective, indexToScrollTo?: number): void {
    const listboxReversed = [...listbox.listItems()].reverse();
    const targetItem: ListboxItemComponent | undefined =
      indexToScrollTo || indexToScrollTo === 0
        ? listbox.listItems()[indexToScrollTo]
        : listbox.multiselect()
          ? listboxReversed.find((item) => item.active())
          : listbox.listItems().find((item) => item.active());

    if (targetItem && this.appReadyService.isBrowserAndDomAvailable) {
      if (!listbox.listboxScrollStylesSet) {
        // gather variable information
        listbox.listboxHeight = listbox.el.nativeElement.offsetHeight;
        listbox.listboxItemHeight = listbox.listItems()[0].el.nativeElement.offsetHeight;
        listbox.listboxGap = parseInt(window.getComputedStyle(listbox.el.nativeElement).gap, 10);
        listbox.listboxGap = isNaN(listbox.listboxGap) ? 4 : listbox.listboxGap;
      }

      let amountScrolledAlready = listbox.el.nativeElement.scrollTop;
      // determine distance between top of listbox and active item
      this.renderer.setStyle(listbox.el.nativeElement, 'position', 'relative'); // set position to relative to allow for correct offsetTop of item
      const fullItemDistanceFromTop = targetItem.el.nativeElement.offsetTop + listbox.listboxItemHeight;

      // if item is in the top view of the listbox..
      if (fullItemDistanceFromTop < listbox.listboxHeight) {
        if (!amountScrolledAlready) {
          return; // do nothing, item is in view (user hasn't scrolled)
        } else {
          // scroll to top of listbox (where item is)
          listbox.el.nativeElement.scrollTo(0, 0);
        }
      } else if (
        /**
         * Do nothing if the item is between the amount already scrolled and the bottom of the listbox
         * ie it is in view and the user has scrolled
         */
        amountScrolledAlready &&
        fullItemDistanceFromTop < listbox.listboxHeight + amountScrolledAlready &&
        fullItemDistanceFromTop > amountScrolledAlready
      ) {
        return;
      } else {
        // either scroll to top of listbox or scroll item to top
        if (!listbox.el?.nativeElement.scrollBy) return; // needed for testing
        listbox.el.nativeElement.scrollBy({
          top: fullItemDistanceFromTop - listbox.listboxGap - amountScrolledAlready - listbox.listboxItemHeight
        });
      }
    }
  }

  /* ======= KEYBOARD SHORTCUTS ======= */

  /**
   * The addShortcuts method adds keyboard shortcuts to the listbox and is called by default within <code>setUpListbox</code>.
   * @param listbox Listbox to add shortcuts to.
   */
  private addShortcuts(listbox: ListboxDirective): void {
    listbox.listeners.push(
      this.renderer.listen(listbox.el.nativeElement, 'keydown', (event) => {
        this.handleKeyDown(event, listbox);
      })
    );
    listbox.listeners.push(
      this.renderer.listen(listbox.el.nativeElement, 'keyup', (event) => {
        this.handleKeyUp(event);
      })
    );
  }

  /**
   * The handleKeyup method handles item selection on keyup events for the listbox and is called by default within <code>addShortcuts</code>.
   * @param event Keyup event
   * @param listbox Listbox to handle keyup event for.
   */
  private handleKeyUp(event: KeyboardEvent): void {
    if (event.key === ENTER_KEY || event.key === SPACE_KEY || event.key === HOME_KEY || event.key === END_KEY) {
      event.preventDefault(); // prevent scrolling
    }
  }

  /**
   * The handleKeydown handles keydown events for the listbox and is called by default within <code>addShortcuts</code>.
   * @param event Keydown event
   * @param listbox Listbox to handle keyup event for.
   */
  private handleKeyDown(event: KeyboardEvent, listbox: ListboxDirective): void {
    listbox.isHotkeyEvent = true;
    if (event.key !== TAB_KEY) {
      event.preventDefault();
    }

    /**
     * Meta + Shift + Home or End
     * Select the focused option and all options up/down to the first option
     * &
     * Home or End
     * Move the focus to the first/last listbox option
     */
    if (event.key === HOME_KEY || event.key === END_KEY) this.updateFocusItem(event, listbox);

    /**
     * A-Z OR a-z
     * Typing a character will move the focus to the next item with a name that starts with that character
     * Typing in rapid succession moves the focus to the next item with a name that reflectes the set of characters just typed
     */
    if (
      !event.metaKey &&
      event.key.length === 1 &&
      ((event.key >= 'a' && event.key <= 'z') ||
        (event.key >= 'A' && event.key <= 'Z') ||
        (event.key >= '0' && event.key <= '9'))
    )
      this.searchKeyword(event, listbox);

    if (!listbox.multiselect()) {
      listbox.isHotkeyEvent = false;
      return; // only handle multiselect for the rest of the shortcuts
    }

    /**
     * Shift + ↑/↓
     * Move the focus to and toggle the selected state of the next/previous option
     * Multi-select only
     */
    if (event.key === UP_ARROW_KEY || event.key === DOWN_ARROW_KEY) this.toggleSelectedState(event, listbox);

    /**
     * Meta + A
     * Select all or deselect all items
     * Multi-select only
     */
    if (event.metaKey && (event.key === 'A' || event.key === 'a') && listbox.multiselect()) {
      this.selectAll(listbox);
    }

    /**
     * Shift + Space
     * Select contiguous items from the most recently selected item to ths focused item
     * Multi-select only
     */
    if (event.code === SPACE_CODE && event.shiftKey === true) this.selectContiguousItems(listbox);
    listbox.isHotkeyEvent = false;
  }

  /**
   * The updateFocusItem method  is activated by Meta + Shift + Home/End and selects all items between the focused item and the first or last item, then sets focus to the first or last item. <br>
   * This method is called by default within <code>handleKeyDown</code>.
   * @param event Keyboard event
   * @param listbox Listbox to update focus item for.
   */
  private updateFocusItem(event: KeyboardEvent, listbox: ListboxDirective): void {
    const listItemsArray = listbox.listItems();
    const currentFocusItem = listbox.highlightedItem();

    // store first or last item
    const homeOrEndIndex =
      event.key === HOME_KEY
        ? this.novaLibService.firstEnabledItem(listItemsArray)
        : this.novaLibService.lastEnabledItem(listItemsArray);

    // focus first or last item
    if (homeOrEndIndex < 0) return; // no items in listbox
    listbox.highlightedItem.set(listItemsArray[homeOrEndIndex]);
    listbox.highlightedItem()?.el.nativeElement.focus();

    if (!event.metaKey || !event.shiftKey) return;
    // if shift+meta key is pressed, select all items between the highlighted item and the first or last item
    const currentFocusIndex = listItemsArray.findIndex((item) => item === currentFocusItem);
    if (currentFocusIndex < 0) return; // no items in listbox
    const startIndex = event.key === HOME_KEY ? homeOrEndIndex : currentFocusIndex;
    const endIndex = event.key === HOME_KEY ? currentFocusIndex : homeOrEndIndex;
    // select all items between the highlighted item and the first or last item
    this.selectItems(listItemsArray, startIndex, endIndex);
  }

  /**
   * The searchKeyword method  handles keys A-Z, a-z, and 0-9, moving the focus to the next item with a name starting with the typed character. <br>
   * In the case of rapid succession, it moves the focus to the next item whose name matches the sequence of characters typed. <br />
   * This method is called by default within <code>handleKeyDown</code>.
   * @param event Keyboard event
   * @param listbox Listbox to search for items in.
   */
  private searchKeyword(event: KeyboardEvent, listbox: ListboxDirective): void {
    const listItemsArray = listbox.listItems();
    listbox.keyword = listbox.keyword + event.key.toLowerCase();
    clearTimeout(listbox.timeoutId);
    const bounce = window.setTimeout(() => {
      if (listbox.keyword !== '') {
        listbox.keyword = '';
      }
    }, 1000);
    listbox.timeoutId = bounce;
    const selectedIndex = listItemsArray.findIndex((item) => {
      const text = item.el.nativeElement.innerText?.toLowerCase() || item.el.nativeElement.textContent?.toLowerCase();
      return text?.toLowerCase().includes(listbox.keyword);
    });

    if (selectedIndex === -1 || listItemsArray[selectedIndex].disabled()) return;
    listbox.highlightedItem.set(listItemsArray[selectedIndex]);
    listbox.highlightedItem()?.el.nativeElement.focus();
  }

  /**
   * The selectAll method is activated by the Meta + A keys and selects or deselects all items in the listbox. <br>
   * This method is called by default within <code>handleKeyDown</code>.
   * @param listbox Listbox to select all items in.
   */
  private selectAll(listbox: ListboxDirective): void {
    if (!listbox.multiselect()) return;
    const listItemsArray = listbox.listItems() || [];
    const allSelected = this.detectAllItemsSelected(listItemsArray);
    allSelected ? this.deselectItems(listItemsArray) : this.selectItems(listItemsArray);
  }

  /**
   * The selectFromCloserSelectedToFocused method selects all items between the currently focused item and the closest selected item. <br>
   * This method is called by default within <code>handleKeyDown</code>.
   */
  private selectContiguousItems(listbox: ListboxDirective): void {
    if (listbox.highlightedItem() === null || !listbox.recentSelectedItem() === null) return;
    const listItemsArray = listbox.listItems();
    const recentIndex = listItemsArray.findIndex((item) => item === listbox.recentSelectedItem());
    const highlightedIndex = listItemsArray.findIndex((item) => item === listbox.highlightedItem());
    const isRecentLarger = recentIndex > highlightedIndex;
    this.selectItems(
      listItemsArray,
      isRecentLarger ? highlightedIndex : recentIndex,
      isRecentLarger ? recentIndex : highlightedIndex
    );
  }

  /**
   * The toggleSelectedState method is activated by Shift + ↑/↓ and moves the focus to, and toggles the selected state of, the next or previous option. <br>
   * This method is called by default within <code>handleKeyDown</code>.
   * @param event Keyboard event
   * @param listbox Listbox to toggle selected state for.
   */
  // @note: this is based on the fact that highlightedItem is set by novaLibService.addArrowKeyNavigation
  // BEFORE this method is called, can we trust that order? how do we know?
  private toggleSelectedState(event: KeyboardEvent, listbox: ListboxDirective): void {
    const listItemsArray = listbox.listItems();

    // this method is intended for up/down arrow keys with **shift key** pressed
    if (!listItemsArray || !listItemsArray.length || !event.shiftKey) return; // no items in listbox

    let newHighlightIndex = listbox.listItems().findIndex((item) => item === listbox.highlightedItem());

    // if highlighted index is not found, refer to first enabled item
    if (newHighlightIndex < 0) newHighlightIndex = this.novaLibService.firstEnabledItem(listItemsArray);

    if (newHighlightIndex === null) return; // no items in listbox
    listbox.highlightedItem.set(listItemsArray[newHighlightIndex]);
    listbox.highlightedItem()?.selectItem(); // toggle active state
  }

  /**
   * The selectItems method selects items from start_index to end_index in a list of listbox items. By default, it selects all items if no indices are specified.
   * @param items Array of listbox items that you want to manipulate.
   * @param start Index of the first item you want to manipulate.
   * @param end Index of the last item you want to manipulate.
   * @param prop The property name you want to set to true (ie. active, highlighted, etc.). Defaults to 'active'.
   */
  private selectItems(
    items: readonly ListboxItemComponent[],
    start: number = 0,
    end: number = items?.length - 1 || 0
  ): void {
    if (!items || !items.length) return;
    if (start < 0 || end >= items.length || start > end) return;
    for (let i = start; i <= end; i++) {
      const item = items[i];
      if (!item.disabled()) item.selectItem(true);
    }
  }

  /**
   * The deselectItems method deselect items out of a list of listbox items.
   * @param items List of items that contains the items you want to manipulate.
   * @param index Optional index of the item you DO NOT want to manipulate.
   * @param prop The property name you want to set to false (ie. active, highlighted, etc.). Defaults to 'active'.
   */
  private deselectItems(items: readonly ListboxItemComponent[], index?: number): void {
    if (!items || !items.length) return;
    items.forEach((item: ListboxItemComponent, i: number) => {
      if ((index || index === 0) && i === index) return;
      item.selectItem(false);
    });
  }

  /**
   * The detectAllItemsSelected method checks whether all items in a given list of tab or listbox items are selected.
   * @param items List of items that contains the items you want to check.
   * @returns true if all items are selected, false if not.
   */
  private detectAllItemsSelected(items: readonly ListboxItemComponent[]): boolean | undefined {
    if (!items || !items.length) return;
    let unSelectedItems = 0;
    items.forEach((item) => {
      if (!item.active() && !item.disabled()) unSelectedItems++;
    });
    return unSelectedItems == 0;
  }
}
