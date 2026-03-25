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
import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

/** #framework-specific */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-toggle-model-driven-form',
  templateUrl: './model-driven-form.docs.html',
  standalone: true,
  imports: [ReactiveFormsModule, NovaLibModule, VisaErrorTiny]
})
export class ModelDrivenFormToggleComponent {
  readonly formValidation = new FormGroup({
    toggleControl: new FormControl('2')
  });
  isSubmitted = false;
  isInvalid = false;

  handleChange() {
    this.isInvalid = false; // when a single select toggle button is changed, it means it is selected, so the group is no longer invalid
  }

  onSubmit(form: FormGroup, firstInput: HTMLButtonElement) {
    const selected = Object.values(form.value).find((item) => item !== ''); // if an item is selected, then form is valid
    this.isInvalid = selected ? false : true;
    this.isSubmitted = true;
    if (this.isInvalid) firstInput.focus();
  }

  onReset(form: FormGroup) {
    form.reset();
    this.isSubmitted = false;
  }

  /** For demo purposes */
  // Signal to track form control value using toSignal
  formValue = toSignal(this.formValidation.get('toggleControl')!.valueChanges, {
    initialValue: this.formValidation.get('toggleControl')?.value ?? null
  });

  // Computed signal for formatted display value
  formValueDisplay = computed(() => {
    const value = this.formValue();
    return value !== undefined ? value : '';
  });
}
