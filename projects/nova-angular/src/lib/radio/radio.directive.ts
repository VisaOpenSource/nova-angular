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
  Injector,
  InputSignal,
  InputSignalWithTransform,
  ModelSignal,
  Signal,
  WritableSignal,
  booleanAttribute,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  model,
  signal
} from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl, RadioControlValueAccessor } from '@angular/forms';
import { IdGenerator } from '../id-generator/id-generator.service';
import { RadioGroupDirective } from '../radio-group/radio-group.directive';
import { ToggleContainerDirective } from '../toggle-container/toggle-container.directive';
import { ToggleDirective } from '../toggle/toggle.directive';
import { defaultEffectParam } from '../nova-lib.constants';

const RADIO_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioDirective),
  multi: true
};

@Directive({
  host: {
    class: 'v-radio',
    type: 'radio',

    '[attr.aria-invalid]': 'invalid()',
    '[attr.disabled]': 'disabled() ? "disabled" : null',
    '[attr.id]': 'id()',
    '[attr.name]': 'nameSignal()',
    '[attr.required]': 'required() ? "required" : null',
    '[attr.value]': 'valueSignal()',

    '(blur)': 'radioGroup?.onTouched()',
    '(change)': 'handleChange($event)'
  },
  providers: [RADIO_VALUE_ACCESSOR],
  selector: '[v-radio]',
  standalone: true
})
export class RadioDirective extends RadioControlValueAccessor {
  override ngOnInit(): void {
    // if initial checked state is set, set the checked state to the initial value
    // ie `<input v-checkbox checked>` will set the checked state to '', which is truthy
    if (this.checked() === '') {
      this.checked.set(true);
    }
    this._control = this.injector.get(NgControl, null, { optional: true });
    this.checkName();
    this?.['_registry'].add(this._control, this);
  }
  private _control: NgControl | null = null;
  private readonly injector: Injector = inject(Injector);
  public readonly el: ElementRef = inject(ElementRef);
  private readonly idGenerator: IdGenerator = inject(IdGenerator);
  protected readonly radioGroup: RadioGroupDirective | null = inject(RadioGroupDirective, { optional: true });
  private readonly toggle: ToggleDirective | null = inject(ToggleDirective, { optional: true });
  private readonly toggleContainer: ToggleContainerDirective | null = inject(ToggleContainerDirective, {
    optional: true
  });

  /**
   * Sets checked state of component. <br />
   * Because 'checked' is a native attribute of input[type="checkbox"], it can only be set false by using [checked]="false", not checked="false" <br />
   * Use [checked] when you want to handle the checked state of the checkbox.
   * Use (checkedChange) when you want the library to handle the checked state of the checkbox, but get notified of changes.
   * Use [(checked)] when you want the checked state to reflect changes by both you and the library.
   */
  readonly checked: ModelSignal<boolean | null | string> = model<boolean | null | string>(null);

  readonly checkedEffect = effect(() => {
    const checked = this.checked();
    this.setProperty('checked', checked);
  }, defaultEffectParam);

  private checkName: () => void = super['_checkName'];

  private readonly radioGroupValueEffect = effect(() => {
    const radioGroupValue = this.radioGroup?.value();
    if (radioGroupValue !== undefined) {
      this.checked.set(this.valueSignal() === radioGroupValue);
    }
  }, defaultEffectParam);

  /**
   * Sets radio as disabled when true.
   * @default false
   */
  readonly disabledInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'disabled',
    transform: booleanAttribute
  });
  readonly disabledInternal: WritableSignal<boolean | null> = signal<boolean | null>(null);
  readonly disabled: Signal<boolean | null> = computed(
    () => this.disabledInput() ?? this.radioGroup?.disabled() ?? this.disabledInternal()
  );
  /** Fires when a formControl's disabled state updates  */
  override setDisabledState(disabled: boolean | null): void {
    this.disabledInternal.set(disabled);
  }

  /**
   * @ignore
   */
  readonly formName: InputSignal<string | null> = input<null | string>(null, { alias: 'formControlName' });

  /**
   * Sets custom id.
   * @default idGenerator.newId('v-radio')
   * @builtin true
   */
  readonly id: InputSignal<string> = input(this.idGenerator.newId('v-radio'));

  /**
   * Marks radio as invalid when true.
   * @default false
   */
  readonly invalidInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'invalid',
    transform: booleanAttribute
  });
  protected readonly invalid: Signal<boolean | null> = computed(
    () => this.invalidInput() ?? this.radioGroup?.invalid() ?? null
  );

  /**
   * @ignore
   */
  readonly nameInput: InputSignal<string | null> = input<HTMLInputElement['name'] | null>(null, { alias: 'name' });
  readonly nameSignal: Signal<string | null> = computed(
    () => this.nameInput() ?? this.radioGroup?.name() ?? this.formName() ?? this.toggleContainer?.name() ?? null
  );
  private readonly namesEffect = effect(() => {
    this.formControlName = this.formName() ?? '';
    this.name = this.nameSignal() ?? '';
    this.checkName();
  }, defaultEffectParam); // Used to sync to RadioControlValueAccessor

  /**
   * Marks component as required when true.
   * @default false
   */
  readonly requiredInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'required',
    transform: booleanAttribute
  });
  protected readonly required: Signal<boolean | null> = computed(
    () => this.requiredInput() ?? this.radioGroup?.required() ?? null
  );

  /**
   * Value of radio input.
   * @default idGenerator.newId('v-radio') when toggle is true, otherwise null
   */
  readonly valueInput: InputSignal<string | number | null> = input<number | null | string>(null, { alias: 'value' });
  readonly valueSignal: Signal<string | number | null> = computed(
    () => this.valueInput() ?? (this.toggle ? this.idGenerator.newId('v-radio') : null)
  );
  private readonly valueEffect = effect(() => {
    this.value = this.valueSignal();
  }, defaultEffectParam); // Used to sync to RadioControlValueAccessor

  handleChange(event: Event): void {
    const { checked: isChecked } = event.target as HTMLInputElement;
    this.checked.set(isChecked);
  }

  override writeValue(value: string | number | null): void {
    this.checked.set(this.valueSignal() === value);
  }
}
