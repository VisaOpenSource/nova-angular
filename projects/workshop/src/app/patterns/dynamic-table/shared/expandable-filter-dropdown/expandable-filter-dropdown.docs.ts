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
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AccordionDetailsDirective,
  AccordionDirective,
  AccordionHeadingDirective,
  AccordionPanelDirective,
  BadgeDirective,
  ButtonDirective,
  DropdownMenuDirective,
  FlexDirective,
  FloatingUIContainer,
  FloatingUITriggerDirective,
  IconToggleComponent,
  IconToggleDefaultTemplateDirective,
  IconToggleRotatedTemplateDirective,
  IdGenerator,
  NovaLibModule,
  PaddingDirective,
  TypographyDirective
} from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronRightTiny, VisaFilterAltTiny } from '@visa/nova-icons-angular';
import { ColData } from '../dynamic-table.constants';
import { FilterCheckboxListsDynamicTable } from '../filter-checkbox-lists/filter-checkbox-lists.docs';
import { toKebabCase } from '../dynamic-table.utils';

/**
 * Expandable Filter Dropdown Component
 * A dropdown component with expandable accordion items per column
 * Each accordion contains filter options for that column
 */
/** #patterns #isShared **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-dynamic-table-expandable-filter-dropdown',
  templateUrl: './expandable-filter-dropdown.docs.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  styleUrl: '../dynamic-table.scss',
  imports: [
    CommonModule,
    NovaLibModule,
    FloatingUIContainer,
    ButtonDirective,
    FloatingUITriggerDirective,
    VisaFilterAltTiny,
    BadgeDirective,
    TypographyDirective,
    DropdownMenuDirective,
    FlexDirective,
    PaddingDirective,
    AccordionDirective,
    AccordionHeadingDirective,
    AccordionDetailsDirective,
    IconToggleComponent,
    IconToggleDefaultTemplateDirective,
    IconToggleRotatedTemplateDirective,
    AccordionPanelDirective,
    FormsModule,
    FilterCheckboxListsDynamicTable,
    VisaChevronDownTiny,
    VisaChevronRightTiny
  ]
})
export class ExpandableFilterDropdownDynamicTableComponent {
  readonly toKebabCase = toKebabCase;

  private readonly idGenerator = inject(IdGenerator);
  /**
   * Unique identifier for this filter dropdown instance
   */
  readonly id = this.idGenerator.newId('expandable-filter-dropdown-');

  /**
   * Reference to the floating UI container for managing dropdown visibility
   */
  private readonly filterFloatingContainer = viewChild(FloatingUIContainer);

  /**
   * Currently applied filters for all columns
   */
  readonly appliedFilters = input.required<Record<string, string[]>>();
  /**
   * Flattened array of all active filter values across all columns
   */
  readonly filtersFlattened = computed(() => {
    return Object.values(this.appliedFilters())
      .flat()
      .filter((val) => val);
  });

  /**
   * Column configuration data
   */
  readonly columnData = input.required<ColData[]>();

  /**
   * Expansion state for each accordion panel
   */
  readonly accordionFilterStates = signal<boolean[]>([]);

  private initialized = false;
  // Initializes accordion states to collapsed for all columns on first render
  setAccordionFilterStates = effect(() => {
    if (!this.initialized && this.accordionFilterStates().length === 0) {
      this.accordionFilterStates.set(this.columnData().map(() => false));
      this.initialized = true;
    }
  });

  /**
   * Emits when filters for a specific column are applied
   */
  readonly applyColumnFilters = output<string>();
  /**
   * Emits when filters for a specific column are cleared
   */
  readonly clearColumnFilters = output<string>();

  /**
   * Emits when all filters across all columns are applied
   */
  readonly applyAllFilters = output<void>();
  /**
   * Emits when all filters across all columns are cleared
   */
  readonly clearAllFilters = output<void>();

  /**
   * Collapses all accordion panels when the dropdown closes
   */
  private readonly collapseAccordionsOnFilterClose = effect(() => {
    const isShown = this.filterFloatingContainer()?.isShown();
    if (!isShown) {
      if (this.accordionFilterStates().some((state) => state)) {
        this.accordionFilterStates.set(this.accordionFilterStates().map(() => false));
      }
    }
  });

  /**
   * Toggles the expansion state of an accordion panel
   * @param index - Index of the accordion panel to toggle
   */
  readonly toggleAccordion = (index: number) => {
    const states = [...this.accordionFilterStates()];
    states[index] = !states[index];
    this.accordionFilterStates.set(states);
  };

  /**
   * Manages focus for the filter dropdown
   * @param close - Whether to close the dropdown before restoring focus
   */
  public readonly filterDropdownFocus = (close: boolean = false) => {
    if (close) {
      this.filterFloatingContainer()?.floatingUIService?.hidefloatingUI();
    }
    this.filterFloatingContainer()?.floatingUIService?.restoreFocus();
  };

  /**
   * Returns the number of active filters for a specific column
   * @param columnName - Name of the column
   * @returns Count of active filters
   */
  filterLengthByColumn(columnName: string): number {
    return this.appliedFilters()[columnName]?.length || 0;
  }
}
