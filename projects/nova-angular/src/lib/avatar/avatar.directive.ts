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
  inject,
  input,
  InputSignal,
  InputSignalWithTransform,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';

@Directive({
  host: {
    class: 'v-avatar',

    '[attr.role]': 'role() ?? defaultRole()',
    '[class.v-avatar-small]': 'small()'
  },
  standalone: true,
  selector: '[v-avatar]'
})
export class AvatarDirective {
  constructor() {
    afterNextRender({
      read: () => {
        this.tagName.set(this.el.nativeElement.tagName.toLowerCase());
      }
    });
  }
  private readonly el: ElementRef = inject(ElementRef);
  private readonly tagName: WritableSignal<string> = signal<string>('');
  protected readonly defaultRole: Signal<string | null> = computed(() => (this.tagName() !== 'img' ? 'img' : null));

  /**
   * Sets avatar to small variant when true.
   * @default false
   */
  readonly small: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  readonly role: InputSignal<HTMLElement['role'] | null> = input<HTMLElement['role'] | null>(null);
}
