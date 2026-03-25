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
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ButtonDirective,
  FlexDirective,
  IdGenerator,
  InputMessageDirective,
  LabelDirective,
  ListboxContainerDirective,
  ListboxDirective,
  ListboxItemComponent,
  PaddingDirective
} from '@visa/nova-angular';
import { ColData } from '../dynamic-table.constants';
import { toKebabCase } from '../dynamic-table.utils';

/**
 * Show Columns Dropdown Component
 * A dropdown component to show/hide available columns in the dynamic table
 */
/** #patterns #isShared **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlexDirective,
    PaddingDirective,
    LabelDirective,
    ListboxContainerDirective,
    ListboxDirective,
    ListboxItemComponent,
    InputMessageDirective,
    FormsModule,
    ButtonDirective
  ],
  standalone: true,
  selector: 'nova-workshop-dynamic-table-show-columns-dropdown',
  templateUrl: './show-columns-dropdown.docs.html'
})
export class ShowColumnsDropdownDynamicTableComponent {
  readonly toKebabCase = toKebabCase;
  private readonly idGenerator = inject(IdGenerator);
  /**
   * Column data for the table
   */
  readonly columnData = input.required<ColData[]>();

  /**
   * Number of currently hidden columns
   */
  readonly hiddenColumnsLength = computed(() => this.columnData().filter((col) => col.hidden).length);

  /**
   * Visibility state for each column keyed by column name
   */
  readonly columnVisibility = input.required<Record<string, boolean>>();

  /**
   * Array of currently visible column names
   */
  selectedColumns = computed(() => {
    return Object.keys(this.columnVisibility()).filter((key) => this.columnVisibility()[key]);
  });

  /**
   * Non-signal copy of selected columns for form binding compatibility in Angular 18-20
   */
  selectedColumnsNonSignal: string[] = [];

  // Keeps non-signal copy in sync with signal value for form binding
  updateSelected = effect(() => {
    const selected = this.selectedColumns();
    this.selectedColumnsNonSignal = selected;
  });

  /**
   * Unique identifier for this component instance
   */
  readonly id = this.idGenerator.newId('dynamic-table-actions-button-');

  /**
   * Emits when column visibility should be updated
   */
  readonly toggleAllColVisibility = output<string[]>();

  /**
   * Emits when the table should reset to default visibility
   */
  readonly resetTable = output<void>();
}
