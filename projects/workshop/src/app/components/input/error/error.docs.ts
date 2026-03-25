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
import { ChangeDetectionStrategy, Component, computed, ElementRef, signal, viewChild } from '@angular/core';
import { InputDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

/** #docs */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-input-error',
  templateUrl: './error.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaErrorTiny]
})
export class ErrorInputComponent {
  readonly input = viewChild(InputDirective, { read: ElementRef });
  readonly value = signal('');
  readonly submitted = signal(false);
  readonly isInvalid = computed(() => this.submitted() && !this.value());

  handleSubmit() {
    this.submitted.set(true);
    if (this.isInvalid()) {
      this.input()?.nativeElement.focus();
    }
  }

  handleReset() {
    this.value.set('');
    this.submitted.set(false);
  }
}
