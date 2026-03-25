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
import { DOCUMENT } from '@angular/common';
import { inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ButtonDirective } from './button/button.directive';
import { CheckboxDirective } from './checkbox/checkbox.directive';
import { LinkDirective } from './link/link.directive';
import { ListboxItemComponent } from './listbox-item/listbox-item.component';
import { DOWN_ARROW_KEY, LEFT_ARROW_KEY, RIGHT_ARROW_KEY, TAB_KEY, UP_ARROW_KEY } from './nova-lib.constants';
import { TabItemDirective } from './tab-item/tab-item.directive';
import { ListboxDirective } from './listbox/listbox.directive';

type Item = (ButtonDirective | CheckboxDirective | ListboxItemComponent) | undefined;
type Items = readonly Item[];
/**
 * This service manages navigation states within the application, ensuring smooth transitions and a consistent user experience. <br />
 * It’s primarily used internally by the library but can also be leveraged directly for custom implementations.
 */
@Injectable({
  providedIn: 'root'
})
export class NovaLibService {
  private rendererFactory: RendererFactory2 = inject(RendererFactory2);
  private document: Document | null = inject(DOCUMENT, { optional: true });

  /** @ignore */
  private renderer: Renderer2 = this.rendererFactory.createRenderer(null, null);

  /**
   * The addArrowKeyNavigation method adds arrow key navigation to an array of elements of type <code>ButtonDirective</code>, <code>ListboxItemComponent</code>, <code>or CheckboxDirective</code>.
   * @param itemsArray Array of items to add arrow key navigation to.
   * @param removeTabNavigation Optionally remove tab navigation from an array you're adding arrow navigation to.
   * @param arrowDirections Optionally specify which arrow key directions to use for navigation.
   * @param listbox Optionally specify a ListboxDirective to track highlighted item.
   */
  public addArrowKeyNavigation(
    itemsArray: Items,
    removeTabNavigation: boolean = false,
    arrowDirections: 'both' | 'horizontal' | 'vertical' = 'both',
    listbox?: ListboxDirective
  ): void {
    if (!itemsArray || !itemsArray.length) return;
    itemsArray.forEach((item, index) => {
      if (!item?.el?.nativeElement) return;

      item.listenerService.navListeners.push(
        // for each button, add an event listener for arrow "keydown"
        this.renderer.listen(item.el.nativeElement, 'keydown', (event) => {
          // right and down arrow keys should go to next focusable item
          if (
            (event.key === DOWN_ARROW_KEY && arrowDirections !== 'horizontal') ||
            (event.key === RIGHT_ARROW_KEY && arrowDirections !== 'vertical')
          ) {
            event.preventDefault();
            const focusableIndex = this.nextEnabledItem(itemsArray, index);
            if (focusableIndex > -1) {
              const focusableItem = itemsArray?.[focusableIndex];
              if (!focusableItem?.el?.nativeElement) return;
              focusableItem?.el.nativeElement.focus();
              if (listbox) listbox.highlightedItem.set(focusableItem as ListboxItemComponent);
            }
          } else if (
            (event.key === UP_ARROW_KEY && arrowDirections !== 'horizontal') ||
            (event.key === LEFT_ARROW_KEY && arrowDirections !== 'vertical')
          ) {
            // left and up arrow keys should go to previous focusable item
            event.preventDefault();
            const focusableIndex = this.previousEnabledItem(itemsArray, index);
            if (focusableIndex > -1) {
              const focusableItem = itemsArray?.[focusableIndex];
              if (!focusableItem?.el?.nativeElement) return;
              focusableItem?.el.nativeElement.focus();
              if (listbox) listbox.highlightedItem.set(focusableItem as ListboxItemComponent);
            }
          }
        })
      );
    });

    if (removeTabNavigation) this.removeTabNavigation(itemsArray);
  }

