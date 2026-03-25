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
import {
  booleanAttribute,
  Directive,
  input,
  InputSignalWithTransform,
} from '@angular/core';

@Directive({
  host: {
    class: 'v-wizard',

    '[class.v-wizard-compact]': 'compact()',
    '[class.v-wizard-vertical]': 'vertical()',
  },
  standalone: true,
  selector: '[v-wizard]',
})
export class WizardDirective {
  /**
   * Sets wizard to compact variant when true.
   * @default false
   */
  readonly compact: InputSignalWithTransform<boolean, unknown> = input<
    boolean,
    unknown
  >(false, {
    transform: booleanAttribute,
  });

  /**
   * Sets wizard to vertical orientation when true.
   * @default false
   */
  readonly vertical: InputSignalWithTransform<boolean, unknown> = input<
    boolean,
    unknown
  >(false, {
    transform: booleanAttribute,
  });
}
