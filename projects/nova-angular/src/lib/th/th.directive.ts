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
import { booleanAttribute, computed, Directive, inject, input, InputSignalWithTransform, Signal } from '@angular/core';
import { TableDirective } from '../table/table.directive';
import { TdDirective } from '../td/td.directive';

@Directive({
  host: {
    // allow v-td class to apply if v-td directive is present
    '[class.v-td]': 'isKeyValue() || tdDirective ? true : false',
    '[class.v-th]': '!isKeyValue()',
    '[class.v-th-alt]': 'groupHeader()',
    '[class.v-typography-overline]': 'groupHeader()'
  },
  selector: '[v-th]',
  standalone: true
})
export class ThDirective {
  private readonly tableDirective: TableDirective | null = inject(TableDirective, { optional: true });
  readonly tdDirective: TdDirective | null = inject(TdDirective, { optional: true, self: true });

  /**
   * Alternate header for when there are two levels of headers (group headers).
   */
  readonly groupHeader: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  protected readonly isKeyValue: Signal<boolean | undefined> = computed(() => this.tableDirective?.keyValue());
}
