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
import { ChangeDetectionStrategy, Component, computed, signal, ViewEncapsulation } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { ColData, RowData, SortKeyType, SortType } from '../shared/dynamic-table.constants';
import { getComponentInputs, sortTableData } from '../shared/dynamic-table.utils';
import { generateBasicData, getDefaultColumnData } from '../shared/generate-demo-data.utils';
import { CommonModule } from '@angular/common';
import { EditActionDynamicTableComponent } from './edit-action/edit-action.docs';
import { ActionsButtonDynamicTableComponent } from '../shared/actions-button/actions-button.docs';

/**
 * Dynamic table with generic action buttons on all column headers
 */
/** #patterns **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-dynamic-table-column-header-actions',
  templateUrl: './column-header-actions.docs.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, NovaLibModule, ActionsButtonDynamicTableComponent],
  styleUrl: '../shared/dynamic-table.scss'
})
export class ColumnHeaderActionsDynamicTableComponent {
  readonly getComponentInputs = getComponentInputs;

  readonly defaultColumnData = getDefaultColumnData(true);

  /**
   * Column configuration with generic header actions enabled for all columns
   */
  readonly columnData: ColData[] = this.defaultColumnData.map((col) => {
    col.genericHeaderActions = true;
    if (col.name === 'Actions') {
      col.component = EditActionDynamicTableComponent;
    }
    return col;
  });

  /**
   * Name of the column that identifies each row
   */
  readonly identifyingColumn = this.columnData.find((col) => col.identifier)?.name || 'Column A';
  /**
   * Raw table data
   */
  readonly data: RowData[] = generateBasicData(4, this.columnData);

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
}
