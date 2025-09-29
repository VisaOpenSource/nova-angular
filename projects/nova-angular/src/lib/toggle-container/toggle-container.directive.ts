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
  AfterContentInit,
  booleanAttribute,
  computed,
  contentChildren,
  Directive,
  effect,
  forwardRef,
  inject,
  input,
  InputSignal,
  InputSignalWithTransform,
  model,
  ModelSignal,
  Signal,
  signal,
  untracked,
  WritableSignal
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IdGenerator } from '../id-generator/id-generator.service';
import { ToggleButtonDirective } from '../toggle-button/toggle-button.directive';
import { defaultEffectParam } from '../nova-lib.constants';

export type ToggleContainerValue = number | string | (string | number | null)[] | null;

@Directive({
  host: {
    class: 'v-toggle-container',

    '[attr.aria-invalid]': 'invalid()',
    '[attr.disabled]': "disabled() ? 'disabled' : null",

    '(focus)': 'onTouched($event)'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleContainerDirective),
      multi: true
    }
  ],
  selector: '[v-toggle-container]',
  standalone: true
})
export class ToggleContainerDirective implements ControlValueAccessor, AfterContentInit {
  constructor() {
    let prevActiveButtons: ToggleButtonDirective[] | undefined = undefined;
    effect(() => {
      const activeButtons = this.activeButtons();
      if (!activeButtons || !activeButtons.length || prevActiveButtons == activeButtons) return;
      prevActiveButtons = activeButtons;
      // update container value to match active buttons when changed
      // if multiselect, or single select with only one active button
      const multiselect = untracked(() => this.multiselect());
      if (multiselect || (!multiselect && activeButtons.length <= 1)) {
        this.updateValue();
      } else {
        // if single select and 2 selected, remove the previous one
        const previousSSValue = untracked(() => this.previousSSValue());
        previousSSValue?.active.set(false);
      }
    }, defaultEffectParam);
  }

  private readonly idGenerator: IdGenerator = inject(IdGenerator);

  readonly buttons: Signal<readonly ToggleButtonDirective[]> = contentChildren(
    forwardRef(() => ToggleButtonDirective),
    {
      descendants: true
    }
  );

  // store the active button(s)
  private readonly activeButtons: Signal<ToggleButtonDirective[]> = computed(() =>
    this.buttons()?.filter((item) => item.active())
  );

  // store the previous selected button in single select mode
  previousSSValue: Signal<ToggleButtonDirective | null> = computed<ToggleButtonDirective | null>(() =>
    !this.multiselect() ? (this.activeButtons()?.find((item) => item.value() === this.value()) ?? null) : null
  );

  /**
   * Sets custom name.
   * @default this.idGenerator.newId('v-toggle');
   * @builtin true
   */
  readonly name: InputSignal<string> = input(this.idGenerator.newId('v-toggle'));

  /**
   * Allows multiple buttons to be selected when true. <br />
   * To be used with child Button components, not Radio or Checkbox.
   * @default false
   */
  readonly multiselectInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'multiselect',
    transform: booleanAttribute
  });
  readonly multiselect: Signal<boolean> = computed(() => this.multiselectInput() ?? Array.isArray(this.value()));

  /**
   * Sets component as disabled when true.
   * @default false
   */
  readonly disabledInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'disabled',
    transform: booleanAttribute
  });
  private readonly disabledInternal: WritableSignal<boolean | null> = signal<boolean | null>(null);
  readonly disabled: Signal<boolean | null> = computed(
    () =>
      this.disabledInput() ??
      this.disabledInternal() ??
      // if any items are enabled, set container to enabled, if all items are disabled, set container to disabled
      // if no items are present, set container to null
      (this.buttons()?.length ? !this.buttons()?.some((item) => !item.disabledInput()) : null)
  );
  setDisabledState(disabled: boolean): void {
    this.disabledInternal.set(disabled);
  }

  /**
   * Marks component as invalid when true.
   * @default false
   */
  readonly invalid: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    transform: booleanAttribute
  });

  /**
   * Value of toggle container.
   * Use [value] when you want to handle the value of the toggle container.
   * Use (valuedChange) when you want the library to handle the value of the toggle container, but get notified of changes.
   * Use [(value)] when you want the value to reflect changes by both you and the library.
   */
  readonly value: ModelSignal<ToggleContainerValue> = model<ToggleContainerValue>(null);
  private readonly valueEffect = effect(() => {
    const value = this.value();
    this.onChange(value);
  }, defaultEffectParam);

  ngAfterContentInit(): void {
    // if the value is not set, set it to the value of the active buttons
    // if the value is set, set the active buttons to the value of the toggle container
    this.updateValue(this.value() ? this.value() : undefined);
  }

  /**
   * Sets the value of the toggle container.
   * Used in toggle button directive to avoid circular dependency.
   */
  updateValue(value: ToggleContainerValue | undefined = undefined): void {
    // if the value was changed externally, update the active buttons
    if (value !== undefined) {
      this.buttons().forEach((item) => {
        // if the value is an array, set the active state of the button to true if the value is in the array
        if (Array.isArray(value) && this.multiselect()) {
          item.active.set(value.includes(item.value()));
        } else {
          // if the value is not an array, set the active state of the button to true if the value is equal to the button value
          item.active.set(item.value() === value);
        }
      });
    } else {
      let newValue: ToggleContainerValue = this.activeButtons().map((item) => item.value());
      if (!this.multiselect()) newValue = newValue[0] ?? null;

      // must use JSON.stringify to compare objects because the value is an array of objects
      // and the default === operator will not work
      // @TODO: try to switch to novaLibService.valuesDiffer()
      if (JSON.stringify(newValue) !== JSON.stringify(this.value())) {
        this.value.set(newValue);
      }
    }
  }

  private onChange = (_: any): void => {};

  onTouched = (_: any): void => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: ToggleContainerValue): void {
    this.value.set(value);
    this.updateValue(value);
  }
}
