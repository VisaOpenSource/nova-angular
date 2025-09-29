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
  InputSignal,
  InputSignalWithTransform,
  ModelSignal,
  Signal,
  WritableSignal,
  booleanAttribute,
  computed,
  contentChildren,
  effect,
  forwardRef,
  inject,
  input,
  model,
  signal,
  untracked
} from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IdGenerator } from '../id-generator/id-generator.service';
import { RadioDirective } from '../radio/radio.directive';
import { valuesDiffer } from '../utilities';
import { defaultEffectParam } from '../nova-lib.constants';

const RADIO_GROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioGroupDirective),
  multi: true
};

/**
 * This directive is used to group radio buttons together and manage their state. <br />
 * Typically used for a required group to relay that one of the group is required to be selected.
 */
@Directive({
  host: {
    role: 'radiogroup',

    '[attr.aria-required]': 'required() || null'
  },
  providers: [RADIO_GROUP_VALUE_ACCESSOR],
  selector: '[v-radio-group]',
  standalone: true
})
export class RadioGroupDirective extends DefaultValueAccessor {
  private readonly idGenerator: IdGenerator = inject(IdGenerator);
  readonly radios: Signal<readonly RadioDirective[]> = contentChildren(
    forwardRef(() => RadioDirective),
    { descendants: true }
  );

  /**
   * Sets radio group as disabled when true.
   * @default false
   */
  readonly disabledInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'disabled',
    transform: booleanAttribute
  });
  readonly disabledInternal: WritableSignal<boolean | null> = signal<boolean | null>(null);
  readonly disabled: Signal<boolean | null> = computed(() => this.disabledInput() ?? this.disabledInternal());
  /** Fires when a formControl's disabled state updates  */
  override setDisabledState(disabled: boolean): void {
    super.setDisabledState(disabled);
    this.disabledInternal.set(disabled);
  }

  /**
   * Marks radio group as invalid when true.
   * @default false
   */
  readonly invalid: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    transform: booleanAttribute
  });

  /**
   * Shared name of radio group.
   * @default this.uuidService.getUUID('v-radio-group-');
   * @builtin true
   */
  readonly name: InputSignal<string> = input<string>(this.idGenerator.newId('v-radio-group'));

  /**
   * Marks radio group as required when true.
   * @default false
   */
  readonly required: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    transform: booleanAttribute
  });

  /**
   * Value of radio group.
   * Use [value] when you want to handle the value of the toggle container.
   * Use (valuedChange) when you want the library to handle the value of the toggle container, but get notified of changes.
   * Use [(value)] when you want the value to reflect changes by both you and the library.
   */
  readonly value: ModelSignal<string | number | null | undefined> = model<string | number | null | undefined>(null);
  // radio button group value changes should update the checked radio button
  private readonly valueEffect = effect(() => {
    const value = this.value();
    this.onChange(value);
  }, defaultEffectParam);
  private readonly activeRadio: Signal<RadioDirective | undefined> = computed(() =>
    this.radios()?.find((item) => item.checked())
  );
  // radio button changes should update the value of the radio group
  // use untracked to avoid circular updates
  private readonly activeRadioEffect = effect(() => {
    const activeValue = this.activeRadio()?.valueSignal();

    // you can't 'uncheck' a radio button by clicking it again, so only update the value if it is different
    if (!activeValue) return;
    untracked(() => {
      if (valuesDiffer(this.value(), activeValue)) {
        this.value.set(activeValue);
      }
    });
  }, defaultEffectParam);

  override writeValue(value: string | number): void {
    this.value.set(value);
  }
}
