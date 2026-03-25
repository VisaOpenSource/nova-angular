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
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';

type RowData = Record<string, string>;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-table-large-padding-banded-rows',
  templateUrl: './large-padding-banded-rows.docs.html'
})
export class LargePaddingBandedRowsTableComponent {
  readonly columnData = signal<string[]>(['Column A', 'Column B', 'Column C', 'Column D']);
  readonly rowData = signal<RowData[]>([
    {
      'col-a': 'A1',
      'col-b': 'B1',
      'col-c': 'C1',
      'col-d': 'D1'
    },
    {
      'col-a': 'A2',
      'col-b': 'B2',
      'col-c': 'C2',
      'col-d': 'D2'
    },
    {
      'col-a': 'A3',
      'col-b': 'B3',
      'col-c': 'C3',
      'col-d': 'D3'
    }
  ]);
}
