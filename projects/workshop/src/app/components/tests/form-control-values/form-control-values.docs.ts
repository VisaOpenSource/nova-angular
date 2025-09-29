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
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, viewChild, viewChildren } from '@angular/core';
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

/** @ignore */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-form-control-values',
  templateUrl: './form-control-values.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaChevronDownTiny, VisaChevronUpTiny]
})
export class FormControlValuesComponent implements AfterViewInit {
  readonly checkbox = viewChild(CheckboxDirective);
  readonly combobox = viewChild(ComboboxDirective);
  readonly listbox = viewChildren(ListboxDirective);
  readonly input = viewChildren(InputDirective);
  readonly radios = viewChildren(RadioDirective);
  readonly select = viewChild<SelectDirective, ElementRef<HTMLSelectElement>>(SelectDirective, {
    read: ElementRef
  });
  readonly switch = viewChild(SwitchDirective);

  ngAfterViewInit(): void {
    this.printValues('all');
  }

  printValues(type: 'combobox' | 'checkbox' | 'switch' | 'input' | 'radio' | 'select' | 'listbox' | 'all') {
    if (type === 'all' || type === 'combobox') console.log('Combobox:', this.combobox()?.value());
    if (type === 'all' || type === 'listbox') console.log('Listbox:', this.listbox()[0].value());
    if (type === 'all' || type === 'checkbox') console.log('checkbox:', this.checkbox()?.checked());
    if (type === 'all' || type === 'switch') console.log('switch:', this.switch()?.checked());
    if (type === 'all' || type === 'input') console.log('Input:', this.input()?.[0].value());
    if (type === 'all' || type === 'radio')
      this.radios().forEach((radio, index) => {
        console.log(`Radio ${index + 1}:`, radio.checked);
      });
    if (type === 'all' || type === 'select') console.log('Select:', this.select()?.nativeElement.value);
  }
}
