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
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  numberAttribute,
  signal,
  viewChildren,
  ViewEncapsulation
} from '@angular/core';
import { ButtonDirective, IdGenerator, NovaLibModule, PaginationControl } from '@visa/nova-angular';
import {
  VisaArrowEndTiny,
  VisaArrowStartTiny,
  VisaChevronDownTiny,
  VisaChevronLeftTiny,
  VisaChevronRightTiny,
  VisaOptionHorizontalTiny
} from '@visa/nova-icons-angular';

/**
 * Shared Pagination Component
 * A reusable pagination component for dynamic tables
 */
/** #patterns #isShared **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-dynamic-table-shared-pagination',
  templateUrl: './shared-pagination.docs.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    NovaLibModule,
    VisaChevronDownTiny,
    VisaArrowStartTiny,
    VisaChevronLeftTiny,
    VisaOptionHorizontalTiny,
    VisaChevronRightTiny,
    VisaArrowEndTiny
  ]
})
export class SharedPaginationDynamicTableComponent {
  /**
   * References to pagination button elements for focus management
   */
  private readonly paginationButtons = viewChildren(ButtonDirective);

  /**
   * Total number of items across all pages
   */
  readonly totalItems = input.required({ transform: numberAttribute });

  private readonly idGenerator = inject(IdGenerator);
  /**
   * Unique identifier for this pagination component instance
   */
  readonly id = this.idGenerator.newId('dynamic-table-shared-pagination-');

  /**
   * Index of the first page
   */
  readonly firstPageIndex = signal<number>(1);
  /**
   * Index of the last page based on total items and items per page
   */
  readonly lastPageIndex = computed(() => this.paginationControl.totalPages());

  constructor() {
    this.paginationControl = new PaginationControl({ selectedPage: this.selectedPage });

    // Recalculate pagination when items per page or total items changes
    effect(() => {
      const itemsPerPage = this.itemsPerPage();
      const totalItems = this.totalItems();
      if (totalItems > 0) {
        this.paginationControl.resetPageCount(totalItems, itemsPerPage);
      }
    });
  }

  /**
   * Available options for number of items per page
   */
  readonly itemsPerPageOptions = [5, 10, 15, 20];
  /**
   * Currently selected number of items per page
   */
  readonly itemsPerPage = model(this.itemsPerPageOptions[1]);
  /**
   * Pagination control instance managing page state
   */
  readonly paginationControl: PaginationControl;
  /**
   * Currently selected page number
   */
  readonly selectedPage = model<number>(1);
  /**
   * Range of items displayed on the current page (e.g., "1-10 of 50")
   */
  readonly toFrom = computed(() => this.paginationControl.getToFrom(this.totalItems(), this.itemsPerPage()));

  /**
   * Updates items per page and resets to first page
   * @param event - Select element change event
   */
  handleItemsPerPageChange(event: Event) {
    const { value } = event.currentTarget as HTMLSelectElement;
    this.itemsPerPage.set(+value);
    this.paginationControl.goToFirstPage();
  }

  /**
   * Navigates to first page and focuses the first page button
   */
  firstPage() {
    // Navigate to first page
    this.paginationControl.goToFirstPage();
    // Find the first page button in the pagination controls
    const firstPageButton = this.paginationButtons().find(
      (button) => button.el.nativeElement.getAttribute('data-id') === 'first-page'
    );
    // Move focus to the button for accessibility
    firstPageButton?.el.nativeElement.focus();
  }

  /**
   * Navigates to last page and focuses the last page button
   */
  lastPage() {
    // Navigate to last page
    this.paginationControl.goToLastPage();
    // Find the last page button in the pagination controls
    const lastPageButton = this.paginationButtons().find(
      (button) => button.el.nativeElement.getAttribute('data-id') === 'last-page'
    );
    // Move focus to the button for accessibility
    lastPageButton?.el.nativeElement.focus();
  }
}
