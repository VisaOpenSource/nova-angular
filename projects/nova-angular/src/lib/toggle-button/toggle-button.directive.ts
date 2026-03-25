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
  inject,
  input,
  InputSignal,
  InputSignalWithTransform,
  model,
  ModelSignal,
  Signal
} from '@angular/core';
import { IdGenerator } from '../id-generator/id-generator.service';
import { ToggleContainerDirective } from '../toggle-container/toggle-container.directive';

@Directive({
  host: {
    type: 'button',

    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[attr.aria-pressed]': '!!active()', // always use true or false
    '[attr.disabled]': 'disabled() ? "disabled" : null',

    '(click)': 'handleClick()'
  },
  selector: 'button[v-toggle]',
  standalone: true
})
export class ToggleButtonDirective {
  private readonly idGenerator: IdGenerator = inject(IdGenerator);
  private readonly toggleContainer: ToggleContainerDirective | null = inject(ToggleContainerDirective, {
    optional: true
  });
  private readonly multi: Signal<boolean> = computed(() => this.toggleContainer?.multiselect() ?? false);

  constructor() {
    afterNextRender({
      write: () => {
        // if initial active state is set, set the active state to the initial value
        // ie `<button v-toggle active>` will set the active state to '', which is truthy
        if (this.active() === '') {
          this.active.set(true);
        }
      }
    });
  }

  /**
   * Sets the `aria-pressed` attribute to indicate the pressed (active) state of the button.
   * Use [active] when you want to handle the active state of the toggle button.
   * Use (activeChange) when you want the library to handle the active state of the toggle button, but get notified of changes.
   * Use [(active)] when you want the active state to reflect changes by both you and the library.
   */
  readonly active: ModelSignal<boolean | string | null> = model<boolean | string | null>(null);

  /**
   * Disables button when true.
   * @default false
   */
  readonly disabledInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'disabled',
    transform: booleanAttribute
  });
  protected readonly disabled: Signal<boolean | null> = computed(
    () => this.disabledInput() ?? this.toggleContainer?.disabled() ?? null
  );

  /**
   * Sets the value of the button to be used in the toggle container.
   * @default this.idGenerator.newId('v-toggle-button')
   * @builtin true
   */
  readonly value: InputSignal<string | number> = input<string | number>(this.idGenerator.newId('v-toggle-button'));

  handleClick(): void {
    if (this.multi()) {
      this.active.update((active) => !active);
    } else {
      this.active.set(true);
    }
  }
}
