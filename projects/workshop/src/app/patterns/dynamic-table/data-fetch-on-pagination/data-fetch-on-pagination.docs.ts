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
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OutputRefSubscription,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { ActionsButtonDynamicTableComponent } from '../shared/actions-button/actions-button.docs';
import { ColData, RowData, SortKeyType, SortType } from '../shared/dynamic-table.constants';
import { getComponentInputs } from '../shared/dynamic-table.utils';
import { getDefaultFilterColumnData } from '../shared/generate-demo-data.utils';
import { SharedPaginationDynamicTableComponent } from '../shared/pagination/shared-pagination.docs';
import { MockTableApiService } from '../shared/mock-table-api.service';

/**
 * Dynamic table that fetches data from an API when pagination changes
 */
/** #patterns **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-dynamic-table-data-fetch-on-pagination',
  templateUrl: './data-fetch-on-pagination.docs.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  styleUrl: '../shared/dynamic-table.scss',
  imports: [CommonModule, NovaLibModule, ActionsButtonDynamicTableComponent, SharedPaginationDynamicTableComponent]
})
export class DataFetchOnPaginationDynamicTableComponent {
  readonly getComponentInputs = getComponentInputs;
  readonly mockTableApi = inject(MockTableApiService);
  /**
   * Active subscription for mock data requests
   */
  mockDataSubscription?: OutputRefSubscription;

  /**
   * Column configuration for the table
   */
  readonly columnData = getDefaultFilterColumnData();
  /**
   * Name of the column that identifies each row
   */
  readonly identifyingColumn = this.columnData.find((col) => col.identifier)?.name || 'File name';

  /**
   * Current sort state (column and direction)
   */
  readonly sortKey = signal<SortKeyType>({
    column: this.identifyingColumn,
    direction: SortType.ASC
  });

  /**
   * Rows currently visible on the selected page
   */
  readonly visibleRows = signal<RowData[]>([]);
  /**
   * Whether data is currently being fetched
   */
  readonly loading = signal<boolean>(false);

  /**
   * Cache for storing previously fetched pages
   * Key format: "page_pageSize_column_direction"
   * This prevents unnecessary API calls when navigating back to previously viewed pages
   */
  private readonly pageCache = new Map<string, { data: RowData[]; total: number }>();

  /**
   * Cache key derived from current pagination and sort state
   * @returns Cache key string
   */
  readonly cacheKey = computed(() => {
    const { column, direction } = this.sortKey();
    return `${this.selectedPage()}_${this.itemsPerPage()}_${column}_${direction}`;
  });

  /**
   * Updates the sort state for a column and clears the page cache
   * @param column - Column to sort
   * @param direction - Optional explicit sort direction
   */
  sort(column: ColData, direction?: SortType) {
    const newDirection = direction
      ? direction
      : column.name === this.sortKey().column
        ? this.sortKey().direction === SortType.ASC
          ? SortType.DESC
          : SortType.ASC
        : SortType.ASC;

    // Clear cache when sort changes to ensure fresh data
    this.pageCache.clear();

    // Reset to first page on sort change
    this.selectedPage.set(1);
    this.sortKey.set({ column: column.name, direction: newDirection });
  }

  /**
   * Number of items displayed per page
   */
  readonly itemsPerPage = signal<number>(10);
  /**
   * Currently selected page number
   */
  readonly selectedPage = signal<number>(1);
  /**
   * Total number of items across all pages
   */
  readonly totalItems = signal<number>(0);

  /**
   * Triggers data fetch when pagination or sort state changes
   */
  dataFetchEffect = effect(() => {
    const page = this.selectedPage();
    const pageSize = this.itemsPerPage();
    const sort = this.sortKey();

    this.getData();
  });

  constructor() {
    afterNextRender(() => {
      this.getData();
    });
  }

  /**
   * Fetches data from the mock API based on current pagination and sort state
   * Uses cache to avoid redundant API calls
   */
  readonly getData = () => {
    const cacheKey = this.cacheKey();

    // Check if we have cached data for this page
    const cachedData = this.pageCache.get(cacheKey);
    if (cachedData) {
      // Use cached data without loading state
      this.visibleRows.set(cachedData.data);
      this.totalItems.set(cachedData.total);
      return;
    }

    // Fetch from API if not cached
    this.loading.set(true);
    this.mockDataSubscription = this.mockTableApi
      .getTablePage(this.selectedPage(), this.itemsPerPage(), this.sortKey(), this.columnData)
      .subscribe({
        next: (response) => {
          // Store in cache for future use
          this.pageCache.set(cacheKey, {
            data: response.data,
            total: response.total
          });

          this.totalItems.set(response.total);
          this.visibleRows.set(response.data);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        }
      });
  };

  /**
   * Cleans up the active data subscription
   */
  ngOnDestroy() {
    this.mockDataSubscription?.unsubscribe();
  }
}
