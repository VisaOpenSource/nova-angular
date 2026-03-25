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
import { VisaCloseTiny, VisaSuccessLow } from '@visa/nova-icons-angular';

/**
 * Displays a temporary success flag notification after saving wizard progress.
 * Shows a success icon with a message and a dismiss button.
 */
/** #patterns #isShared **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-wizard-shared-save-flag',
  templateUrl: './save-flag.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaSuccessLow, VisaCloseTiny]
})
export class SharedWizardSaveFlagComponent {
  /** Emits when the user dismisses the save notification flag */
  readonly closeFlag = output<void>();
}
