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
  Directive,
  ElementRef,
  InputSignal,
  InputSignalWithTransform,
  Signal,
  WritableSignal,
  computed,
  contentChild,
  inject,
  input,
  numberAttribute,
  signal
} from '@angular/core';
import { TooltipArrowDirective } from '../arrow/arrow.directive';

@Directive({
  host: {
    class: 'v-surface v-tooltip',
    role: 'tooltip',

    '[attr.id]': 'id()',
    '[style.display]': 'display()',
    '[style.z-index]': 'zIndex() || null'
  },
  selector: '[v-tooltip]',
  standalone: true
})
export class TooltipDirective {
  public readonly el: ElementRef = inject(ElementRef); // ElementRef needed for floating-ui-container

  public readonly arrow: Signal<TooltipArrowDirective | undefined> = contentChild(TooltipArrowDirective); // Used inside floating-ui-container

  /**
   * Sets custom display when tooltip is visible. Initial display is set to none to hide tooltip.
   * @builtin true
   */
  readonly display: InputSignal<string> = input<HTMLElement['style']['display']>('none');

  /**
   * Sets custom ID.
   */
  readonly idInput: InputSignal<HTMLElement['id'] | null> = input<HTMLElement['id'] | null>(null, { alias: 'id' });
  readonly idInternal: WritableSignal<HTMLElement['id'] | null> = signal<HTMLElement['id'] | null>(null); // used in floating-ui-container
  readonly id: Signal<HTMLElement['id'] | null> = computed(() => this.idInput() ?? this.idInternal());

  /**
   * Sets custom z-index.
   * @default '700'
   * @builtin true
   */
  readonly zIndex: InputSignalWithTransform<string | number, unknown> = input<number | string, unknown>('700', {
    alias: 'z-index',
    transform: numberAttribute
  });
}
