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
import { ChangeDetectionStrategy, Component, ElementRef, viewChildren } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

/** #framework-specific */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-input-model-driven-form',
  templateUrl: './model-driven-form.docs.html',
  standalone: true,
  imports: [ReactiveFormsModule, NovaLibModule, VisaErrorTiny]
})
export class ModelDrivenFormInputComponent {
  readonly inputs = viewChildren(InputDirective, { read: ElementRef });

  readonly input1 = new FormControl('', [Validators.required]);
  readonly input2 = new FormControl('', [Validators.required]);
  readonly input3 = new FormControl('', [Validators.required]);
  readonly formValidation = new FormGroup({
    input1: this.input1,
    input2: this.input2,
    input3: this.input3
  });
  isSubmitted = false;

  onReset() {
    this.formValidation.reset();
    this.isSubmitted = false;
  }

  onSubmit() {
    this.isSubmitted = true;
    const invalidIndex = Object.values(this.formValidation.controls).findIndex((control) => control.invalid);
    if (invalidIndex !== -1) {
      this.inputs()[invalidIndex].nativeElement.focus();
    }
  }
}
