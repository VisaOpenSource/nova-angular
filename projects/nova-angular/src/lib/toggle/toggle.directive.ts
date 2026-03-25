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
  Directive,
  InputSignalWithTransform,
  Signal,
  booleanAttribute,
  computed,
  contentChild,
  forwardRef,
  input
} from '@angular/core';
import { CheckboxDirective } from '../checkbox/checkbox.directive';
import { RadioDirective } from '../radio/radio.directive';

@Directive({
  host: {
    class: 'v-toggle',

    '[attr.for]': 'htmlFor()',
    '[class.v-toggle-icon]': 'toggleIcon()'
  },
  selector: '[v-toggle]',
  standalone: true
})
export class ToggleDirective {
  private readonly checkbox: Signal<CheckboxDirective | undefined> = contentChild(forwardRef(() => CheckboxDirective));
  private readonly radio: Signal<RadioDirective | undefined> = contentChild(forwardRef(() => RadioDirective));

  /**
   * Sets the `for` attribute to the id of the radio or checkbox.
   * @default &lt;radio-id&gt; or &lt;checkbox-id&gt;
   * @builtin true
   */
  protected readonly htmlFor: Signal<string | null> = computed(
    () => this.radio()?.id() ?? this.checkbox()?.id() ?? null
  );

  /**
   * Adds <code>v-toggle-icon</code> class for when toggle has icons only.
   * @default false
   */
  readonly toggleIcon: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });
}
