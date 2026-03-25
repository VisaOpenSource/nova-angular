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
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

/** #framework-specific */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-radio-model-driven-form',
  templateUrl: './model-driven-form.docs.html',
  standalone: true,
  imports: [ReactiveFormsModule, NovaLibModule, VisaErrorTiny]
})
export class ModelDrivenFormRadioComponent {
  private readonly firstInput = viewChild(HTMLInputElement);
  readonly formValidation = new FormGroup({
    radioControl: new FormControl('2')
  });
  isSubmitted = false;
  isInvalid = false;

  items = [
    {
      label: 'Label 1',
      value: '1'
    },
    {
      label: 'Label 2',
      value: '2'
    },
    {
      label: 'Label 3',
      value: '3'
    }
  ];

  handleChange() {
    this.isInvalid = false; // when a radio button is changed, it means it is selected, so the group is no longer invalid
  }

  onSubmit(form: FormGroup) {
    const selected = Object.values(form.value).find((item) => item !== ''); // if an item is selected, then form is valid
    this.isInvalid = selected ? false : true;
    this.isSubmitted = true;
    if (this.isInvalid) this.firstInput()?.focus();
  }

  onReset(form: FormGroup) {
    form.reset();
    this.isSubmitted = false;
  }
}
