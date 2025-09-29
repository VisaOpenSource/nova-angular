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
import { computed, Directive, input, InputSignalWithTransform, Signal } from '@angular/core';
import { type SpacingProperties } from '../nova-lib.constants';
import { coerceSpacing } from '../nova-lib.utils';

@Directive({
  host: {
    '[class]': 'classes()'
  },
  selector:
    '[vP], ' + // all paddings
    '[vPB], ' + // padding block end
    '[vPL], ' + // padding inline start
    '[vPR], ' + // padding inline end
    '[vPT], ' + // padding block start
    '[vPX], ' + // padding inline
    '[vPY], ', // padding block
  standalone: true
})
export class PaddingDirective {
  protected readonly classes: Signal<string> = computed(() =>
    [this.vP(), this.vPB(), this.vPL(), this.vPR(), this.vPT(), this.vPX(), this.vPY()].join(' ')
  );

  /**
   * Sets padding-block-start property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  readonly vP: InputSignalWithTransform<string | null, SpacingProperties | string | undefined> = input<
    string | null,
    SpacingProperties | string | undefined
  >(null, {
    transform: (v) => coerceSpacing(v, 'v-p')
  });

  /**
   * Sets padding-inline-end property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  readonly vPB: InputSignalWithTransform<string | null, SpacingProperties | string | undefined> = input<
    string | null,
    SpacingProperties | string | undefined
  >(null, {
    transform: (v) => coerceSpacing(v, 'v-pb')
  });

  /**
   * Sets padding-block-end property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  readonly vPL: InputSignalWithTransform<string | null, SpacingProperties | string | undefined> = input<
    string | null,
    SpacingProperties | string | undefined
  >(null, {
    transform: (v) => coerceSpacing(v, 'v-pl')
  });

  /**
   * Sets padding-inline-start property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  readonly vPR: InputSignalWithTransform<string | null, SpacingProperties | string | undefined> = input<
    string | null,
    SpacingProperties | string | undefined
  >(null, {
    transform: (v) => coerceSpacing(v, 'v-pr')
  });

  /**
   * Sets padding-inline property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  readonly vPT: InputSignalWithTransform<string | null, SpacingProperties | string | undefined> = input<
    string | null,
    SpacingProperties | string | undefined
  >(null, {
    transform: (v) => coerceSpacing(v, 'v-pt')
  });

  /**
   * Sets padding-block property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  readonly vPX: InputSignalWithTransform<string | null, SpacingProperties | string | undefined> = input<
    string | null,
    SpacingProperties | string | undefined
  >(null, {
    transform: (v) => coerceSpacing(v, 'v-px')
  });

  /**
   * Sets padding property. <br>
   * Accepts: 0 - 48 or <code>SpacingProperties</code>.
   */
  readonly vPY: InputSignalWithTransform<string | null, SpacingProperties | string | undefined> = input<
    string | null,
    SpacingProperties | string | undefined
  >(null, {
    transform: (v) => coerceSpacing(v, 'v-py')
  });
}
