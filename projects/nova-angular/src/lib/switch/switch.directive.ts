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
  ElementRef,
  InputSignalWithTransform,
  ModelSignal,
  Renderer2,
  Signal,
  WritableSignal,
  afterNextRender,
  booleanAttribute,
  computed,
  forwardRef,
  inject,
  input,
  model,
  signal
} from '@angular/core';
import { CheckboxControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const SWITCH_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SwitchDirective),
  multi: true
};

@Directive({
  host: {
    class: 'v-switch',
    role: 'switch',
    type: 'checkbox',

    '[attr.aria-checked]': 'checked()',
    '[attr.aria-invalid]': 'invalid()',
    '[attr.checked]': "checked() ? 'checked' : null",
    '[attr.disabled]': "disabled() ? 'disabled' : null",
    '[attr.required]': "required() ? 'required' : null",

    '(change)': 'handleChange($event)'
  },
  providers: [SWITCH_VALUE_ACCESSOR],
  selector: '[v-switch]',
  standalone: true
})
export class SwitchDirective extends CheckboxControlValueAccessor {
  constructor() {
    const el: ElementRef<HTMLInputElement> = inject<ElementRef<HTMLInputElement>>(ElementRef);
    const renderer: Renderer2 = inject<Renderer2>(Renderer2);
    super(renderer, el);
    afterNextRender({
      write: () => {
        // if initial checked state is set, set the checked state to the initial value
        // ie `<input v-switch checked>` will set the checked state to '', which is truthy
        if (this.checked() === '') {
          this.checked.set(true);
        }
      }
    });
  }

  public readonly el: ElementRef<HTMLInputElement> = inject<ElementRef<HTMLInputElement>>(ElementRef);

  /**
   * Sets checked state of component. <br />
   * Because 'checked' is a native attribute of input[type="checkbox"], it can only be set false by using [checked]="false", not checked="false" <br />
   * Use [checked] when you want to handle the checked state of the checkbox.
   * Use (checkedChange) when you want the library to handle the checked state of the checkbox, but get notified of changes.
   * Use [(checked)] when you want the checked state to reflect changes by both you and the library.
   */
  readonly checked: ModelSignal<boolean | null | string> = model<boolean | null | string>(null);

  /**
   * Sets switch as disabled when true.
   * @default false
   */
  readonly disabledInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'disabled',
    transform: booleanAttribute
  });
  readonly disabledInternal: WritableSignal<boolean | null> = signal<boolean | null>(null);
  protected readonly disabled: Signal<boolean | null> = computed(() => this.disabledInput() ?? this.disabledInternal());
  /** Fires when a formControl's disabled state updates  */
  override setDisabledState(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);
    this.disabledInternal.set(isDisabled);
  }

  /**
   * Marks switch as invalid when true.
   * @default false
   */
  readonly invalid: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    transform: booleanAttribute
  });

  /**
   * Marks switch as required when true.
   * @default false
   */
  readonly required: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  handleChange(event: Event): void {
    const { checked } = event.target as HTMLInputElement;
    this.onChange(checked);
    this.checked.set(checked);
  }

  override writeValue(value: string): void {
    super.writeValue(value);
    this.checked.set(value ? value.toString() : null);
  }
}
