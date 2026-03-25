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
  ElementRef,
  inject,
  input,
  InputSignal,
  InputSignalWithTransform,
  signal,
  Signal,
  WritableSignal
} from '@angular/core';
import { IdGenerator } from '../id-generator/id-generator.service';
import { CircularProgressComponent } from '../circular-progress/circular-progress.component';
import { InputContainerComponent } from '../input-container/input-container.component';

@Directive({
  host: {
    '[attr.for]': 'htmlFor()',
    '[attr.id]': 'id()',
    '[class.v-label]': '!progressLabel()',
    '[class.v-progress-label]': 'progressLabel()',
    '[class.v-switch-label]': 'switchLabel()',

    '(click)': 'handleClick($event)'
  },
  selector: '[v-label], [v-switch-label]',
  standalone: true
})
export class LabelDirective {
  private readonly circularProgress = inject(CircularProgressComponent, { optional: true });
  public readonly el: ElementRef = inject(ElementRef); // needed for combobox readonly span accessibility
  private readonly idGenerator: IdGenerator = inject(IdGenerator);
  private readonly inputContainer: InputContainerComponent | null = inject(InputContainerComponent, { optional: true });

  /**
   * Attribute set to the id of the element it's labeling. <br />
   * This property is set by default for radio and checkbox components when used within <code>v-input-container</code> as directed.
   */
  readonly htmlForInput: InputSignal<string | null> = input<string | null>(null, { alias: 'for' }); // Aliased to "for" because `for` is an JS/Angular keyword
  readonly htmlForInternal: WritableSignal<string | null> = signal<string | null>(null);
  protected readonly htmlFor: Signal<string | null> = computed<string | null>(
    () => this.htmlForInput() ?? this.inputContainer?.labelId() ?? this.htmlForInternal() ?? null
  );

  /**
   * Sets custom id.
   * @default idGenerator.newId('v-label')
   * @builtin true
   */
  readonly id: InputSignal<string> = input<string>(this.idGenerator.newId('v-label'));

  /**
   * Swaps <code>v-label</code> class for <code>v-progress-label</code> when true. <br />
   * Intended for use when label is describing a progress component. <br />
   * Automatically set to true when used within a Circular Progress component.
   * @default false
   */
  readonly progressLabelInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(
    null,
    {
      alias: 'progressLabel',
      transform: booleanAttribute
    }
  );
  protected readonly progressLabel: Signal<boolean> = computed(
    () => !!this.progressLabelInput() || !!this.circularProgress
  );

  readonly switchLabel: InputSignalWithTransform<boolean | null, unknown> = input(null, {
    alias: 'v-switch-label',
    transform: booleanAttribute
  });

  handleClick(event: Event): void {
    // stops click event for firing for label **and** input.
    // event will still fire for input
    event.stopPropagation();
  }
}
