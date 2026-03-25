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
import { ColData, RowData, SortKeyType, SortType } from '../shared/dynamic-table.constants';
import { getComponentInputs, sortTableData } from '../shared/dynamic-table.utils';
import { generateBasicData, getDefaultColumnData } from '../shared/generate-demo-data.utils';

/**
 * Dynamic table with both vertical and horizontal scrolling
 */
/** #patterns **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-dynamic-table-vertical-and-horizontal-scroll',
  templateUrl: './vertical-and-horizontal-scroll.docs.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, NovaLibModule, ActionsButtonDynamicTableComponent],
  styleUrl: '../shared/dynamic-table.scss'
})
export class VerticalAndHorizontalScrollDynamicTableComponent {
  readonly getComponentInputs = getComponentInputs;

  /**
   * Default column configuration (badge and action columns)
   */
  readonly defaultColumnData = getDefaultColumnData().slice(-2);
  /**
   * Full column configuration including multiple text columns
   */
  readonly columnData = [
    { name: 'Column A', sortable: true, genericHeaderActions: true },
    { name: 'Column B', sortable: true, genericHeaderActions: true },
    { name: 'Column C', sortable: true, genericHeaderActions: true },
    { name: 'Column D', sortable: true, genericHeaderActions: true },
    { name: 'Column E', sortable: true, genericHeaderActions: true },
    { name: 'Column F', sortable: true, genericHeaderActions: true },
    { name: 'Column G', sortable: true, genericHeaderActions: true },
    { name: 'Column H', sortable: true, genericHeaderActions: true },
    { name: 'Column I', sortable: true, genericHeaderActions: true },
    { name: 'Column J', sortable: true, genericHeaderActions: true },
    { name: 'Column K', sortable: true, genericHeaderActions: true },
    ...this.defaultColumnData.map((col) =>
      col.badge ? { ...col, name: 'Column L', genericHeaderActions: true } : col
    )
  ];
  /**
   * Raw table data
   */
  private readonly data: RowData[] = generateBasicData(12, this.columnData);

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
