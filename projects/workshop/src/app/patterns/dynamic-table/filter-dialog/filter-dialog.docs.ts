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
import { ChangeDetectionStrategy, Component, computed, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovaLibModule, PaginationControl } from '@visa/nova-angular';
import { ColData, FilterableTableState, RowData, SortType } from '../shared/dynamic-table.constants';
import { getComponentInputs, onFilterToggle, sortTableData } from '../shared/dynamic-table.utils';
import { getDefaultFilterColumnData, generateFilterData } from '../shared/generate-demo-data.utils';
import {
  applyColumnFilters,
  applyFilters,
  clearAllFilters,
  clearColumnFilters,
  clearSingleFilter,
  deriveFilteredData
} from '../shared/filter.utils';
import { SharedActionBarDynamicTableComponent } from '../shared/action-bar/action-bar.docs';
import { ActionsButtonDynamicTableComponent } from '../shared/actions-button/actions-button.docs';
import { ExpandableFilterDropdownDynamicTableComponent } from '../shared/expandable-filter-dropdown/expandable-filter-dropdown.docs';
import { SharedFilterChipsDynamicTableComponent } from '../shared/filter-chips/filter-chips.docs';
import { SharedPaginationDynamicTableComponent } from '../shared/pagination/shared-pagination.docs';

/**
 * Dynamic table with filter dialog and removable filter chips
 */
/** #patterns **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-dynamic-table-filter-dialog',
  templateUrl: './filter-dialog.docs.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NovaLibModule,
    ActionsButtonDynamicTableComponent,
    SharedActionBarDynamicTableComponent,
    SharedFilterChipsDynamicTableComponent,
    SharedPaginationDynamicTableComponent,
    ExpandableFilterDropdownDynamicTableComponent
  ],
  styleUrl: '../shared/dynamic-table.scss'
})
export class FilterDialogDynamicTableComponent {
  readonly getComponentInputs = getComponentInputs;

  /**
   * Reference to expandable filter dropdown component
   */
  private readonly filterDropdown = viewChild(ExpandableFilterDropdownDynamicTableComponent);

  /**
   * Column configuration for the table
   */
  readonly columnData = signal<ColData[]>(getDefaultFilterColumnData());
  /**
   * Name of the column that identifies each row
   */
  readonly identifyingColumn = this.columnData().find((col) => col.identifier)?.name || 'Column A';
  /**
   * Raw table data
   */
  private readonly data: RowData[] = generateFilterData(100);

  /**
   * Combined state for sorting and filtering
   */
  readonly tableState = signal<FilterableTableState>({
    column: this.identifyingColumn,
    direction: SortType.ASC,
    filters: {}
  });

  /**
   * Rows visible on the current page after filtering and pagination
   */
  readonly visibleRows = computed(() => {
    const rows = this.filteredData();
    const { to, from } = PaginationControl.getToFrom(rows?.length || 0, this.itemsPerPage(), this.selectedPage());
    return rows?.slice(from - 1, to);
  });

  /**
   * Table data sorted according to current sort state
   */
  private readonly sortedData = computed<RowData[]>(() => {
    return sortTableData(this.tableState(), this.columnData(), this.data);
  });

  /**
   * Table data filtered according to active filter state
   */
  private readonly filteredData = computed(() => {
    const filtered = deriveFilteredData(this.sortedData(), this.tableState().filters);
    return filtered;
  });

  /**
   * Flattened array of all active filter values
   */
  readonly filtersFlattened = computed(() => {
    return Object.values(this.tableState().filters || {})
      .flat()
      .filter((val) => val);
  });

  /**
   * Updates the sort state for a column and resets to first page
   * @param column - Column to sort
   * @param direction - Optional explicit sort direction
   */
  sort(column: ColData, direction?: SortType) {
    const newDirection = direction
      ? direction
      : column.name === this.tableState().column
        ? this.tableState().direction === SortType.ASC
          ? SortType.DESC
          : SortType.ASC
        : SortType.ASC;

    this.tableState.update((state) => ({
      ...state,
      column: column.name,
      direction: newDirection
    }));

    this.selectedPage.set(1);
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
   * Total number of items after filtering
   */
  readonly totalItems = computed(() => this.filteredData().length);

  /**
   * Removes a single filter value from a column
   * @param column - Column name
   * @param filter - Filter value to remove
   */
  clearSingleFilter(column: string, filter: string) {
    const { updatedColumnData, updatedFilters } = clearSingleFilter(
      column,
      filter,
      this.columnData(),
      this.tableState().filters
    );
    this.updateColumnsAndFilters(updatedColumnData, updatedFilters);
  }

  /**
   * Applies selected filters for a specific column
   * @param column - Column name
   */
  applyColumnFilters(column: string) {
    const updatedFilters = applyColumnFilters(column, this.columnData(), this.tableState().filters);
    this.tableState.update((state) => ({ ...state, filters: updatedFilters }));
  }

  /**
   * Removes all filters for a specific column
   * @param column - Column name
   */
  clearColumnFilters(column: string) {
    const { updatedColumnData, updatedFilters } = clearColumnFilters(
      column,
      this.columnData(),
      this.tableState().filters
    );
    this.updateColumnsAndFilters(updatedColumnData, updatedFilters);
  }

  /**
   * Removes all active filters from all columns
   */
  clearAllFilters() {
    const { updatedColumnData, updatedFilters } = clearAllFilters(this.columnData());
    this.updateColumnsAndFilters(updatedColumnData, updatedFilters);
  }

  /**
   * Applies all selected filters across all columns
   */
  applyFilters() {
    const { updatedColumnData, updatedFilters } = applyFilters(this.columnData(), this.tableState().filters);
    this.updateColumnsAndFilters(updatedColumnData, updatedFilters);
  }

  /**
   * Sets focus to the filter dropdown button
   */
  focusFilterButton() {
    this.filterDropdown()?.filterDropdownFocus();
  }

  /**
   * Updates both column configuration and active filters
   * @param updatedColumnData - New column configuration
   * @param updatedFilters - New filter state
   */
  updateColumnsAndFilters(updatedColumnData: ColData[], updatedFilters: Record<string, string[]>) {
    this.columnData.set(updatedColumnData);
    this.tableState.update((state) => ({ ...state, filters: updatedFilters }));
  }

  /**
   * Determines whether a specific filter option is currently selected
   * @param col - Column configuration
   * @param filter - Filter value to check
   * @returns True if the filter is selected
   */
  isFilterSelected(col: ColData, filter: string): boolean {
    return col.headerActions?.selectedOptions.includes(filter) || false;
  }

  /**
   * Toggles a filter option for a column
   * @param col - Column configuration
   * @param filter - Filter value to toggle
   * @param isChecked - New checked state
   */
  onFilterToggle(col: ColData, filter: string, isChecked: boolean) {
    const updatedSelectedOptions = onFilterToggle(col, filter, isChecked);
    if (col.headerActions) {
      col.headerActions.selectedOptions = updatedSelectedOptions;
    }
  }
}
