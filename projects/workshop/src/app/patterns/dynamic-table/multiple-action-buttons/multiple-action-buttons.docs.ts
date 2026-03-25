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
import { VisaDeleteTiny, VisaEditTiny, VisaOptionVerticalTiny } from '@visa/nova-icons-angular';
import { ActionsButtonDynamicTableComponent } from '../shared/actions-button/actions-button.docs';
import {
  ActionButtons,
  ColData,
  RowData,
  RowDataMultiActions,
  SortKeyType,
  SortType
} from '../shared/dynamic-table.constants';
import { getComponentInputs, sortStringItems } from '../shared/dynamic-table.utils';
import { generateBasicData, getDefaultColumnData } from '../shared/generate-demo-data.utils';

// Extend ColData to include optional actions property
interface ExtendedColData extends ColData {
  actions?: boolean;
}

/**
 * Dynamic table with multiple action buttons per row
 */
/** #patterns **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-dynamic-table-multiple-action-buttons',
  templateUrl: './multiple-action-buttons.docs.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  styleUrl: '../shared/dynamic-table.scss',
  imports: [
    CommonModule,
    NovaLibModule,
    VisaDeleteTiny,
    VisaEditTiny,
    ActionsButtonDynamicTableComponent,
    VisaOptionVerticalTiny
  ]
})
export class MultipleActionButtonsDynamicTableComponent {
  readonly getComponentInputs = getComponentInputs;

  /**
   * Default column configuration
   */
  readonly defaultColData: ColData[] = getDefaultColumnData(false);
  /**
   * Default row data
   */
  readonly defaultRowData: RowData[] = generateBasicData(4, this.defaultColData);

  /**
   * Column configuration including actions column
   */
  readonly columnData: ExtendedColData[] = [
    ...this.defaultColData,
    { name: 'Actions', actions: true, compact: true, sortable: false }
  ];

  /**
   * Row data extended with multiple action buttons
   */
  readonly data: RowDataMultiActions[] = this.defaultRowData.map((row) => ({
    ...row,
    Actions: [ActionButtons.EDIT, ActionButtons.DELETE]
  }));

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
   * Table data sorted according to current sort state
   */
  readonly sortedData = computed<RowDataMultiActions[]>(() => {
    return this.sortTableDataWithActions(this.sortKey().column);
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
   * Sorts table data by the specified column and current sort direction
   * @param columnName - Name of the column to sort by
   * @returns Sorted table data
   */
  sortTableDataWithActions(columnName: string): RowDataMultiActions[] {
    const columnToSort = this.columnData.find((c) => c.name === columnName);
    if (!columnToSort || !columnToSort.sortable) return this.data;

    const preSortedData = [...this.data].sort((item1, item2) => {
      const a = item1[columnName];
      const b = item2[columnName];
      if (typeof a === 'string' && typeof b === 'string') {
        return sortStringItems(a as string, b as string);
      }
      return 0;
    });

    if (this.sortKey().direction === SortType.ASC) {
      return preSortedData;
    } else {
      const reversedData = [...preSortedData].reverse();
      return reversedData;
    }
  }
}