  /**
   * The removeTabNavigation method removes tab navigation for an array of elements of type ButtonDirective, ListboxItemComponent, or CheckboxDirective. <br />
   * When this functionality is added, it will disable tabbing between these specified elements.
   * @param itemsArray Array of items to remove tab navigation from.
   */
  private removeTabNavigation(itemsArray: Items, listbox?: ListboxDirective): void {
    if (!itemsArray || !itemsArray.length) return;
    this.findStartingFocus(itemsArray);

    itemsArray.forEach((item, index: number) => {
      if (!item?.el.nativeElement) return;

      item.listenerService.navListeners.push(
        this.renderer.listen(item.el.nativeElement, 'keydown', (event) => {
          // as you loop through the items with arrow keys, tabIndex must be updated so that only the item with focus has tabIndex = 0
          if (event.key === DOWN_ARROW_KEY || event.key === RIGHT_ARROW_KEY) {
            event.preventDefault(); // prevent scrolling
            const focusableIndex = this.nextEnabledItem(itemsArray, index);
            if (focusableIndex === -1) return; // no next item found
            const focusableItem = itemsArray[focusableIndex];
            if (!focusableItem?.el.nativeElement) return;
            // set tabindex for the item that is focused to 0, and all
            this.renderer.setAttribute(item.el.nativeElement, 'tabIndex', '-1');
            this.renderer.setAttribute(focusableItem.el.nativeElement, 'tabIndex', '0');
            if (listbox) listbox.highlightedItem.set(focusableItem as ListboxItemComponent);
          } else if (event.key === UP_ARROW_KEY || event.key === LEFT_ARROW_KEY) {
            event.preventDefault(); // prevent scrolling
            const focusableIndex = this.previousEnabledItem(itemsArray, index);
            if (focusableIndex === -1) return; // no next item found
            const focusableItem = itemsArray[focusableIndex];
            if (!focusableItem?.el.nativeElement) return;
            // set tabindex for the item that is focused to 0, and all
            this.renderer.setAttribute(item.el.nativeElement, 'tabIndex', '-1');
            this.renderer.setAttribute(focusableItem.el.nativeElement, 'tabIndex', '0');
            if (listbox) listbox.highlightedItem.set(focusableItem as ListboxItemComponent);
          } else if (event.key === TAB_KEY) {
            // if you tab out of the array, reset the starting index
            this.findStartingFocus(itemsArray);
          }
        })
      );
    });
  }

  /**
   * This method resets navigation behaviors for an array of elements of type <code>ButtonDirective</code>, <code>ListboxItemComponent</code>, or <code>CheckboxDirective</code>. <br />
   * It removes any tabindex or event listeners added by <code>addArrowKeyNavigation</code> or <code>removeTabNavigation</code>.
   * @param itemsArray Array of items to reset navigation behaviors for.
   */
  public resetNavigationBehaviors(itemsArray: Items): void {
    if (!itemsArray || !itemsArray.length) return;
    itemsArray.forEach((item) => {
      if (!item?.el.nativeElement) return;
      this.renderer.removeAttribute(item.el.nativeElement, 'tabIndex');
      item.listenerService.cleanupNavListeners(); // cleanup any event listeners added by addArrowKeyNavigation or removeTabNavigation
    });
  }

  /**
   * The findStartingFocus method finds the item to start navigation on. <br />
   * The starting focusable item is either the first item or the currently selected item.
   * @param itemsArray Array of items to find starting focus for.
   */
  public findStartingFocus(itemsArray: Items): void {
    if (!itemsArray || !itemsArray.length) return;
    // item.ariaSelected = button, item.active = listboxItem, item.checked = checkbox
    let selectedItemIndex = itemsArray.findIndex(
      (item) =>
        ((item instanceof ButtonDirective && item.ariaSelected()) ||
          (item instanceof ListboxItemComponent && item.active()) ||
          (item instanceof CheckboxDirective && item.checked())) === true
    );
    if (selectedItemIndex === -1) selectedItemIndex = this.nextEnabledItem(itemsArray);
    itemsArray.forEach((item, index: number) => {
      if (!item?.el.nativeElement) return;
      // if an item is the first / selected item, allow tab focus, otherwise remove tab focus ability
      this.renderer.setAttribute(item.el.nativeElement, 'tabIndex', index === selectedItemIndex ? '0' : '-1');
    });
  }

  /**
   * The nextEnabledItem method finds the next item in the array that is not disabled. <br />
   * When this functionality is added, it will automatically skip over disabled items to locate the next enabled one.
   * @param items Array of items to search for next enabled item.
   * @param currentIndex Index to start searching from.
   * @returns Index of next item that is not disabled.
   */
  public nextEnabledItem(items: Items, currentIndex?: number): number {
    if (!items || !items.length) return -1;
    let index = currentIndex || currentIndex === 0 ? currentIndex + 1 : 0;
    let count = 0;
    while (count < items.length && index !== currentIndex) {
      if (index >= items.length) {
        index = 0;
      }
      if (!items[index]?.disabled()) {
        return index;
      }
      index++;
      count++;
    }
    return index;
  }

