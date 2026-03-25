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
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ButtonDirective,
  CheckboxDirective,
  FlexDirective,
  InputContainerComponent,
  LabelDirective,
  ListboxContainerDirective,
  ListboxDirective,
  ListboxItemComponent,
  MarginDirective,
  PaddingDirective,
  ScreenreaderOnlyDirective,
  TypographyDirective
} from '@visa/nova-angular';
import { ColData } from '../dynamic-table.constants';
import { onFilterToggle, toKebabCase } from '../dynamic-table.utils';

/**
 * Filter Checkbox Lists Component
 * A reusable component for displaying filter options for a column as checkboxes in a listbox
 */
/** #patterns #isShared **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    LabelDirective,
    ScreenreaderOnlyDirective,
    TypographyDirective,
    PaddingDirective,
    MarginDirective,
    FlexDirective,
    InputContainerComponent,
    CheckboxDirective,
    ButtonDirective,
    ListboxContainerDirective,
    ListboxDirective,
    ListboxItemComponent
  ],
  standalone: true,
  selector: 'nova-workshop-dynamic-table-filter-checkbox-lists',
  templateUrl: './filter-checkbox-lists.docs.html'
})
export class FilterCheckboxListsDynamicTable {
  /**
   * Column data for the filter checkbox list
   */
  readonly column = input.required<ColData>();

  /**
   * Currently applied filters
   */
  readonly appliedFilters = input.required<Record<string, string[]>>();

  /**
   * Name of the column being filtered
   */
  readonly columnName = computed(() => this.column().name);
  /**
   * Kebab-cased version of the column name for use in element IDs
   */
  readonly columnNameKebab = computed(() => toKebabCase(this.column().name));

  /**
   * Available filters for the column
   */
  readonly filters = computed(() => this.column().headerActions?.options || []);

  /**
   * Unique ID for the filter checkbox list
   */
  readonly id = input.required<string>();

  /**
   * Whether to hide action buttons
   */
  readonly checkboxOnly = input(false, { transform: booleanAttribute });

  /**
   * Event emitted when filters are applied
   */
  readonly applyColumnFilters = output<string>();

  /**
   * Event emitted when filters are cleared
   */
  readonly clearColumnFilters = output<string>();

  /**
   * Determines whether a specific filter option is currently selected
   * @param filter - Filter option to check
   * @returns True if the filter is selected
   */
  isFilterSelected = (filter: string): boolean => {
    const applied = this.appliedFilters();
    const column = this.columnName();
    return applied?.[column]?.includes(filter) || false;
  };

  /**
   * Array of currently selected filter options for the column
   */
  readonly selectedOptions = computed(() => {
    const applied = this.appliedFilters();
    const column = this.columnName();
    return applied?.[column] || [];
  });

  /**
   * Updates the selection state of a filter option
   * @param filter - Filter option to toggle
   * @param isChecked - Whether the filter is being selected or deselected
   */
  onFilterToggle(filter: string, isChecked: boolean) {
    const updatedSelectedOptions = onFilterToggle(this.column(), filter, isChecked);
    if (this.column().headerActions) {
      this.column().headerActions!.selectedOptions = updatedSelectedOptions;
    }
  }

  /**
   * Applies selected options from the listbox to the column filters
   * @param selected - Array of selected option values
   */
  onListboxChange(selected: string[]) {
    if (this.column().headerActions) {
      this.column().headerActions!.selectedOptions = selected;
    }
  }

  /**
   * Clears all selected filters for the column
   */
  clearSelectedOptions() {
    this.clearColumnFilters.emit(this.column().name);
  }
}
