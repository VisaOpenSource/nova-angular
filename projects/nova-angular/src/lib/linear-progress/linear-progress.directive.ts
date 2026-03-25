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
  computed,
  Directive,
  input,
  InputSignal,
  InputSignalWithTransform,
  numberAttribute,
  Signal
} from '@angular/core';

@Directive({
  host: {
    class: 'v-progress v-progress-bar',

    '[attr.aria-hidden]': 'ariaHidden() ? ariaHidden() : determinate() ? null : "true"',
    '[attr.max]': 'max()',
    '[attr.value]': 'value()',
    '[class.v-progress-complete]': 'complete()',
    '[class.v-progress-error]': 'invalid()',
    '[class.v-progress-indeterminate]': '!determinate()'
  },
  selector: '[v-progress-linear], [v-linear-progress]',
  standalone: true
})
export class LinearProgressDirective {
  /**
   * Hide progress from screen readers when true. By default, indeterminate progress is hidden and determinate progress is visible.
   * @default 'true' when <code>determinate</code> is false
   * @default null when <code>determinate</code> is true
   * @builtin true
   */
  readonly ariaHidden: InputSignal<string | void | null> = input<string | void | null>(null, { alias: 'aria-hidden' });

  /**
   * Marks progress as complete when true. By default, determinate progress is marked complete
   * when value is greater than or equal to max, and indeterminate progress is never marked complete.
   * @default null
   */
  public readonly completeInput: InputSignalWithTransform<boolean | null, unknown> = input(null, {
    alias: 'complete',
    transform: booleanAttribute
  });
  protected readonly complete: Signal<boolean> = computed(
    () => this.completeInput() ?? (this.determinate() ? null : false) ?? this.value()! >= this.max()!
  );

  /**
   * Sets progress to determinate when true.
   * @default false
   */
  readonly determinate: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Marks progress as invalid when true.
   * @default false
   */
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * The max value for a <code>determinate</code> progress bar.
   * @default 100
   */
  readonly maxInput: InputSignalWithTransform<number, unknown> = input<number, unknown>(100, {
    alias: 'max',
    transform: (val) => numberAttribute(val, 100)
  });
  readonly max: Signal<number | null> = computed(() =>
    this.determinate() ? (this.percentage() !== null ? 100 : this.maxInput()) : null
  );

  /**
   * The current progress as a percentage (0-100). Use this for simple percentage-based progress.
   * @default null
   */
  readonly percentage: InputSignalWithTransform<number | null, unknown> = input(null, {
    transform: numberAttribute
  });

  /**
   * The current progress value. Works with the max attribute to calculate percentage.
   * Use when tracking progress with custom units (e.g., items processed out of a total).
   * @default 100
   */
  readonly valueInput: InputSignalWithTransform<number, unknown> = input<number, unknown>(100, {
    alias: 'value',
    transform: numberAttribute
  });
  readonly value: Signal<number | null> = computed(() =>
    this.determinate() ? (this.percentage() ?? this.valueInput()) : null
  );
}
