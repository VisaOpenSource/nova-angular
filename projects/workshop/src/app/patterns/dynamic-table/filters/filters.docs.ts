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
import { ChangeDetectionStrategy, Component, computed, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatingUIContainer, NovaLibModule, PaginationControl } from '@visa/nova-angular';
import { VisaSettingsTiny } from '@visa/nova-icons-angular';
import { ColData, FilterableTableState, RowData, SortType } from '../shared/dynamic-table.constants';
import { getComponentInputs, sortTableData, toKebabCase } from '../shared/dynamic-table.utils';
import {
  applyColumnFilters,
  applyFilters,
  clearAllFilters,
  clearColumnFilters,
  clearSingleFilter,
  deriveFilteredData,
  dropdownCloseAndFocus,
  resetColumnData,
  toggleAllColVisibility,
  toggleColumnVisibility
} from '../shared/filter.utils';
import { generateFilterData, getDefaultFilterColumnData } from '../shared/generate-demo-data.utils';
import { ActionsButtonDynamicTableComponent } from '../shared/actions-button/actions-button.docs';
import { SharedActionBarDynamicTableComponent } from '../shared/action-bar/action-bar.docs';
import { ExpandableFilterDropdownDynamicTableComponent } from '../shared/expandable-filter-dropdown/expandable-filter-dropdown.docs';
import { SharedFilterChipsDynamicTableComponent } from '../shared/filter-chips/filter-chips.docs';
import { SharedPaginationDynamicTableComponent } from '../shared/pagination/shared-pagination.docs';
import { ShowColumnsDropdownDynamicTableComponent } from '../shared/show-columns-dropdown/show-columns-dropdown.docs';

/**
 * Dynamic table with comprehensive filtering, column visibility controls, and pagination
 */
/** #patterns **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-dynamic-table-filters',
  templateUrl: './filters.docs.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NovaLibModule,
    SharedActionBarDynamicTableComponent,
    SharedFilterChipsDynamicTableComponent,
    ActionsButtonDynamicTableComponent,
    SharedPaginationDynamicTableComponent,
    ShowColumnsDropdownDynamicTableComponent,
    ExpandableFilterDropdownDynamicTableComponent,
    VisaSettingsTiny
  ],
  styleUrl: '../shared/dynamic-table.scss'
})
export class FiltersDynamicTableComponent {
  readonly toKebabCase = toKebabCase;
  readonly getComponentInputs = getComponentInputs;

  /**
   * Reference to settings dropdown for programmatic control
   */
  private readonly settingsFloatingContainer = viewChild('settingsDropdown', { read: FloatingUIContainer });
  /**
   * Reference to filter dropdown for programmatic control
   */
  private readonly filterDropdown = viewChild(ExpandableFilterDropdownDynamicTableComponent);

  /**
   * Column configuration for the table
   */
  readonly columnData = signal<ColData[]>(getDefaultFilterColumnData());
  /**
   * Raw table data
   */
  private readonly rowData: RowData[] = generateFilterData(100);

  /**
   * Name of the column that identifies each row
   */
  readonly identifyingColumn = this.columnData().find((col) => col.identifier)?.name || 'Column A';

  /**
   * Currently pinned column (appears first and is sticky during horizontal scroll)
   */
  readonly pinnedColumn = signal<ColData | null>(null);

  /**
   * Combined state for sorting and filtering
   */
  readonly tableState = signal<FilterableTableState>({
    column: this.identifyingColumn,
    direction: SortType.ASC,
    filters: {}
  });

  /**
   * Columns to display, with pinned column first and hidden columns excluded
   */
  readonly visibleColumns = computed(() => {
    if (this.pinnedColumn()) {
      return [this.pinnedColumn()!, ...this.columnData().filter((col) => col !== this.pinnedColumn() && !col.hidden)];
    }
    return this.columnData().filter((col) => !col.hidden);
  });

  /**
   * Table data sorted according to current sort state
   */
  private readonly sortedData = computed<RowData[]>(() => {
    return sortTableData(this.tableState(), this.columnData(), this.rowData);
  });

  /**
   * Rows visible on the current page
   */
  readonly visibleRows = computed(() => {
    const rows = this.filteredData();
    const { to, from } = PaginationControl.getToFrom(rows?.length || 0, this.itemsPerPage(), this.selectedPage());
    return rows?.slice(from - 1, to);
  });

  /**
   * Sorted and filtered table data
   */
  private readonly filteredData = computed(() => {
    const filtered = deriveFilteredData(this.sortedData(), this.tableState().filters);
    return filtered;
  });

  /**
   * Flattened array of all active filter values
   */
  readonly filtersFlattened = computed(() => {
    return Object.values(this.tableState().filters)
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
    this.tableState.update((state) => ({ ...state, column: column.name, direction: newDirection }));
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
   * Applies selected filters for a specific column
   * @param column - Name of the column
   */
  applyColumnFilters(column: string) {
    const updatedFilters = applyColumnFilters(column, this.columnData(), this.tableState().filters);
    this.tableState.update((state) => ({ ...state, filters: updatedFilters }));
  }

  /**
   * Clears all filters for a specific column
   * @param column - Name of the column
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
   * Removes a single filter value from a column
   * @param column - Name of the column
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
   * Clears all filters from all columns
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
   * Updates both column configuration and filter state
   * @param updatedColumnData - New column configuration
   * @param updatedFilters - New filter state
   */
  updateColumnsAndFilters(updatedColumnData: ColData[], updatedFilters: Record<string, string[]>) {
    this.columnData.set(updatedColumnData);
    this.tableState.update((state) => ({ ...state, filters: updatedFilters }));
  }

  /**
   * Moves focus to the filter dropdown trigger button
   */
  focusFilterButton() {
    this.filterDropdown()?.filterDropdownFocus();
  }

  /**
   * Toggles the pin state for a column
   * @param column - Column to pin or unpin
   */
  toggleColumnPin(column: ColData) {
    if (this.pinnedColumn() && this.pinnedColumn() === column) {
      this.pinnedColumn.set(null);
    } else {
      this.pinnedColumn.set(column);
    }
  }

  /**
   * Toggles visibility for a specific column
   * @param column - Name of the column to toggle
   */
  toggleColumnVisibility(column: string) {
    const updatedColumnData = toggleColumnVisibility(column, this.columnData(), this.columnVisibility());
    this.columnData.set(updatedColumnData);
  }

  /**
   * Visibility state for all columns derived from column configuration
   */
  readonly columnVisibility = computed(() =>
    Object.fromEntries(this.columnData().map((col) => [col.name, !col.hidden]))
  );

  /**
   * Updates visibility for all columns based on selection
   * @param updatedVisibility - Array of column names that should be visible
   */
  toggleAllColVisibility(updatedVisibility: string[]) {
    dropdownCloseAndFocus(this.settingsFloatingContainer());
    const visibilityMap = Object.fromEntries(
      this.columnData().map((col) => [col.name, updatedVisibility.includes(col.name)])
    );
    const newColumnData = toggleAllColVisibility(visibilityMap, this.columnData());
    this.columnData.set(newColumnData);
  }

  /**
   * Resets table to default state (all columns visible, no filters or sorting)
   */
  resetTable() {
    dropdownCloseAndFocus(this.settingsFloatingContainer());
    const { updatedColumnData, updatedFilters } = resetColumnData(this.columnData());
    this.columnData.set(updatedColumnData);
    this.tableState.set({ column: this.identifyingColumn, direction: SortType.ASC, filters: updatedFilters });
    this.itemsPerPage.set(10);
    this.selectedPage.set(1);
  }
}
