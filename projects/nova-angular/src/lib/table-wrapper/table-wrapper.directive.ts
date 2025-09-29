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
import { Directive, input, InputSignalWithTransform } from '@angular/core';
import { pxAttribute } from '../nova-lib.utils';

@Directive({
  host: {
    class: 'v-table-wrapper',

    '[style.--v-table-wrapper-block-size]': 'scrollBlockSize()',
    '[style.--v-table-wrapper-inline-size]': 'scrollInlineSize()'
  },
  selector: '[v-table-wrapper]',
  standalone: true
})
export class TableWrapperDirective {
  /**
   * Sets CSS variable <code>--v-table-wrapper-block-size</code> to customize the block size of the scroll area.
   */
  readonly scrollBlockSize: InputSignalWithTransform<string, unknown> = input<string, unknown>('unset', {
    transform: (v) => pxAttribute<string>(v, 'unset')
  });

  /**
   * Sets CSS variable <code>--v-table-wrapper-inline-size</code> to customize the inline size of the scroll area.
   */
  readonly scrollInlineSize: InputSignalWithTransform<string, unknown> = input<string, unknown>('unset', {
    transform: (v) => pxAttribute<string>(v, 'unset')
  });
}
