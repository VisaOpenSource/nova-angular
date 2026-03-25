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
 * Dynamic table with single expandable row using accordion pattern
 */
/** #patterns **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-dynamic-table-single-row-expandable',
  templateUrl: './single-row-expandable.docs.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, NovaLibModule, ActionsButtonDynamicTableComponent, VisaChevronDownTiny, VisaChevronRightTiny],
  styleUrl: '../shared/dynamic-table.scss'
})
export class SingleRowExpandableDynamicTableComponent {
  readonly getComponentInputs = getComponentInputs;

  /**
   * Column configuration for the table
   */
  readonly columnData = getDefaultColumnData();
  /**
   * Raw table data
   */
  private readonly data = signal<RowData[]>(generateBasicData(4, this.columnData));

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
   * Identifier of the currently expanded row (empty string if none)
   */
  readonly expandedRow = signal<string>('');

  /**
   * Table data sorted according to current sort state
   */
  readonly sortedData = computed<RowData[]>(() => {
    const sortKey = this.sortKey();
    let updatedData = this.data();

    updatedData = sortTableData(sortKey, this.columnData, this.data());

    return updatedData;
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
   * Toggles the expansion state of a row (collapses if already expanded)
   * @param row - Row to toggle
   */
  toggleRow(row: RowData) {
    const rowId: string = row[this.identifyingColumn];
    const currentExpandedRows = this.expandedRow();
    const isExpanded = currentExpandedRows === rowId;

    this.expandedRow.update(() => (isExpanded ? '' : rowId));
  }
}
