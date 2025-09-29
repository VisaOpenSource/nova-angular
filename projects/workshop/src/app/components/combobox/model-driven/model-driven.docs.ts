/**
 *              © 2025 Visa
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
import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny } from '@visa/nova-icons-angular';

/** #framework-specific **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-combobox-model-driven',
  templateUrl: './model-driven.docs.html',
  standalone: true,
  imports: [ReactiveFormsModule, NovaLibModule, VisaChevronDownTiny, VisaChevronUpTiny]
})
export class ModelDrivenComboboxComponent {
  comboboxFormControl = new FormControl({ label: 'Option A', value: 'option-a' });

  // Signal to track form control value
  formValue = signal<{ label: string; value: string } | null>({ label: 'Option A', value: 'option-a' });

  // Computed signals for formatted display values
  labelDisplay = computed(() => {
    return this.formValue()?.label || 'none';
  });

  valueDisplay = computed(() => {
    return this.formValue()?.value || 'none';
  });

  constructor() {
    // Subscribe to form control value changes
    this.comboboxFormControl.valueChanges.subscribe((value) => {
      this.formValue.set(value || null);
    });
  }
}
