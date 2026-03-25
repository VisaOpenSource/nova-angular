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
import { ChangeDetectionStrategy, Component, viewChildren } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NovaLibModule, RadioDirective } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

/** #framework-specific */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-radio-template-driven-form',
  templateUrl: './template-driven-form.docs.html',
  standalone: true,
  imports: [FormsModule, NovaLibModule, VisaErrorTiny]
})
export class TemplateDrivenFormRadioComponent {
  readonly radios = viewChildren(RadioDirective);
  isInvalid: boolean = false;
  radioVal: string = '2';

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

  handleFormSubmit(form: NgForm) {
    const selected = Object.values(form.value).find((item) => item !== ''); // if an item is selected, then form is valid
    this.isInvalid = selected ? false : true;
    if (this.isInvalid) {
      this.radios()[0]?.el.nativeElement.focus();
    }
  }

  handleFormReset(form: NgForm) {
    this.isInvalid = false;
    form.resetForm();
  }
}
