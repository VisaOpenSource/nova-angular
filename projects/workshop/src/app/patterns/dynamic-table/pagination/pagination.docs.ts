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
import { ChangeDetectionStrategy, Component, computed, effect, signal, ViewEncapsulation } from '@angular/core';
import { NovaLibModule, PaginationControl } from '@visa/nova-angular';
import { ActionsButtonDynamicTableComponent } from '../shared/actions-button/actions-button.docs';
import { ColData, RowData, SortKeyType, SortType } from '../shared/dynamic-table.constants';
import { getComponentInputs, sortTableData } from '../shared/dynamic-table.utils';
import { generateBasicData, getDefaultColumnData } from '../shared/generate-demo-data.utils';
import { SharedPaginationDynamicTableComponent } from '../shared/pagination/shared-pagination.docs';

/**
 * Dynamic table with pagination for navigating large datasets
 */
/** #patterns **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-dynamic-table-pagination',
  templateUrl: './pagination.docs.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  styleUrl: '../shared/dynamic-table.scss',
  imports: [CommonModule, NovaLibModule, ActionsButtonDynamicTableComponent, SharedPaginationDynamicTableComponent]
})
export class PaginationDynamicTableComponent {
  readonly getComponentInputs = getComponentInputs;

  /**
   * Column configuration for the table
   */
  readonly columnData = getDefaultColumnData();
  /**
   * Raw table data
   */
  private readonly data: RowData[] = generateBasicData(300, this.columnData);

  /**
   * Name of the column that identifies each row
   */
  readonly identifyingColumn = this.columnData.find((col) => col.identifier)?.name || 'Column A';

  /**
   * Current sort state (column and direction)
   */
  readonly sortKey = signal<SortKeyType>({
    column: this.identifyingColumn,
    direction: SortType.ASC
  });

  /**
   * Rows visible on the current page
   */
  readonly visibleRows = computed(() => {
    const rows = this.sortedData();
    const { to, from } = PaginationControl.getToFrom(rows?.length || 0, this.itemsPerPage(), this.selectedPage());
    return rows?.slice(from - 1, to);
  });

  /**
   * Table data sorted according to current sort state
   */
  readonly sortedData = computed<RowData[]>(() => {
    return sortTableData(this.sortKey(), this.columnData, this.data);
  });

  /**
   * Updates the sort state for a column
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
    this.sortKey.set({ column: column.name, direction: newDirection });
  }

  /**
   * Resets to first page when sort changes
   */
  private readonly sortEffect = effect(() => {
    const key = this.sortKey();
    this.selectedPage.set(1);
  });

  /**
   * Number of items displayed per page
   */
  readonly itemsPerPage = signal<number>(10);
  /**
   * Currently selected page number
   */
  readonly selectedPage = signal<number>(1);
  /**
   * Total number of items in the table
   */
  readonly totalItems = computed(() => this.sortedData().length);
}
