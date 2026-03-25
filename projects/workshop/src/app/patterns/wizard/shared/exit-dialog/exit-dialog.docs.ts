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
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaCloseTiny, VisaWarningLow } from '@visa/nova-icons-angular';

/**
 * Displays a confirmation dialog when users attempt to exit a wizard.
 * Warns that unsaved progress may be lost and provides cancel/confirm actions.
 */
/** #patterns #isShared **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-wizard-shared-exit-dialog',
  templateUrl: './exit-dialog.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaWarningLow, VisaCloseTiny, CdkTrapFocus]
})
export class SharedWizardExitDialogComponent {
  /** Reference to the native dialog element */
  readonly dialog = viewChild('dialog', { read: ElementRef });

  /**
   * Opens the exit confirmation dialog as a modal.
   * Uses the native showModal() method to display the dialog with backdrop.
   */
  openDialog() {
    this.dialog()?.nativeElement.showModal();
  }

  /**
   * Closes the exit confirmation dialog.
   * Uses the native close() method to dismiss the dialog.
   */
  closeDialog() {
    this.dialog()?.nativeElement.close();
  }
}
