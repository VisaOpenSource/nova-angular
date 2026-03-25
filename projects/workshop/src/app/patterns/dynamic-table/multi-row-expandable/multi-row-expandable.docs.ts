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
import { ChangeDetectionStrategy, Component, computed, signal, ViewEncapsulation } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronRightTiny } from '@visa/nova-icons-angular';
import { ActionsButtonDynamicTableComponent } from '../shared/actions-button/actions-button.docs';
import { ColData, RowData, SortKeyType, SortType } from '../shared/dynamic-table.constants';
import { getComponentInputs, sortTableData } from '../shared/dynamic-table.utils';
import { generateBasicData, getDefaultColumnData } from '../shared/generate-demo-data.utils';

/**
 * Dynamic table with multiple expandable rows using accordion pattern
 */
/** #patterns **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-dynamic-table-multi-row-expandable',
  templateUrl: './multi-row-expandable.docs.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, NovaLibModule, ActionsButtonDynamicTableComponent, VisaChevronDownTiny, VisaChevronRightTiny],
  styleUrl: '../shared/dynamic-table.scss'
})
export class MultiRowExpandableDynamicTableComponent {
  private readonly generateData = generateBasicData;
  readonly getComponentInputs = getComponentInputs;

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
   * Current sort state (column and direction)
   */
  readonly sortKey = signal<SortKeyType>({
    column: this.identifyingColumn,
    direction: SortType.ASC
  });

  /**
   * Expansion state for each row keyed by row identifier
   */
  readonly expandedRows = signal<Record<string, boolean>>({});
  /**
   * Whether all rows are currently expanded
   */
  readonly headerExpanded = signal(false);

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
   * Toggles expansion state for all rows
   */
  toggleHeader() {
    const isExpanded = !this.headerExpanded();
    this.headerExpanded.set(isExpanded);

    if (isExpanded) {
      // Expand all rows
      const allExpanded: Record<string, boolean> = {};
      this.data.forEach((row) => {
        const rowId: string = row[this.identifyingColumn];
        allExpanded[rowId] = true;
      });
      this.expandedRows.set(allExpanded);
    } else {
      // Collapse all rows
      this.expandedRows.set({});
    }
  }

  /**
   * Toggles expansion state for an individual row and updates header state
   * @param row - Row to toggle
   */
  toggleRow(row: RowData) {
    const rowId: string = row[this.identifyingColumn];
    const currentExpandedRows = this.expandedRows();
    const isExpanded = !!currentExpandedRows[rowId];

    // Toggle this row's expansion state
    this.expandedRows.set({
      ...currentExpandedRows,
      [rowId]: !isExpanded
    });

    // Update header expanded state based on whether all rows are expanded
    const allRowsExpanded =
      this.data.length > 0 && this.data.every((row) => this.expandedRows()[row[this.identifyingColumn]] === true);

    this.headerExpanded.set(allRowsExpanded);
  }
}
