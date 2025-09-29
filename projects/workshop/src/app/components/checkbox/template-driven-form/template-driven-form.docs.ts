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

import { ChangeDetectionStrategy, Component, ElementRef, viewChildren } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CheckboxDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

/** #framework-specific */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-checkbox-template-driven-form',
  templateUrl: './template-driven-form.docs.html',
  standalone: true,
  imports: [FormsModule, NovaLibModule, VisaErrorTiny]
})
export class TemplateDrivenFormCheckboxComponent {
  readonly checkboxes = viewChildren<CheckboxDirective, ElementRef<HTMLInputElement>>(CheckboxDirective, {
    read: ElementRef
  });
  isInvalid = false;

  handleChange(form: NgForm) {
    this.isInvalid = !Object.values(form.value).some((item) => item === true);
  }

  handleFormSubmit(form: NgForm) {
    const selected = Object.values(form.value).find((item) => item === true); // if an item is selected, then form is valid
    this.isInvalid = selected ? false : true;

    if (this.isInvalid) {
      // focus the first input since it is invalid (or form would be valid)
      this.checkboxes()?.[0].nativeElement.focus();
    }
  }

  handleFormReset(form: NgForm) {
    this.isInvalid = false;
    form.reset();
  }
}
