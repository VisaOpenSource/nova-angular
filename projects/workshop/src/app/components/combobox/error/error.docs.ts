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
import { ChangeDetectionStrategy, Component, computed, ElementRef, signal, viewChild } from '@angular/core';
import { ComboboxValue, InputDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaErrorTiny } from '@visa/nova-icons-angular';

/** #docs **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-combobox-error',
  templateUrl: './error.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaErrorTiny, VisaChevronDownTiny, VisaChevronUpTiny]
})
export class ErrorComboboxComponent {
  comboboxVal: ComboboxValue = null;
  readonly input = viewChild.required<InputDirective, ElementRef<HTMLInputElement>>(InputDirective, {
    read: ElementRef
  });
  // isInvalid is true if the form has been submitted and the combobox value is empty
  readonly isInvalid = computed(() => this.isSubmitted() && !this.comboboxVal?.value);
  readonly isSubmitted = signal(false);

  submit() {
    if (this.isInvalid()) this.input()?.nativeElement.focus();
    this.isSubmitted.set(true);
  }

  reset() {
    this.isSubmitted.set(false); // Reset the submitted state
    this.comboboxVal = null; // Clear the value in the combobox
  }
}
