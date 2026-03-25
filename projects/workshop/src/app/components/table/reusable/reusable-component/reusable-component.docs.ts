/**
 *              © 2026 Visa
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
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  Type
} from '@angular/core';
import { IdGenerator, NovaLibModule, TableSize } from '@visa/nova-angular';
import { VisaArrowDownTiny, VisaArrowUpTiny, VisaSortableTiny } from '@visa/nova-icons-angular';

export interface BaseRow {
  id: number | string;
}

/**
 * This is the type of data input used with custom column components
 * Use this `input` inside your `TableColumn`
 * */
export interface ColumnDataInput<T extends BaseRow> {
  cell: unknown;
  index: number;
  key: keyof T;
  row: T;
}

export interface Sort<RowData extends BaseRow> {
  ascending?: boolean;
  key?: keyof RowData;
}

export interface TableColumn<RowData extends BaseRow> {
  colspan?: number;
  component?: Type<any> | null;
  groupHeader?: boolean;
  inputs?: Record<string, unknown>;
  key?: keyof RowData;
  sortable?: boolean;
  activeTypographyStyle?: boolean;
  iconString?: string;
  /**
   * Transform displayed column data
   * NOTE: it is preferable to do this only once when the data get's loaded in, not every render
   * */
  transform?: (data: RowData) => string;
  title?: string;
}

/** #AI-first */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-reusable-table',
  imports: [CommonModule, NovaLibModule, VisaArrowDownTiny, VisaArrowUpTiny, VisaSortableTiny],
  templateUrl: './reusable-component.docs.html'
})
export class ReusableTable<RowDataType extends BaseRow> {
  // Unique ID for the input
  private readonly generatedId = inject(IdGenerator).newId('reusable-table');

  // Inputs:
  readonly alternate = input(true, { transform: booleanAttribute });
  readonly caption = input.required<string>();
  readonly columns = input<TableColumn<RowDataType>[]>([]);
  readonly dividerLines = input(false, { transform: booleanAttribute });
  readonly groupHeaders = input<TableColumn<RowDataType>[]>([]);
  readonly horizontalDividerLines = input(false, { transform: booleanAttribute });
  readonly idInput = input<string | null>(null, { alias: 'id' });
  readonly keyValue = input(false, { transform: booleanAttribute });
  readonly rows = input<RowDataType[]>();
  readonly sort = model<Sort<RowDataType>>();
  readonly subtle = input(false, { transform: booleanAttribute });
  readonly tableSize = input<TableSize>(TableSize.LARGE);
  readonly rowHeader = input<string | null>('column-a');

  // Computed values:
  protected readonly id = computed(() => this.idInput() ?? this.generatedId);

  protected handleSort = (column: TableColumn<RowDataType>) => {
    if (column.key === undefined || !column.sortable) return;
    this.sort.set({
      ascending: column.key === this.sort()?.key ? !this.sort()?.ascending : true,
      key: column.key
    });
  };

  protected getColumnInputs(
    row: RowDataType,
    key: keyof RowDataType,
    index: number,
    inputs: Record<string, unknown> = {}
  ) {
    return {
      data: {
        cell: row[key],
        index: index,
        key: key,
        row: row
      },
      ...inputs
    };
  }
}
