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
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  contentChildren,
  forwardRef,
  input,
  InputSignalWithTransform,
  Signal,
  ViewEncapsulation
} from '@angular/core';
import { ButtonDirective } from '../button/button.directive';
import { CheckboxDirective } from '../checkbox/checkbox.directive';
import { InputDirective } from '../input/input.directive';
import { RadioDirective } from '../radio/radio.directive';
import { SelectDirective } from '../select/select.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'v-input-container',

    '[class.v-surface]': 'input() || select()'
  },
  selector: '[v-input-container]',
  standalone: true,
  templateUrl: './input-container.component.html'
})
export class InputContainerComponent {
  public readonly buttons: Signal<readonly ButtonDirective[]> = contentChildren(forwardRef(() => ButtonDirective));
  private readonly checkbox: Signal<CheckboxDirective | undefined> = contentChild(CheckboxDirective);
  protected readonly input: Signal<InputDirective | undefined> = contentChild(InputDirective);
  private readonly radio: Signal<RadioDirective | undefined> = contentChild(RadioDirective);
  protected readonly select: Signal<SelectDirective | undefined> = contentChild(SelectDirective);

  /**
   * Removes the default toggle icon when true, allowing you to provide your own. <br>
   * After the closing <code>select</code> tag, provide your custom icon inside a <code>&lt;div class=&#8220;v-input-control&#8221;&gt;</code>.
   * @default false
   */
  readonly useCustomIcon: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  public readonly childButtonsDisabled: Signal<boolean | null> = computed(
    () => (this.input()?.disabled() || this.input()?.readonly()) ?? null
  );

  public readonly labelId: Signal<string | null> = computed(
    () => this.checkbox()?.id() ?? this.radio()?.id() ?? this.input()?.id() ?? null
  );
}
