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
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';

type RowData = Record<string, string>;

/** #custom */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-table-fixed-first-column',
  templateUrl: './fixed-first-column.docs.html',
  styles: `
    .fixed-table {
      background: var(--v-table-background);
      tr > th:first-child,
      tr > td:first-child {
        position: sticky;
        left: 0;
      }
    }
    .fixed-column-standard {
      tr,
      td,
      th {
        background: var(--v-table-background);
      }
    }
    .fixed-column-alt {
      tbody {
        tr:nth-child(odd) th {
          background: var(--v-table-background);
        }
        tr:nth-child(even) th {
          background: var(--v-table-background-alt);
        }
      }
      tr:nth-child(odd) td {
        background: var(--v-table-background);
      }
      tr:nth-child(even) td {
        background: var(--v-table-background-alt);
      }
    }
  `
})
export class FixedFirstColumnComponent {
  readonly alternate = signal(false);
  readonly columnData = signal<string[]>([
    'Column A',
    'Column B',
    'Column C',
    'Column D',
    'Column E',
    'Column F',
    'Column G',
    'Column H',
    'Column I',
    'Column J',
    'Column K',
    'Column L',
    'Column M',
    'Column N'
  ]);
  readonly rowData = signal<RowData[]>([
    {
      'col-a': 'A1',
      'col-b': 'B1',
      'col-c': 'C1',
      'col-d': 'D1',
      'col-e': 'E1',
      'col-f': 'F1',
      'col-g': 'G1',
      'col-h': 'H1',
      'col-i': 'I1',
      'col-j': 'J1',
      'col-k': 'K1',
      'col-l': 'L1',
      'col-m': 'M1',
      'col-n': 'N1'
    },
    {
      'col-a': 'A2',
      'col-b': 'B2',
      'col-c': 'C2',
      'col-d': 'D2',
      'col-e': 'E2',
      'col-f': 'F2',
      'col-g': 'G2',
      'col-h': 'H2',
      'col-i': 'I2',
      'col-j': 'J2',
      'col-k': 'K2',
      'col-l': 'L2',
      'col-m': 'M2',
      'col-n': 'N2'
    },
    {
      'col-a': 'A3',
      'col-b': 'B3',
      'col-c': 'C3',
      'col-d': 'D3',
      'col-e': 'E3',
      'col-f': 'F3',
      'col-g': 'G3',
      'col-h': 'H3',
      'col-i': 'I3',
      'col-j': 'J3',
      'col-k': 'K3',
      'col-l': 'L3',
      'col-m': 'M3',
      'col-n': 'N3'
    },
    {
      'col-a': 'A4',
      'col-b': 'B4',
      'col-c': 'C4',
      'col-d': 'D4',
      'col-e': 'E4',
      'col-f': 'F4',
      'col-g': 'G4',
      'col-h': 'H4',
      'col-i': 'I4',
      'col-j': 'J4',
      'col-k': 'K4',
      'col-l': 'L4',
      'col-m': 'M4',
      'col-n': 'N4'
    }
  ]);

  originalOrder = (): number => {
    return 0;
  };

  handleAlternate() {
    this.alternate.update((alternate) => !alternate);
  }
}
