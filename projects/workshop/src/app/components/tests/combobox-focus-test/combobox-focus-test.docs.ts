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
import { DialogDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaCloseTiny, VisaChevronRightTiny } from '@visa/nova-icons-angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-combobox-focus-test',
  templateUrl: './combobox-focus-test.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaCloseTiny, VisaChevronDownTiny, VisaChevronUpTiny, VisaChevronRightTiny, CdkTrapFocus]
})
export class ComboboxFocusTestComponent {
  readonly dialog = viewChild<DialogDirective, ElementRef<HTMLDialogElement>>(DialogDirective, {
    read: ElementRef
  });

  isShown = false;

  toggleShown(_toggledOutput: boolean) {
    this.isShown = _toggledOutput;
  }

  showModal() {
    this.dialog()?.nativeElement.showModal();
  }

  closeModal() {
    this.dialog()?.nativeElement.close();
  }
}
