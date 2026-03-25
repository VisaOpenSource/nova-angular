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
import { booleanAttribute, Directive, input, InputSignalWithTransform } from '@angular/core';

@Directive({
  host: {
    class: 'v-nav',

    '[class.v-nav-drawer]': 'drawer()',
    '[class.v-nav-horizontal]': '!vertical()',
    '[class.v-nav-vertical]': 'vertical()'
  },
  selector: '[v-nav]',
  standalone: true
})
export class NavDirective {
  /**
   * Sets navigation to drawer variation when true.
   * @default false
   */
  readonly drawer: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets navigation to vertical orientation when true.
   * @default false
   */
  readonly vertical: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });
}
