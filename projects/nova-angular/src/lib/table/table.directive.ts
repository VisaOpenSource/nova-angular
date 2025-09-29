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
import {
  booleanAttribute,
  computed,
  Directive,
  input,
  InputSignal,
  InputSignalWithTransform,
  Signal
} from '@angular/core';
import { tableBlockMap, tablePaddingMap, TableSize } from './table.constants';

@Directive({
  host: {
    class: 'v-table',

    '[class.v-table-alt]': 'alternate()',
    '[class.v-table-border]': 'dividerLines()',
    '[class.v-table-border-block]': 'horizontalDividerLines()',
    '[class.v-table-key-value]': 'keyValue()',
    '[class.v-table-subtle]': 'subtle()',
    '[style.--v-table-data-block-default]': 'tableBlockDefault()',
    '[style.--v-table-data-padding-block-default]': 'tablePaddingBlock()'
  },
  selector: '[v-table]',
  standalone: true
})
export class TableDirective {
  /**
   * Sets table as subtle variant when true.
   * @default false
   */
  readonly alternate: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Adds vertical and horizontal divider lines when true.
   * @default false
   */
  readonly dividerLines: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Adds horizontal divider lines when true.
   * @default false
   */
  readonly horizontalDividerLines: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets table as key-value variant when true.
   * @default false
   */
  readonly keyValue: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets table as subtle variant when true.
   * @default false
   */
  readonly subtle: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets table size.
   * @default 'medium' / TableSize.MEDIUM
   * @options 'compact' | TableSize.COMPACT | <br> 'medium' | TableSize.MEDIUM | <br> 'large' | TableSize.LARGE
   */
  readonly tableSize: InputSignal<TableSize> = input<TableSize>(TableSize.MEDIUM);

  readonly tableBlockDefault: Signal<string> = computed(() => tableBlockMap[this.tableSize()] ?? null);
  readonly tablePaddingBlock: Signal<string> = computed(() => tablePaddingMap[this.tableSize()] ?? null);
}
