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
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  InputSignal,
  InputSignalWithTransform,
  numberAttribute,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import { FloatingUIContainer } from '../floating-ui-container/floating-ui-container.directive';

@Directive({
  host: {
    class: 'v-dropdown-menu v-surface',
    style: 'inline-size: 180px; --v-dropdown-menu-surface-margin-block-start: 0;',

    '[attr.aria-hidden]': '!isShown()',
    '[attr.id]': 'id()',
    '[style.z-index]': 'zIndex() || null'
  },
  selector: '[v-menu], [v-dropdown-menu]',
  standalone: true
})
export class DropdownMenuDirective {
  public readonly el: ElementRef = inject(ElementRef); // ElementRef needed for floating-ui-container
  private readonly floatingUIContainer: FloatingUIContainer | null = inject(FloatingUIContainer, {
    optional: true,
    host: true
  });
  /**
   * Sets custom ID.
   */
  readonly idInput: InputSignal<string | null> = input<null | string>(null, { alias: 'id' });
  readonly idInternal: WritableSignal<string | null> = signal<null | string>(null); // used in floating-ui-container
  readonly id: Signal<string | null> = computed(() => this.idInput() ?? this.idInternal());

  // the following is determined by floating-ui-container and used to set aria attributes
  protected readonly isShown: Signal<boolean | null> = computed(() => this.floatingUIContainer?.isShown() ?? null);

  /**
   * Provides custom z-index to control stacking order.
   * @default 200;
   */
  readonly zIndex: InputSignalWithTransform<string | number, unknown> = input<number | string, unknown>('200', {
    alias: 'z-index',
    transform: numberAttribute
  });
}
