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
  contentChild,
  Directive,
  forwardRef,
  input,
  InputSignalWithTransform,
  Signal
} from '@angular/core';
import { ButtonDirective } from '../button/button.directive';
import { CheckboxDirective } from '../checkbox/checkbox.directive';

@Directive({
  host: {
    class: 'v-chip',

    '[class.v-chip-compact]': 'compact()',
    '[class.v-chip-selection]': 'checkbox()'
  },
  selector: '[v-chip]',
  standalone: true
})
export class ChipDirective {
  readonly button: Signal<ButtonDirective | undefined> = contentChild(forwardRef(() => ButtonDirective));
  protected readonly checkbox: Signal<CheckboxDirective | undefined> = contentChild(CheckboxDirective);

  /**
   * Sets chip to compact variant when true.
   * @default false
   */
  readonly compact: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });
}
