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
import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChildren } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NovaLibModule, SelectDirective } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaErrorTiny } from '@visa/nova-icons-angular';

/** #framework-specific **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-select-model-driven-fb',
  templateUrl: './model-driven-fb.docs.html',
  standalone: true,
  imports: [ReactiveFormsModule, NovaLibModule, VisaErrorTiny, VisaChevronDownTiny]
})
export class ModelDrivenFbSelectComponent {
  readonly fb = inject(FormBuilder);
  readonly formValidation = this.fb.group({
    input1: ['', Validators.required],
    input2: ['', Validators.required],
    input3: ['', Validators.required]
  });
  readonly selects = viewChildren<SelectDirective, ElementRef<HTMLSelectElement>>(SelectDirective, {
    read: ElementRef
  });
  isSubmitted = false;

  handleReset() {
    this.formValidation.reset();
    this.isSubmitted = false;
  }

  handleSubmit() {
    const form = this.formValidation;
    const invalidIndex = Object.values(form.value).findIndex((item) => !item);
    if (invalidIndex !== -1 && this.selects.length > 0) {
      this.selects()[invalidIndex].nativeElement.focus();
    }
    this.isSubmitted = true;
  }
}
