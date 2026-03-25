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
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { NovaLibModule, TableSize } from '@visa/nova-angular';
import { capitalCase } from 'change-case';
import {
  DynamicReusableForm,
  PropertyConfig
} from '../../../shared/app-components/reusable-components-form/dynamic-reusable-form';
import { BaseRow, ReusableTable, TableColumn } from './reusable-component/reusable-component.docs';

export type DemoRow = {
  'column-a': number | string;
  'column-b': number | string;
  'column-c': number | string;
  'column-d': number | string;
} & BaseRow;

const demoColumns: TableColumn<DemoRow>[] = [
  { key: 'column-a', title: 'Column A', sortable: false },
  { key: 'column-b', title: 'Column B', sortable: false },
  { key: 'column-c', title: 'Column C', sortable: false },
  { key: 'column-d', title: 'Column D', sortable: false }
];

const demoGroupHeaders: TableColumn<DemoRow>[] = [
  { colspan: 2, title: 'Group header 1' },
  { colspan: 2, title: 'Group header 2' }
];

const demoRows: DemoRow[] = Array.from({ length: 3 }, (_, i) => ({
  id: i + 1,
  'column-a': `A${i + 1}`,
  'column-b': `B${i + 1}`,
  'column-c': `C${i + 1}`,
  'column-d': `D${i + 1}`
}));

/**
 * This is a reusable component template.
 * The files in the reusable-component/ subdirectory are the component implementation you can copy and modify.
 * The other files show usage examples.
 * #AI-first
 */
@Component({
  selector: 'nova-reusable-table-demo',
  imports: [NovaLibModule, ReusableTable, DynamicReusableForm],
  templateUrl: './reusable.docs.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReusableTableDemo {
  readonly name = 'reusable-table-demo';

  protected propertyConfigs: PropertyConfig[] = [
    {
      name: 'caption',
      type: 'string',
      defaultValue: 'This is required text that describes the table in more detail.',
      label: 'Caption'
    },
    {
      name: 'columns',
      type: 'json',
      defaultValue: JSON.stringify(demoColumns, null, 2),
      label: 'Columns (JSON)',
      helpText: 'Edit the JSON array of column definitions.'
    },
    {
      name: 'rows',
      type: 'json',
      defaultValue: JSON.stringify(demoRows, null, 2),
      label: 'Rows (JSON)',
      helpText: 'Edit the JSON array of table rows.'
    },
    {
      name: 'tableSize',
      type: 'enum',
      defaultValue: TableSize.LARGE,
      label: 'Table size',
      options: [TableSize.COMPACT, TableSize.MEDIUM, TableSize.LARGE].map((type) => ({
        label: capitalCase(type),
        value: type
      }))
    },
    {
      name: 'alternate',
      type: 'boolean',
      defaultValue: true,
      label: 'Alternate (banded rows)'
    },
    {
      name: 'dividerLines',
      type: 'boolean',
      defaultValue: false,
      label: 'Divider lines'
    },
    {
      name: 'horizontalDividerLines',
      type: 'boolean',
      defaultValue: false,
      label: 'Horizontal divider lines'
    },
    {
      name: 'keyValue',
      type: 'boolean',
      defaultValue: false,
      label: 'Key value'
    },
    {
      name: 'showGroupHeaders',
      type: 'boolean',
      defaultValue: false,
      label: 'Show group headers',
      helpText: 'When enabled, displays group headers above the column headers.'
    },
    {
      name: 'groupHeaders',
      type: 'json',
      defaultValue: JSON.stringify(demoGroupHeaders, null, 2),
      label: 'Header columns (JSON)',
      visibleWhen: { property: 'showGroupHeaders', value: true }
    },
    {
      name: 'subtle',
      type: 'boolean',
      defaultValue: false,
      label: 'Subtle'
    }
  ];

  protected form = viewChild.required('formComponent', { read: DynamicReusableForm });

  protected parseColumns(value: string): TableColumn<DemoRow>[] {
    try {
      return JSON.parse(value) as TableColumn<DemoRow>[];
    } catch {
      return demoColumns;
    }
  }

  protected parseRows(value: string): DemoRow[] {
    try {
      return JSON.parse(value) as DemoRow[];
    } catch {
      return demoRows;
    }
  }

  protected parsegroupHeaders(value: string): TableColumn<DemoRow>[] {
    try {
      return JSON.parse(value) as TableColumn<DemoRow>[];
    } catch {
      return demoGroupHeaders;
    }
  }
}
