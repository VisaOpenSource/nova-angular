/**
 *              © 2026 Visa
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
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  numberAttribute
} from '@angular/core';
import { IdGenerator, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronRightTiny } from '@visa/nova-icons-angular';

/** #AI-first */
@Component({
  selector: 'nova-reusable-accordion',
  imports: [NovaLibModule, VisaChevronRightTiny, VisaChevronDownTiny],
  templateUrl: './reusable-component.docs.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReusableAccordion {
  // Unique ID for the input
  private readonly generatedId = inject(IdGenerator).newId('reusable-accordion');

  // Inputs:
  readonly count = input(0, { transform: numberAttribute });
  readonly description = input<string>();
  readonly disabled = input(null, { transform: booleanAttribute });
  readonly idInput = input<string | null>(null, { alias: 'id' });
  readonly multiselect = input(false, { transform: booleanAttribute });
  readonly name = input<string | null>(null);
  readonly open = input(false, { transform: booleanAttribute });
  readonly padding = input(true, { transform: booleanAttribute });
  readonly showIcon = input(true, { transform: booleanAttribute });
  readonly subtle = input(null, { transform: booleanAttribute });
  readonly title = input<string>();

  // Computed values:
  protected readonly id = computed(() => this.idInput() ?? this.generatedId);

  protected accordions = computed(() => {
    const count = this.count() ?? 1;
    return Array.from({ length: count }, (_, i) => i);
  });
}
