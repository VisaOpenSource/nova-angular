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
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  viewChild
} from '@angular/core';
import {
  AddArrowKeysDirective,
  ButtonDirective,
  DividerDirective,
  DropdownItemDirective,
  DropdownListDirective,
  DropdownMenuDirective,
  FlexDirective,
  FloatingUIContainer,
  FloatingUITriggerDirective,
  IdGenerator,
  MarginDirective,
  PaddingDirective
} from '@visa/nova-angular';
import {
  VisaOptionHorizontalTiny,
  VisaOptionVerticalTiny,
  VisaPasswordHideTiny,
  VisaPinFillTiny,
  VisaPinOutlineTiny,
  VisaSortAscendingTiny,
  VisaSortDescendingTiny
} from '@visa/nova-icons-angular';
import { ColData, SortType } from '../dynamic-table.constants';
import { toKebabCase } from '../dynamic-table.utils';
import { FilterCheckboxListsDynamicTable } from '../filter-checkbox-lists/filter-checkbox-lists.docs';
import { SharedSortIconDynamicTableComponent } from '../sort-icon/sort-icon.docs';

/**
 * Actions Button Component
 * A reusable actions button for dynamic table columns
 * Includes sorting, pinning, hiding, and filtering options
 */
/** #patterns #isShared **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SharedSortIconDynamicTableComponent,
    MarginDirective,
    FloatingUIContainer,
    ButtonDirective,
    FloatingUITriggerDirective,
    DropdownMenuDirective,
    AddArrowKeysDirective,
    FlexDirective,
    PaddingDirective,
    DropdownListDirective,
    DropdownItemDirective,
    DividerDirective,
    VisaOptionHorizontalTiny,
    VisaOptionVerticalTiny,
    VisaSortAscendingTiny,
    VisaSortDescendingTiny,
    VisaPinFillTiny,
    VisaPinOutlineTiny,
    VisaPasswordHideTiny,
    DividerDirective,
    FilterCheckboxListsDynamicTable
  ],
  standalone: true,
  selector: 'nova-workshop-dynamic-table-actions-button',
  templateUrl: './actions-button.docs.html',
  styleUrl: '../dynamic-table.scss',
  host: {
    style: 'flex-grow: 1; display: inline-flex'
  }
})
export class ActionsButtonDynamicTableComponent {
  readonly toKebabCase = toKebabCase;
  private readonly idGenerator = inject(IdGenerator);
  private readonly floatingUIContainer = viewChild<FloatingUIContainer>(FloatingUIContainer);

  /**
   * Label for the actions button, typically the column or row name
   */
  readonly label = input.required<string>();

  /**
   * Unique identifier for this actions button instance
   */
  readonly id = this.idGenerator.newId('dynamic-table-actions-button-');

  /**
   * Column configuration data
   */
  readonly column = input<ColData | undefined>();

  /**
   * Current sort state of the column
   */
  readonly sorted = input<SortType>(SortType.NONE);

  /**
   * Emits when a sort action is triggered
   */
  readonly sort = output<SortType>();

  /**
   * Whether the column is currently pinned
   */
  readonly pinned = input<boolean | null>(null);
  /**
   * Emits when the pin state changes
   */
  readonly pin = output<boolean>();

  /**
   * Whether to display the hide column option in the menu
   */
  readonly includeHide = input(false, { transform: booleanAttribute });

  /**
   * Emits when the hide action is triggered
   */
  readonly hide = output<boolean>();

  /**
   * Currently applied filters for all columns
   */
  readonly appliedFilters = input<Record<string, string[]>>();

  /**
   * Manual override for sort-only mode
   */
  readonly sortOnlyInput = input(null, { alias: 'sortOnly', transform: booleanAttribute });
  /**
   * Whether this button displays only sort functionality without a dropdown menu
   */
  readonly sortOnly = computed(() => {
    // Use manual override if provided
    if (this.sortOnlyInput() !== null) {
      return this.sortOnlyInput();
    }
    // Determine based on available actions: show dropdown only if there are filters, pins, hide, or generic actions
    return (
      (!(
        this.column()?.headerActions ||
        this.column()?.genericHeaderActions ||
        this.includeHide() ||
        this.pinned() !== null ||
        this.appliedFilters()
      ) &&
        this.column()?.sortable) ??
      false
    );
  });

  /**
   * Emits when column filters should be applied.
   */
  readonly applyColumnFilters = output<string>();

  /**
   * Emits when column filters should be cleared.
   */
  readonly clearColumnFilters = output<string>();

  /**
   * Closes the dropdown menu and restores focus to the trigger button
   */
  public readonly closeFloatingUI = () => {
    this.floatingUIContainer()?.floatingUIService?.hidefloatingUI();
    this.floatingUIContainer()?.floatingUIService?.restoreFocus();
  };
}
