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
import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaSuccessHigh } from '@visa/nova-icons-angular';

/**
 * Displays a success confirmation page after wizard submission.
 * Shows a success icon and message with an option to start over.
 */
/** #patterns #isShared **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-wizard-shared-success-page',
  templateUrl: './success-page.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaSuccessHigh]
})
export class SharedWizardSuccessPageComponent {
  /** Emits when the user chooses to reset and start a new wizard flow */
  readonly reset = output<void>();
}
