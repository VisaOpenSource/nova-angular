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
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, viewChild, viewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CheckboxDirective,
  ComboboxDirective,
  InputDirective,
  ListboxDirective,
  NovaLibModule,
  RadioDirective,
  SelectDirective,
  SwitchDirective
} from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny } from '@visa/nova-icons-angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-form-control-ng',
  templateUrl: './form-control-ng.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaChevronDownTiny, VisaChevronUpTiny, ReactiveFormsModule, FormsModule]
})
export class FormControlNgComponent implements AfterViewInit {
  readonly checkbox = viewChild(CheckboxDirective);
  readonly combobox = viewChild(ComboboxDirective);
  readonly listbox = viewChildren(ListboxDirective);
  readonly input = viewChildren(InputDirective);
  readonly radios = viewChildren(RadioDirective);
  readonly select = viewChild<SelectDirective, ElementRef<HTMLSelectElement>>(SelectDirective, {
    read: ElementRef
  });
  readonly switch = viewChild(SwitchDirective);

  formGroup: FormGroup;
  controlNames = ['input', 'select', 'radio', 'checkbox', 'switch', 'listbox', 'combobox'];
  hasInitialValues = true;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.createFormGroup(this.hasInitialValues);
  }

  private createFormGroup(withInitialValues: boolean): FormGroup {
    if (withInitialValues) {
      return this.fb.group({
        input: ['Initial text'],
        select: ['2'],
        radio: ['2'],
        checkbox: [true],
        switch: [true],
        listbox: ['item-2'],
        combobox: [{ label: 'Item 1', value: 'item-1' }]
      });
    } else {
      return this.fb.group({
        input: [''],
        select: [null],
        radio: [null],
        checkbox: [false],
        switch: [false],
        listbox: [null],
        combobox: [null]
      });
    }
  }

  toggleInitialValues(): void {
    this.hasInitialValues = !this.hasInitialValues;
    this.formGroup = this.createFormGroup(this.hasInitialValues);
  }

  ngAfterViewInit(): void {
    this.printValues('all');
  }

  /**
   * Updates the UI to reflect the current form control states.
   * This method is called on various form events (input, change, blur, etc.)
   * to ensure the displayed states are always current.
   */
  printValues(type: 'combobox' | 'checkbox' | 'switch' | 'input' | 'radio' | 'select' | 'listbox' | 'all') {
    // This method is intentionally kept minimal since we're displaying states directly in the UI
    // It's called on various form events to trigger Angular change detection

    // For debugging purposes, we can still log the native element values
    if (type !== 'all') {
      const control = this.formGroup.get(type);
      if (control) {
        console.log(`Form Control (${type}) updated:`, {
          value: control.value,
          pristine: control.pristine,
          dirty: control.dirty,
          touched: control.touched,
          untouched: control.untouched
        });
      }
    }
  }
}
