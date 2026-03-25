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
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  OutputRefSubscription,
  Renderer2,
  signal,
  viewChild
} from '@angular/core';
import { ComboboxDirective, ComboboxService, NovaLibModule } from '@visa/nova-angular';
import { VisaArrowUpTiny, VisaChevronDownTiny, VisaChevronUpTiny } from '@visa/nova-icons-angular';
import { MockDataService } from '../../../shared/services/mock-data.service';

/** #custom **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-combobox-infinite-scroll',
  templateUrl: './infinite-scroll.docs.html',
  providers: [ComboboxService],
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaChevronDownTiny, VisaChevronUpTiny, VisaArrowUpTiny]
})
export class InfiniteScrollComboboxComponent implements OnInit, AfterViewInit {
  readonly combobox = viewChild.required(ComboboxDirective);
  readonly comboboxService = inject(ComboboxService, { host: true, optional: true });
  readonly mockDataService = inject(MockDataService);
  readonly renderer = inject(Renderer2);

  // Subscriptions
  mockDataSubscription?: OutputRefSubscription;
  comboboxFilterSubscription?: OutputRefSubscription;
  scrollListener?: () => void;

  // Constants
  readonly itemChunkSize = 20;
  readonly defaultLastItemIndex = 20;

  // Signals
  readonly listData = signal<{ id: string | number }[]>([]);
  readonly filteredData = signal<{ id: string | number }[]>([]);
  readonly lastItemIndex = signal(this.defaultLastItemIndex);
  readonly firstItemIndex = signal(0);
  readonly forceScrollTop = signal(false);
  readonly showScrollToTopButton = signal(false);

  ngOnInit() {
    this.getMockData();
  }

  getMockData() {
    this.mockDataSubscription = this.mockDataService
      .getLargeData()
      .subscribe((data: Array<{ id: string | number }>) => {
        this.listData.set(data);
        this.filteredData.set(this.listData());
        this.comboboxService?.autoFilterBasedOnList(this.combobox(), this.listData(), 'id');
      });
  }

  ngAfterViewInit(): void {
    // ComboboxService provider needed to get unique reference to filteredListEmitter
    this.comboboxFilterSubscription = this.combobox().filteredListEmitter.subscribe(
      (listItems: { id: string | number }[]) => {
        this.filteredData.set(listItems);
      }
    );
    this.comboboxService?.closeMenuOnItemClick(this.combobox());

    // listen to listbox scroll event
    this.scrollListener = this.renderer.listen(this.combobox()?.listbox()?.el.nativeElement, 'scroll', (event) => {
      // if we are intentionally scrolling to top via scrollToTop(), return
      if (this.forceScrollTop()) {
        this.forceScrollTop.set(false);
        return;
      }
      const currentScrollPosition = event.target.scrollTop + event.target.offsetHeight;

      const maxScrollPosition = event.target.scrollHeight - 10;

      if (currentScrollPosition >= maxScrollPosition) {
        // if the current position is at the bottom of the list, append more items
        this.appendItems();
      } else if (event.target.scrollTop <= 10) {
        // else if the current position is at the top of the list, prepend more items
        const firstItem = this.combobox()?.listbox()?.listItems()?.[0]?.el.nativeElement;

        // calculate the current offset of the first item before prepending
        const firstItemOffset = firstItem ? firstItem.offsetTop - event.target.scrollTop : 0;

        this.prependItems();
        if (firstItem) {
          // calculate the new offset of the first item after prepending and scroll to it
          const firstItemNewOffset = firstItem.offsetTop;
          event.target.scrollTop = firstItemNewOffset - firstItemOffset;
        }
      }
    });
  }

  appendItems() {
    this.showScrollToTopButton.set(true);
    let newLastIndex = this.lastItemIndex() + this.itemChunkSize;

    // if no chunk is added, return
    if (newLastIndex === this.lastItemIndex()) {
      return;
    }

    // if the new last index is greater than the total number of items, set it to the last item
    if (this.listData().length <= newLastIndex) {
      newLastIndex = this.listData().length;
    }
    this.lastItemIndex.set(newLastIndex);
    this.firstItemIndex.set(newLastIndex - 2 * this.itemChunkSize);
  }

  prependItems() {
    const newFirstIndex = Math.max(0, this.firstItemIndex() - this.itemChunkSize);

    // if we are at the beginning of the list, return
    if (newFirstIndex === this.firstItemIndex()) {
      this.showScrollToTopButton.set(false);
      return;
    }
    this.showScrollToTopButton.set(true);

    this.firstItemIndex.set(newFirstIndex);
    this.lastItemIndex.set(newFirstIndex + 2 * this.itemChunkSize);
  }

  scrollToTop() {
    // You must set a flag that we are intentionally scrolling to top so the scroll renderer event does not trigger
    this.forceScrollTop.set(true);
    this.showScrollToTopButton.set(false);
    this.firstItemIndex.set(0);
    this.lastItemIndex.set(this.defaultLastItemIndex);
    const listbox = this.combobox()?.listbox();
    if (!listbox) return;
    listbox.el.nativeElement.scrollTop = 0;
  }

  ngOnDestroy(): void {
    this.scrollListener?.();
    this.mockDataSubscription?.unsubscribe();
    this.comboboxFilterSubscription?.unsubscribe();
  }
}
