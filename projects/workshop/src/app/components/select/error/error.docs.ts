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
import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import { NovaLibModule, SelectDirective } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaErrorTiny } from '@visa/nova-icons-angular';

/** #docs **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-select-error',
  templateUrl: './error.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaErrorTiny, VisaChevronDownTiny]
})
export class ErrorSelectComponent {
  readonly invalid = signal(false);
  readonly select = viewChild<SelectDirective, ElementRef<HTMLSelectElement>>(SelectDirective, {
    read: ElementRef
  });
  readonly value = signal('');

  onChange(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    this.value.set(value);
  }

  onSubmit() {
    this.invalid.set(!this.value());
    if (this.invalid()) {
      this.select()?.nativeElement.focus();
    }
  }

  onReset() {
    this.invalid.set(false);
    this.value.set(''); // Clear the value in the select
  }
}
