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
import { Directive, input, InputSignal } from '@angular/core';
import { DividerType } from './divider.constants';

@Directive({
  standalone: true,
  selector: '[v-divider]',
  host: {
    class: 'v-divider',

    '[attr.aria-hidden]': "ariaHidden() ?? dividerType() === 'decorative' || null",
    '[class.v-divider-decorative]': 'dividerType() === "decorative"',
    '[class.v-divider-section]': 'dividerType() === "section"'
  }
})
export class DividerDirective {
  readonly ariaHidden: InputSignal<string | null> = input<HTMLElement['ariaHidden'] | null>(null, {
    alias: 'aria-hidden'
  });

  /**
   * Sets divider style.
   * @default 'default' / DividerType.DEFAULT
   * @options 'default' | DividerType.DEFAULT | <br> 'section' | DividerType.SECTION | <br> 'decorative' | DividerType.DECORATIVE
   */
  readonly dividerType: InputSignal<DividerType> = input<DividerType>('default');
}