  /**
   * The lastEnabledItem method retrieves the last item in an array that is not disabled.
   * @param items Array of items to search for last enabled item.
   * @returns Index of most last item that is not disabled.
   */
  public lastEnabledItem(items: Items): number {
    if (!items || !items.length) return -1;
    let count = items.length - 1;
    while (count >= 0) {
      if (items[count]?.disabled() !== true) return count;
      count--;
    }
    return -1;
  }

  /**
   * The firstEnabledItem methods retrieves the first item in array that is not disabled.
   * @param items Array of items to search for first enabled item.
   * @returns Index of first item that is not disabled.
   */
  public firstEnabledItem(items: Items): number {
    if (!items || !items.length) return -1;
    let count = 0;
    while (count < items.length) {
      if (items[count]?.disabled() !== true) return count;
      count++;
    }
    return -1;
  }

  /**
   * The previousEnabledItem method finds the previous item in the array that is not disabled. <br />
   * When this functionality is added, it will automatically skip over disabled items to locate the previous enabled one.
   * @param items Array of items to search for previous enabled item.
   * @param currentIndex Index to start reverse searching from.
   * @returns Index of first previous item that is not disabled.
   */
  public previousEnabledItem(items: Items, currentIndex?: number): number {
    if (!items || !items.length) return -1;
    let index = currentIndex || currentIndex === 0 ? currentIndex - 1 : items.length - 1;
    let count = 0;
    while (count < items.length && index !== currentIndex) {
      if (index === -1) {
        index = items.length - 1;
      }
      if (!items[index]?.disabled()) {
        return index;
      }
      index--;
      count++;
    }
    return index;
  }

  /**
   * The addAutomaticActivation method enables automatic tab activation for the specified tab or listbox list. <br />
   * When this functionality is added, focusing on an item will also select and activate it.
   * @param items Array of items to add automatic activation to.
   */
  public addAutomaticActivation(items: readonly (ListboxItemComponent | TabItemDirective)[]): void {
    if (!items || !items.length) return;
    items.forEach((item) => {
      if (item instanceof TabItemDirective) {
        const button = item.button();
        if (!button?.el?.nativeElement) return;
        // tab button
        button.listenerService.navListeners.push(
          this.renderer.listen(button.el.nativeElement, 'focus', () => {
            item.active.set(true);
          })
        );
      } else if (item instanceof ListboxItemComponent) {
        // standard list item
        item.listenerService.navListeners.push(
          this.renderer.listen(item.el.nativeElement, 'focus', () => {
            item.selectItem();
          })
        );
      }
    });
  }

  /** @ignore */
  private currentLink: HTMLElement | null | undefined;
  /**
   * @deprecated
   * @deprecationMessage instead of `setAriaCurrent`, use `handleAriaCurrent` for a list of LinkDirectives,
   * or manipulate the property via template binding to [attr.aria-current].
   * The setAriaCurrent method sets the aria-current="true" attribute on the element with the specified ID.
   * @param id ID of element to set aria-current="true" on.
   */
  public setAriaCurrent(id: string) {
    if (this.currentLink) {
      this.renderer.setAttribute(this.currentLink, 'aria-current', 'false');
    }

    this.currentLink = this.document?.getElementById(id);
    if (!this.currentLink) {
      console.warn('NovaLibService: setAriaCurrent could not find element with id: ' + id);
      return;
    }
    this.renderer.setAttribute(this.currentLink, 'aria-current', 'true');
  }

  /**
   * The handleAriaCurrent method handles the aria-current value on click for a list of links.
   * @param links List of links to add aria-current functionality to.
   */
  public handleAriaCurrent(links: readonly LinkDirective[]): void {
    links.forEach((link) => {
      if (!link.el?.nativeElement) return;
      link.listenerService.listeners.push(
        this.renderer.listen(link.el.nativeElement, 'click', () => {
          this.renderer.setAttribute(link.el.nativeElement, 'aria-current', 'true');
          links.forEach((item) => {
            if (item === link || !item.el?.nativeElement) return;
            this.renderer.setAttribute(item.el.nativeElement, 'aria-current', 'false');
          });
        })
      );
    });
  }
}
