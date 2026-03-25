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

/**
 * I don't love having 'surface' in the key names,
 * but using just numbers does not work as expected.
 */
export const SurfaceType = {
  Surface1: '1',
  Surface2: '2',
  Surface3: '3'
} as const;

export type SurfaceType = (typeof SurfaceType)[keyof typeof SurfaceType];

/**
 * Directive to add default surface class, <code>class="v-surface"</code>, to the host element.
 */
@Directive({
  host: {
    class: 'v-surface',

    '[class.v-surface-2]': `vSurface() === '2'`,
    '[class.v-surface-3]': `vSurface() === '3'`
  },
  selector: '[vSurface]',
  standalone: true
})
export class SurfaceDirective {
  /**
   * Applies given surface class. <br>
   */
  readonly vSurface: InputSignal<'' | SurfaceType | null> = input<SurfaceType | '' | null>(SurfaceType.Surface1);
}
