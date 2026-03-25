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
  afterNextRender,
  booleanAttribute,
  computed,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  input,
  InputSignalWithTransform,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import { ListenerService } from '../listener-service/listener.service';

@Directive({
  host: {
    class: 'v-dropdown-item v-listbox-item',

    '[attr.disabled]': 'disabled() ? "disabled" : null',

    '[class.v-button]': 'buttonItem()',
    '[class.v-button-tertiary]': 'buttonItem()',
    '[class.v-justify-content-start]': 'buttonItem()',

    '(click)': 'clicked.emit($event)'
  },
  providers: [ListenerService],
  selector: '[v-dropdown-item]',
  standalone: true
})
export class DropdownItemDirective {
  constructor() {
    afterNextRender({
      read: () => {
        this.tagName.set(this.el.nativeElement.tagName.toLowerCase());
      }
    });
  }
  public readonly el: ElementRef = inject(ElementRef);
  public readonly listenerService: ListenerService = inject(ListenerService);
  private readonly tagName: WritableSignal<string> = signal<string>('');
  protected readonly buttonItem: Signal<boolean> = computed(() => this.tagName() === 'button');

  /**
   * Marks item as selected when true.
   * @default false
   */
  readonly disabled: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    transform: booleanAttribute
  }); // used for floating-ui-container closeOnClick

  /**
   * Emits event when host interactive element is clicked.
   */
  readonly clicked: EventEmitter<Event> = new EventEmitter<Event>();
}
