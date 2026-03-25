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
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { ActionsButtonDynamicTableComponent } from '../shared/actions-button/actions-button.docs';
import { ColData, RowData, SortKeyType, SortType } from '../shared/dynamic-table.constants';
import { getComponentInputs, sortTableData } from '../shared/dynamic-table.utils';
import { generateBasicData, getDefaultColumnData } from '../shared/generate-demo-data.utils';

/**
 * Dynamic table with multi-row selection using checkboxes
 */
/** #patterns **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-dynamic-table-multi-select',
  templateUrl: './multi-select.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, ActionsButtonDynamicTableComponent],
  styleUrl: '../shared/dynamic-table.scss'
})
export class MultiSelectDynamicTableComponent {
  readonly getComponentInputs = getComponentInputs;
  private readonly generateData = generateBasicData;

  /**
   * Column configuration for the table
   */
  readonly columnData = getDefaultColumnData();
  /**
   * Raw table data
   */
  private readonly data: RowData[] = this.generateData(4, this.columnData);

  /**
   * Name of the column that identifies each row
   */
  readonly identifyingColumn = this.columnData.find((col) => col.identifier)?.name || 'Column A';

  /**
   * Selection state for each row keyed by row identifier
   */
  readonly checkedRows = signal<Record<string, boolean>>({});
  /**
   * State of the header checkbox (checked or indeterminate)
   */
  readonly headerCheckbox = signal({ checked: false, indeterminate: false });

  /**
   * Current sort state (column and direction)
   */
  readonly sortKey = signal<SortKeyType>({
    column: this.identifyingColumn,
    direction: SortType.ASC
  });

  /**
   * Table data sorted according to the current sort state
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
