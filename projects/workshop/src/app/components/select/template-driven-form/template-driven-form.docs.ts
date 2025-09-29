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
import { NovaLibModule, SelectDirective } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaErrorTiny } from '@visa/nova-icons-angular';

/** #framework-specific **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-select-template-driven-form',
  templateUrl: './template-driven-form.docs.html',
  standalone: true,
  imports: [FormsModule, NovaLibModule, VisaErrorTiny, VisaChevronDownTiny]
})
export class TemplateDrivenFormSelectComponent {
  readonly selects = viewChildren<SelectDirective, ElementRef<HTMLSelectElement>>(SelectDirective, {
    read: ElementRef
  });

  isSubmitted = false;

  handleReset(form: NgForm) {
    this.isSubmitted = false;
    form.reset();
  }

  handleSubmit(form: NgForm) {
    this.isSubmitted = true;
    const invalidIndex = Object.values(form.value).findIndex((item) => !item);
    if (invalidIndex !== -1 && this.selects.length > 0) {
      this.selects()[invalidIndex].nativeElement.focus();
    }
  }
}
