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
import { ChangeDetectionStrategy, Component, computed, inject, Renderer2, signal } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

/** #docs */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-input-character-counter',
  templateUrl: './character-counter.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaErrorTiny]
})
export class CharacterCounterInputComponent {
  readonly renderer = inject(Renderer2);
  readonly value = signal('');
  readonly empty = computed(() => !this.value());
  readonly overLimit = computed(() =>
    this.value() && this.value().length > this.maxLength ? this.value().length - this.maxLength : false
  );
  readonly isInvalid = computed(() => (this.submitted() && this.empty()) || !!this.overLimit());
  readonly maxLength: number = 400;
  readonly submitted = signal(false);

  handleSubmit() {
    this.submitted.set(true);
    if (this.isInvalid()) {
      this.renderer.selectRootElement('#character-counter-error').focus();
    }
  }

  handleReset() {
    this.submitted.set(false);
    this.value.set('');
  }
}
