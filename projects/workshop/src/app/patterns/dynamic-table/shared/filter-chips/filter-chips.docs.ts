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
import { ChangeDetectionStrategy, Component, computed, input, output, viewChildren } from '@angular/core';
import {
  ButtonDirective,
  ChipDirective,
  FlexDirective,
  LabelDirective,
  ScreenreaderOnlyDirective,
  TypographyDirective
} from '@visa/nova-angular';
import { VisaClearAltTiny } from '@visa/nova-icons-angular';
import { ColData } from '../dynamic-table.constants';

/**
 * Filter Chips Component
 * A reusable component to display active filter chips for the dynamic table
 */
/** #patterns #isShared **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlexDirective,
    TypographyDirective,
    LabelDirective,
    ScreenreaderOnlyDirective,
    ChipDirective,
    ButtonDirective,
    VisaClearAltTiny
  ],
  standalone: true,
  selector: 'nova-workshop-dynamic-table-filter-chips',
  templateUrl: './filter-chips.docs.html'
})
export class SharedFilterChipsDynamicTableComponent {
  /**
   * References to chip elements for focus management
   */
  private readonly chips = viewChildren(ChipDirective);
  /**
   * Unique identifier for this component instance
   */
  readonly id = input.required<string>();

  /**
   * Column configuration for mapping filters to columns
   */
  readonly columnData = input.required<ColData[]>();

  /**
   * Active filters mapped by column name
   */
  readonly filters = input.required<Record<string, string[]>>();
  /**
   * Flattened array of all active filter values
   */
  readonly filtersFlattened = computed(() => {
    return Object.values(this.filters())
      ?.flat()
      .filter((val) => val);
  });

  /**
   * Column names that have at least one active filter
   */
  readonly columnNamesWithFilters = computed(() => {
    return Object.keys(this.filters()).filter((columnName) => this.filters()[columnName]?.length > 0);
  });

  /**
   * Emits when all filters should be cleared
   */
  readonly clearAllFilters = output<void>();

  /**
   * Emits when a single filter should be removed
   */
  readonly clearSingleFilter = output<{ columnName: string; filter: string }>();

  /**
   * Emits when there are no chips remaining to receive focus
   */
  readonly noChipsToFocus = output<void>();

  /**
   * Removes a single filter chip and manages focus
   * @param columnName - Name of the column associated with the filter
   * @param filter - Filter value to clear
   */
  clearFilter(columnName: string, filter: string) {
    const chips = this.chips();
    const currentIndex = this.filtersFlattened().indexOf(filter);
    if (currentIndex > 0) {
      chips[currentIndex - 1].button()?.el.nativeElement.focus();
    } else if (currentIndex === 0 && chips.length > 1) {
      chips[1].button()?.el.nativeElement.focus();
    } else {
      this.noChipsToFocus.emit();
    }
    this.clearSingleFilter.emit({ columnName, filter });
  }
}
