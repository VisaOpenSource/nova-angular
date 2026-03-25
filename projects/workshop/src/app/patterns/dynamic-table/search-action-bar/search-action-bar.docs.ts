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
import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation, signal, viewChild } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaClearAltTiny, VisaFilterAltTiny, VisaRefreshTiny, VisaSearchLow } from '@visa/nova-icons-angular';

/**
 * Action bar with search input and filter controls
 */
/** #patterns **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-dynamic-table-search-action-bar',
  templateUrl: './search-action-bar.docs.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  styleUrl: '../shared/dynamic-table.scss',
  imports: [CommonModule, NovaLibModule, VisaRefreshTiny, VisaFilterAltTiny, VisaClearAltTiny, VisaSearchLow]
})
export class SearchActionBarDynamicTableComponent {
  /**
   * Reference to search input element
   */
  readonly input = viewChild<ElementRef>('inputRef');
  /**
   * Reference to clear button element
   */
  readonly button = viewChild<ElementRef>('searchClearBtn');

  /**
   * Whether the search input currently has focus
   */
  readonly inFocus = signal(false);

  /**
   * Current value of the search input
   */
  value: string = '';

  /**
   * Updates focus state when focus leaves the search input
   * @param event - Focus event
   */
  blur(event: FocusEvent) {
    const { relatedTarget } = event;
    const buttonElement = this.button()?.nativeElement;
    const inputElement = this.input()?.nativeElement;
    if (relatedTarget !== buttonElement && relatedTarget !== inputElement) this.inFocus.set(false);
  }

  /**
   * Clears the search input value and returns focus to the input
   */
  clearAndFocus() {
    const input = this.input();
    if (!input) return;
    this.value = '';
    input.nativeElement.focus();
  }

  /**
   * Sets the focus state to true
   */
  focus() {
    this.inFocus.set(true);
  }
}
