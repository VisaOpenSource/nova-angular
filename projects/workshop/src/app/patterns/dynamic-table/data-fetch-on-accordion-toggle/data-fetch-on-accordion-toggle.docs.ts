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
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronRightTiny } from '@visa/nova-icons-angular';
import { Subscription } from 'rxjs';
import { ActionsButtonDynamicTableComponent } from '../shared/actions-button/actions-button.docs';
import { ColData, RowData, SortKeyType, SortType } from '../shared/dynamic-table.constants';
import { getComponentInputs, sortTableData } from '../shared/dynamic-table.utils';
import { getDefaultFilterColumnData } from '../shared/generate-demo-data.utils';
import { MockTableApiService } from '../shared/mock-table-api.service';

interface AccordionRowData {
  data: RowData | null;
  loading: boolean;
}

/**
 * Dynamic table that fetches accordion data when a row is expanded
 */
/** #patterns **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-dynamic-table-data-fetch-on-accordion-toggle',
  templateUrl: './data-fetch-on-accordion-toggle.docs.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, NovaLibModule, ActionsButtonDynamicTableComponent, VisaChevronDownTiny, VisaChevronRightTiny],
  styleUrl: '../shared/dynamic-table.scss'
})
export class DataFetchAccordionToggleDynamicTableComponent {
  readonly getComponentInputs = getComponentInputs;
  private readonly mockTableApi = inject(MockTableApiService);
  /**
   * Active subscriptions for accordion data requests keyed by row identifier
   */
  private accordionSubscriptions$: Map<string, Subscription> = new Map();

  constructor() {
    afterNextRender(() => {
      this.getData();
    });
  }

  /**
   * Column configuration for the table
   */
  readonly columnData = getDefaultFilterColumnData();

  /**
   * Name of the column that identifies each row
   */
  readonly identifyingColumn = this.columnData.find((col) => col.identifier)?.name || 'File name';

  /**
   * Full dataset for the table
   */
  private readonly data = signal<RowData[]>([]);

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
   * Loaded accordion data for each row keyed by row identifier
   */
  readonly accordionData = signal<Record<string, AccordionRowData>>({});

  /**
   * Table data sorted according to current sort state
   */
  readonly sortedData = computed<RowData[]>(() => {
    return sortTableData(this.sortKey(), this.columnData, this.data());
  });

  /**
   * Fetches initial table data from the mock API
   */
  readonly getData = () => {
    this.mockTableApi.getTablePage(1, 4, this.sortKey(), this.columnData, 0).subscribe({
      next: (response) => {
        this.data.set(response.data);
      }
    });
  };

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
   * Toggles expansion state for all rows and fetches accordion data as needed
   */
  toggleHeader() {
    const isExpanded = !this.headerExpanded();
    this.headerExpanded.set(isExpanded);

    if (isExpanded) {
      // Expand all rows and load accordion data for any that haven't been loaded
      const allExpanded: Record<string, boolean> = {};
      this.data().forEach((row) => {
        const rowId: string = row[this.identifyingColumn];
        allExpanded[rowId] = true;
        if (!this.accordionData()[rowId]) {
          this.loadAccordionData(rowId);
        }
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

    // If expanding and data not yet loaded, fetch it
    if (!isExpanded && !this.accordionData()[rowId]) {
      this.loadAccordionData(rowId);
    }

    // Update header expanded state based on whether all rows are expanded
    const allRowsExpanded =
      this.data().length > 0 && this.data().every((row) => this.expandedRows()[row[this.identifyingColumn]] === true);

    this.headerExpanded.set(allRowsExpanded);
  }

  /**
   * Loads accordion data for a specific row from the mock API
   * @param rowId - Identifier of the row to load data for
   */
  private loadAccordionData(rowId: string) {
    // Set loading state
    this.accordionData.set({
      ...this.accordionData(),
      [rowId]: { data: null, loading: true }
    });

    // Fetch accordion data from the mock API
    const subscription = this.mockTableApi.getAccordionData(rowId).subscribe({
      next: (response) => {
        // Update with the fetched data
        this.accordionData.set({
          ...this.accordionData(),
          [rowId]: { data: response, loading: false }
        });
      },
      error: () => {
        // Handle error state
        this.accordionData.set({
          ...this.accordionData(),
          [rowId]: { data: null, loading: false }
        });
      }
    });

    // Store subscription for cleanup
    this.accordionSubscriptions$.set(rowId, subscription);
  }

  /**
   * Cleans up all accordion data subscriptions
   */
  ngOnDestroy() {
    this.accordionSubscriptions$.forEach((subscription) => subscription.unsubscribe());
    this.accordionSubscriptions$.clear();
  }
}
