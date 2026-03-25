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
import { Directive, ElementRef, inject, input, InputSignalWithTransform, numberAttribute } from '@angular/core';

@Directive({
  host: {
    class: 'v-tooltip-arrow',
    style: 'background-color: var(--v-surface-background); position: absolute; transform: rotate(45deg); z-index: -1;',

    '[style.block-size]': 'customSize() + "px"',
    '[style.inline-size]': 'customSize() + "px"'
  },
  selector: '[v-tooltip-arrow]',
  standalone: true
})
export class TooltipArrowDirective {
  public readonly el: ElementRef = inject(ElementRef); // ElementRef needed for floating-ui-container

  /**
   * Sets custom size *in pixels* for the arrow.
   * @default 8
   */
  readonly customSize: InputSignalWithTransform<number, unknown> = input<number, unknown>(8, {
    transform: numberAttribute
  });
}
