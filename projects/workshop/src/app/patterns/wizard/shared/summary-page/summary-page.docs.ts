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
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaEditTiny } from '@visa/nova-icons-angular';

/**
 * Represents a single step in a wizard flow.
 * @property {string} stepLabel - Display label for the step
 * @property {string} [inputLabel] - Label text for the input field within this step
 * @property {string} [inputValue] - Current value of the input field
 * @property {number | string} [id] - Unique identifier for the step
 */
export interface Step {
  stepLabel: string;
  inputLabel?: string;
  inputValue?: string;
  id?: number | string;
}

/**
 * Displays a summary page showing all wizard step values with edit functionality.
 * Typically rendered as the final step before submission in a multi-step wizard.
 */
/** #patterns #isShared **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-wizard-shared-summary-page',
  templateUrl: './summary-page.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaEditTiny]
})
export class SharedWizardSummaryPageComponent {
  /** Emits the step index when a user clicks an edit button */
  readonly edit = output<number>();

  /** Array of wizard steps to display in the summary */
  readonly steps = input<Step[]>([]);
}
