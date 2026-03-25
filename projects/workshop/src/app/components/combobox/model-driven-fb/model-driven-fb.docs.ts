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
import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaErrorTiny } from '@visa/nova-icons-angular';

/** #framework-specific */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-combobox-model-driven-fb',
  templateUrl: './model-driven-fb.docs.html',
  standalone: true,
  imports: [ReactiveFormsModule, NovaLibModule, VisaErrorTiny, VisaChevronDownTiny, VisaChevronUpTiny]
})
export class ModelDrivenFbComboboxComponent {
  readonly input = viewChild.required<InputDirective, ElementRef<HTMLInputElement>>(InputDirective, {
    read: ElementRef
  });

  readonly fb = inject(FormBuilder);

  readonly comboboxForm = this.fb.group({
    comboboxFormControl: this.fb.control<{ label: string; value: string } | null | ''>(null, Validators.required)
  });
  readonly isSubmitted = signal(false);
  /* isInvalid is true if the form has been submitted and the combobox value is empty */
  readonly isInvalid = computed(() => this.isSubmitted() && this.comboboxForm.controls.comboboxFormControl.invalid);

  // Signal to track form control value using toSignal
  formValue = toSignal(this.comboboxForm.get('comboboxFormControl')!.valueChanges, {
    initialValue: this.comboboxForm.get('comboboxFormControl')?.value || null
  });

  // Computed signals for formatted display values
  labelDisplay = computed(() => {
    const value = this.formValue();
    return value && typeof value !== 'string' ? value.label : '';
  });

  valueDisplay = computed(() => {
    const value = this.formValue();
    return value && typeof value !== 'string' ? value.value : '';
  });

  submit() {
    this.isSubmitted.set(true);
    if (this.isInvalid()) this.input().nativeElement.focus();
  }

  reset() {
    this.isSubmitted.set(false);
    /* Clear the value in the combobox */
    this.comboboxForm.controls.comboboxFormControl.reset(null);
  }
}
