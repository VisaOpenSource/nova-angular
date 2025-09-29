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
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  ElementRef,
  forwardRef,
  input,
  InputSignal,
  InputSignalWithTransform,
  numberAttribute,
  Signal,
  signal,
  viewChild,
  ViewEncapsulation,
  WritableSignal
} from '@angular/core';
import { LabelDirective } from '../label/label.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'v-progress v-progress-circular',

    '[attr.aria-labelledby]': 'ariaLabelledby()',
    '[attr.role]': 'role() ? role() : determinate() ? "progressbar" : null',
    '[class.v-progress-circular-small]': 'small()',
    '[class.v-progress-complete]': 'complete()',
    '[class.v-progress-error]': 'invalid()',
    '[class.v-progress-indeterminate]': '!determinate()'
  },
  selector: '[v-progress-circular], [v-circular-progress]',
  standalone: true,
  templateUrl: './circular-progress.component.html'
})
export class CircularProgressComponent {
  constructor() {
    afterNextRender({
      read: () => {
        let radius: number = parseInt(window.getComputedStyle(this.progressBar().nativeElement).getPropertyValue('r'));
        // use default radius if r is not set or invalid
        radius = !isNaN(radius) ? radius : ((this.small() ? 48 : 72) - 4) / 2;
        this.radius.set(radius);
      }
    });
  }

  private readonly label: Signal<LabelDirective | undefined> = contentChild(forwardRef(() => LabelDirective));
  private readonly progressBar: Signal<ElementRef<HTMLElement>> =
    viewChild.required<ElementRef<HTMLElement>>('progressBar');

  private readonly radius: WritableSignal<number | null> = signal(null);

  protected readonly dashOffset: Signal<number> = computed(() =>
    this.initialSize() <= 0 ? 0 : this.initialSize() - this.initialSize() * (this.percentage() * 0.01)
  );
  protected readonly initialSize: Signal<number> = computed(() => {
    const radius = this.radius();
    return radius !== null ? 2 * Math.PI * radius : 0; // circumference
  });

  public readonly complete: Signal<boolean> = computed(() => this.determinate() && this.percentage() === 100);

  /**
   * Sets progress to determinate when true.
   * @default false
   */
  readonly determinate: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets progress to invalid when true.
   * @default false
   */
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets custom role.
   * @default 'progressbar' when determinate
   * @default null when indeterminate
   * @builtin true
   */
  readonly role: InputSignal<HTMLElement['role']> = input<HTMLElement['role']>(null);

  /**
   * Sets the percentage for a <code>determinate</code> circular progress.
   * @default 0
   */
  readonly percentage: InputSignalWithTransform<number, unknown> = input<number, unknown>(0, {
    transform: numberAttribute
  });

  /**
   * Sets progress to small variant when true.
   * @default false
   */
  readonly small: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Aria attribute pointing to id of labelling element.
   * @default &lt;child-label-id&gt;
   * @builtin true
   */
  readonly ariaLabelledbyInput: InputSignal<string | null> = input<string | null>(null, { alias: 'aria-labelledby' });
  protected readonly ariaLabelledby: Signal<string | null | undefined> = computed<null | string | undefined>(
    () => this.ariaLabelledbyInput() ?? this.label()?.id()
  );
}
