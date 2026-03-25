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
import { ActionsButtonDynamicTableComponent } from '../shared/actions-button/actions-button.docs';
import { ColData, SortType, RowData, SortKeyType } from '../shared/dynamic-table.constants';
import { sortTableData, getComponentInputs } from '../shared/dynamic-table.utils';
import { generateBasicData, getDefaultColumnData } from '../shared/generate-demo-data.utils';
import { NotificationIndicatorComponent } from './notification-indicator/notification-indicator.docs';

// Extend ColData to include optional notification property
interface ExtendedColData extends ColData {
  notification?: boolean;
}

/**
 * Dynamic table with notification indicator column
 */
/** #patterns **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-dynamic-table-notifications',
  templateUrl: './notifications.docs.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, NovaLibModule, ActionsButtonDynamicTableComponent],
  styleUrl: '../shared/dynamic-table.scss'
})
export class NotificationsDynamicTableComponent {
  readonly getComponentInputs = getComponentInputs;

  /**
   * Default column configuration
   */
  readonly defaultColData: ColData[] = getDefaultColumnData();
  /**
   * Default row data
   */
  private readonly defaultRowData: RowData[] = generateBasicData(4, this.defaultColData);

  /**
   * Name of the column that identifies each row
   */
  readonly identifyingColumn = this.defaultColData.find((col) => col.identifier)?.name || 'Column A';

  /**
   * Column configuration including notification indicator column
   */
  readonly columnData: ExtendedColData[] = [
    { name: 'New', notification: true, sortable: true, compact: true, component: NotificationIndicatorComponent },
    ...this.defaultColData
  ];

  /**
   * Row data extended with notification indicators
   */
  readonly data: RowData[] = this.defaultRowData.map((row, index) => ({
    New: index % 2 === 0 ? 'email' : '',
    ...row
  }));

  /**
   * Current sort state (column and direction)
   */
  readonly sortKey = signal<SortKeyType>({
    column: 'New',
    direction: SortType.DESC
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
   * Derives component inputs for a column and row, with special handling for notification column
   * @param col - Column configuration
   * @param row - Row data
   * @returns Input properties for the component
   */
  readonly getComponentInputsNotifications = (col: ExtendedColData, row: RowData) => {
    let inputs: { [key: string]: any } = {};
    if (col.notification) {
      inputs['notification'] = row['New'];
    } else {
      inputs = getComponentInputs(col, row, this.identifyingColumn);
    }
    return inputs;
  };
}
