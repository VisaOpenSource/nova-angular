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
import { computed, Directive, input, InputSignalWithTransform, Signal } from '@angular/core';
import { SpacingProperties } from '../nova-lib.constants';
import { coerceSpacing } from '../nova-lib.utils';

@Directive({
  host: {
    '[class]': 'classes()'
  },
  selector:
    '[vM], ' + // all margins
    '[vMB], ' + // margin block end
    '[vML], ' + // margin inline start
    '[vMR], ' + // margin inline end
    '[vMT], ' + // margin block start
    '[vMX], ' + // margin inline
    '[vMY], ', // margin block
  standalone: true
})
export class MarginDirective {
  protected readonly classes: Signal<string> = computed(() =>
    [this.vM(), this.vMB(), this.vML(), this.vMR(), this.vMT(), this.vMX(), this.vMY()].join(' ')
  );

  /**
   * Sets margin-block-start property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  readonly vM: InputSignalWithTransform<string | null, SpacingProperties | string | undefined> = input<
    string | null,
    SpacingProperties | string | undefined
  >(null, {
    transform: (v) => coerceSpacing(v, 'v-m')
  });

  /**
   * Sets margin-inline-end property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  readonly vMB: InputSignalWithTransform<string | null, SpacingProperties | string | undefined> = input<
    string | null,
    SpacingProperties | string | undefined
  >(null, {
    transform: (v) => coerceSpacing(v, 'v-mb')
  });

  /**
   * Sets margin-block-end property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  readonly vML: InputSignalWithTransform<string | null, SpacingProperties | string | undefined> = input<
    string | null,
    SpacingProperties | string | undefined
  >(null, {
    transform: (v) => coerceSpacing(v, 'v-ml')
  });

  /**
   * Sets margin-inline-start property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  readonly vMR: InputSignalWithTransform<string | null, SpacingProperties | string | undefined> = input<
    string | null,
    SpacingProperties | string | undefined
  >(null, {
    transform: (v) => coerceSpacing(v, 'v-mr')
  });

  /**
   * Sets margin-inline property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  readonly vMT: InputSignalWithTransform<string | null, SpacingProperties | string | undefined> = input<
    string | null,
    SpacingProperties | string | undefined
  >(null, {
    transform: (v) => coerceSpacing(v, 'v-mt')
  });

  /**
   * Sets margin-block property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  readonly vMX: InputSignalWithTransform<string | null, SpacingProperties | string | undefined> = input<
    string | null,
    SpacingProperties | string | undefined
  >(null, {
    transform: (v) => coerceSpacing(v, 'v-mx')
  });

  /**
   * Sets margin property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  readonly vMY: InputSignalWithTransform<string | null, SpacingProperties | string | undefined> = input<
    string | null,
    SpacingProperties | string | undefined
  >(null, {
    transform: (v) => coerceSpacing(v, 'v-my')
  });
}
