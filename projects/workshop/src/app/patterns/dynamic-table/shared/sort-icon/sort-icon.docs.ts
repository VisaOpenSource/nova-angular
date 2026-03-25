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
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { VisaSortableTiny, VisaSortAscendingTiny, VisaSortDescendingTiny } from '@visa/nova-icons-angular';
import { SortType } from '../dynamic-table.constants';

/**
 * Shared Sort Icon Component
 * Displays the appropriate sort icon based on the current sort state
 */
/** #patterns #isShared **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VisaSortableTiny, VisaSortAscendingTiny, VisaSortDescendingTiny],
  standalone: true,
  selector: 'nova-workshop-dynamic-table-shared-sort-icon',
  templateUrl: './sort-icon.docs.html',
  styles: `
    :host {
      display: inline-flex;
    }
  `
})
export class SharedSortIconDynamicTableComponent {
  /**
   * Current sort state determining which icon to display
   */
  readonly sorted = input.required<SortType | undefined>();
}
