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
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NovaLibModule, PaginationControl } from '@visa/nova-angular';
import { VisaChevronDownTiny } from '@visa/nova-icons-angular';
import { ColData, RowData, SortKeyType, SortType } from '../shared/dynamic-table.constants';
import { getComponentInputs, sortTableData } from '../shared/dynamic-table.utils';
import { generateBasicData, getDefaultColumnData } from '../shared/generate-demo-data.utils';
import { ActionsButtonDynamicTableComponent } from '../shared/actions-button/actions-button.docs';
import { SharedPaginationDynamicTableComponent } from '../shared/pagination/shared-pagination.docs';
import { SearchActionBarDynamicTableComponent } from '../search-action-bar/search-action-bar.docs';
import { SelectionBasedActionBarDynamicTableComponent } from '../selection-based-action-bar/selection-based-action-bar.docs';
import { SubtleActionBarDynamicTableComponent } from '../subtle-action-bar/subtle-action-bar.docs';
import { ToggleActionBarDynamicTableComponent } from '../toggle-action-bar/toggle-action-bar.docs';

/**
 * Dynamic table demonstrating different action bar variants with pagination and multi-select
 */
/** #patterns **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-dynamic-table-action-bar-and-pagination',
  templateUrl: './action-bar-and-pagination.docs.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NovaLibModule,
    VisaChevronDownTiny,
    ActionsButtonDynamicTableComponent,
    SelectionBasedActionBarDynamicTableComponent,
    SearchActionBarDynamicTableComponent,
    SubtleActionBarDynamicTableComponent,
    ToggleActionBarDynamicTableComponent,
    SharedPaginationDynamicTableComponent
  ],
  styleUrl: '../shared/dynamic-table.scss'
})
export class ActionBarAndPaginationDynamicTableComponent {
  /**
   * Available action bar variants for demo purposes
   */
  readonly actionBarVariants = [
    { name: 'Selection-based', value: 'selection-based' },
    { name: 'Search', value: 'search' },
    { name: 'Subtle', value: 'subtle' },
    { name: 'Toggle', value: 'toggle' }
  ];
  /**
   * Form control for action bar variant selection
   */
  readonly formValidation = new FormGroup({
    radioControl: new FormControl('selection-based')
  });

  /**
   * Resets multi-select state when switching action bar types
   */
  changeActionBar() {
    this.headerCheckbox.set({ checked: false, indeterminate: false });
  }

  readonly getComponentInputs = getComponentInputs;

  /**
   * Column configuration for the table
   */
  readonly columnData = getDefaultColumnData();
  /**
   * Raw table data
   */
  readonly data = generateBasicData(300, this.columnData);

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
   * Resets to first page when sort changes
   */
  private readonly sortEffect = effect(() => {
    const key = this.sortKey();
    this.selectedPage.set(1);
  });

  /**
   * Table data sorted according to current sort state
   */
  private readonly sortedData = computed<RowData[]>(() => {
    return sortTableData(this.sortKey(), this.columnData, this.data);
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

  /**
   * Selection state for each row keyed by row identifier
   */
  readonly checkedRows = signal<Record<string, boolean>>({});
  /**
   * Count of currently selected rows
   */
  readonly checkedRowsCount = computed(() => Object.keys(this.checkedRows()).length);

  /**
   * State of the header checkbox (checked or indeterminate)
   */
  readonly headerCheckbox = signal({ checked: false, indeterminate: false });

  /**
   * Clears all row selections and resets header checkbox
   */
  clearSelectedRows() {
    this.checkedRows.set({});
    this.headerCheckbox.set({ checked: false, indeterminate: false });
  }

  /**
   * Selects or deselects all rows when the header checkbox changes
   * @param event - Checkbox change event
   */
  onHeaderCheckboxChange(event: Event) {
    const { checked } = event.target as HTMLInputElement;
    this.headerCheckbox.set({ checked, indeterminate: false });

    if (checked) {
      // Select all rows
      const allCheckedRows: Record<string, boolean> = {};
      this.sortedData().forEach((row) => {
        allCheckedRows[row[this.identifyingColumn] as string] = true;
      });
      this.checkedRows.set(allCheckedRows);
    } else {
      // Deselect all rows
      this.checkedRows.set({});
    }
  }

  /**
   * Toggles selection for an individual row and updates header checkbox state
   * @param row - Row data object being toggled
   */
  onRowCheckboxChange(row: RowData) {
    const rowId = row[this.identifyingColumn] as string;
    const updatedCheckedRows = { ...this.checkedRows() };

    // Toggle the row's checked state
    if (updatedCheckedRows[rowId]) {
      delete updatedCheckedRows[rowId];
    } else {
      updatedCheckedRows[rowId] = true;
    }

    this.checkedRows.set(updatedCheckedRows);

    // Update header checkbox based on how many rows are selected
    const checkedCount = Object.keys(updatedCheckedRows).length;
    const totalRows = this.sortedData().length;

    this.headerCheckbox.set({
      checked: checkedCount === totalRows,
      indeterminate: checkedCount > 0 && checkedCount < totalRows
    });
  }
}
