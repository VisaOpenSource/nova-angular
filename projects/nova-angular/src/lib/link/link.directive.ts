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
import { booleanAttribute, Directive, ElementRef, inject, input, InputSignalWithTransform } from '@angular/core';
import { ListenerService } from '../listener-service/listener.service';

@Directive({
  host: {
    class: 'v-link',

    '[attr.aria-disabled]': 'disabled()',
    '[attr.role]': "disabled() ? 'link' : null",
    '[class.v-link-no-underline]': 'noUnderline()'
  },
  providers: [ListenerService],
  selector: '[v-link]',
  standalone: true
})
export class LinkDirective {
  public readonly el: ElementRef = inject(ElementRef); // used in nova-lib-service handleAriaCurrent
  public readonly listenerService: ListenerService = inject(ListenerService);

  /**
   * Disables link when true. <br />
   * Adds <code>role="link"</code> and <code>aria-disabled="true"</code> when true for a11y.
   * @default false
   */
  readonly disabled: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    transform: booleanAttribute
  });

  /**
   * Removes underline on link when true.
   * @default false
   */
  readonly noUnderline: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });
}
