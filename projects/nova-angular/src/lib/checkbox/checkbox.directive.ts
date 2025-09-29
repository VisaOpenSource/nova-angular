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
  Directive,
  ElementRef,
  InputSignal,
  InputSignalWithTransform,
  ModelSignal,
  Renderer2,
  Signal,
  WritableSignal,
  afterNextRender,
  booleanAttribute,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  model,
  signal
} from '@angular/core';
import { CheckboxControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IdGenerator } from '../id-generator/id-generator.service';
import { ToggleDirective } from '../toggle/toggle.directive';
import { ListenerService } from '../listener-service/listener.service';
import { defaultEffectParam } from '../nova-lib.constants';

const CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxDirective),
  multi: true
};

@Directive({
  host: {
    class: 'v-checkbox',
    type: 'checkbox',

    '[attr.aria-invalid]': 'invalid()',
    '[attr.checked]': 'checked() ? "checked" : null',
    '[attr.disabled]': 'disabled() ? "disabled" : null',
    '[attr.id]': 'id()',
    '[attr.required]': 'required() ? "required" : null',

    '(change)': 'handleChange($event)'
  },
  providers: [CHECKBOX_VALUE_ACCESSOR, ListenerService],
  selector: '[v-checkbox]',
  standalone: true
})
export class CheckboxDirective extends CheckboxControlValueAccessor {
  constructor() {
    const el: ElementRef<HTMLInputElement> = inject<ElementRef<HTMLInputElement>>(ElementRef);
    const renderer: Renderer2 = inject<Renderer2>(Renderer2);
    super(renderer, el);
    afterNextRender({
      write: () => {
        // if initial checked state is set, set the checked state to the initial value
        // ie `<input v-checkbox checked>` will set the checked state to '', which is truthy
        if (this.checked() === '') {
          this.checked.set(true);
        }
      }
    });
  }

  public readonly el: ElementRef<HTMLInputElement> = inject<ElementRef<HTMLInputElement>>(ElementRef);
  private readonly idGenerator: IdGenerator = inject(IdGenerator);
  public readonly listenerService: ListenerService = inject(ListenerService);

  /**
   * Sets checked state of component. <br />
   * Because 'checked' is a native attribute of input[type="checkbox"], it can only be set false by using [checked]="false", not checked="false" <br />
   * Use [checked] when you want to handle the checked state of the checkbox.
   * Use (checkedChange) when you want the library to handle the checked state of the checkbox, but get notified of changes.
   * Use [(checked)] when you want the checked state to reflect changes by both you and the library.
   */
  readonly checked: ModelSignal<boolean | null | string> = model<boolean | null | string>(null);
  // This is required since you can bind [checked] to the host, and we need to update the property when it changes.
  private readonly checkedEffect = effect(() => {
    const checked = this.checked();
    this.setProperty('checked', checked ? checked.toString() : null);
  }, defaultEffectParam);

  /**
   * Sets checkbox to disabled when true
   * @default false
   */
  readonly disabledInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'disabled',
    transform: booleanAttribute
  });
  private readonly disabledInternal: WritableSignal<boolean | null> = signal<boolean | null>(null);
  readonly disabled: Signal<boolean | null> = computed(() => this.disabledInput() ?? this.disabledInternal());
  /** Fires when a formControl's disabled state updates  */
  override setDisabledState(isDisabled: boolean | null): void {
    super.setDisabledState(!!isDisabled);
    this.disabledInternal.set(isDisabled);
  }

  /**
   * Sets custom id.
   * @default idGenerator.newId('v-checkbox')
   * @builtin true
   */
  readonly id: InputSignal<string> = input<string>(this.idGenerator.newId('v-checkbox'));

  /**
   * Marks checkbox as invalid when true.
   * @default false
   */
  readonly invalid: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    transform: booleanAttribute
  });

  /**
   * Sets checkbox to indeterminate when true.
   * @default false
   */
  readonly indeterminate: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    transform: booleanAttribute
  });
  // This is required since you can bind [indeterminate] to the host, and we need to update the property when it changes.
  private readonly indeterminateEffect = effect(() => {
    const indeterminate = this.indeterminate();
    this.setProperty('indeterminate', indeterminate ? true : null);
  }, defaultEffectParam);

  /**
   * Marks checkbox as required when true.
   * @default false
   */
  readonly required: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    transform: booleanAttribute
  });

  handleChange(event: Event): void {
    const { checked } = event.target as HTMLInputElement;
    this.onChange(checked);
    this.checked.set(checked);
  }

  override writeValue(value: any): void {
    super.writeValue(value);
    this.checked.set(value ? value.toString() : null);
  }
}
