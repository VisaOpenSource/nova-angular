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
  EventEmitter,
  InputSignal,
  InputSignalWithTransform,
  ModelSignal,
  OutputEmitterRef,
  Provider,
  Signal,
  WritableSignal,
  booleanAttribute,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal
} from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComboboxDirective } from '../combobox/combobox.directive';
import { IdGenerator } from '../id-generator/id-generator.service';
import { defaultEffectParam, SPACE_KEY } from '../nova-lib.constants';

const DEFAULT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputDirective),
  multi: true
};

@Directive({
  host: {
    class: 'v-input',

    '[attr.aria-activedescendant]': 'ariaActiveDescendant()',
    '[attr.aria-autocomplete]': 'ariaAutocomplete()',
    '[attr.aria-controls]': 'ariaControls()',
    '[attr.aria-expanded]': 'ariaExpanded()',
    '[attr.aria-haspopup]': 'ariaHaspopup()',
    '[attr.aria-invalid]': 'invalid()',
    '[attr.aria-owns]': 'ariaOwns()',
    '[attr.disabled]': 'disabled() ? "disabled" : null',
    '[attr.id]': 'id()',
    '[attr.readonly]': 'readonly()? "readonly" : null',
    '[attr.role]': 'role()',
    '[attr.value]': 'value()',
    '[class.v-input-otp]': 'otp()',
    '[class.v-input-resize-none]': 'noResize()',

    // adding blur, focus, and click as they were previously supported by extending BaseInteractiveDirective
    '(blur)': 'handleBlur($event)',
    '(focus)': 'isFocused.set(true)',
    '(click)': 'clicked.emit($event)',
    '(input)': 'handleInput($event)',
    '(keydown)': 'handleReadonlySpace($event)'
  },
  providers: [DEFAULT_VALUE_ACCESSOR],
  selector: '[v-input]',
  standalone: true
})
export class InputDirective extends DefaultValueAccessor {
  private readonly combobox: ComboboxDirective | null = inject(ComboboxDirective, { optional: true });
  readonly el: ElementRef = inject(ElementRef);
  private readonly idGenerator: IdGenerator = inject(IdGenerator);

  public readonly isFocused: WritableSignal<boolean> = signal(false);
  private readonly inCombobox: boolean = !!this.combobox;

  /**
   * Aria attribute relaying what active element the input refers to.
   * @default null
   * @default '&lt;listbox-item-id&gt;' when input is used within combobox and an option is highlighted or active.
   * @builtin true
   */
  readonly ariaActiveDescendantInput: InputSignal<string | null> = input<string | null>(null, {
    alias: 'aria-activedescendant'
  });
  protected readonly ariaActiveDescendant: Signal<string | null> = computed(
    () => this.ariaActiveDescendantInput() ?? this.combobox?.ariaActiveDescendant() ?? null
  );

  /**
   * Aria attribute relaying autocomplete type.
   * @default null
   * @default 'list' when input is used within combobox and no custom value is provided.
   * @builtin true
   */
  readonly ariaAutocompleteInput: InputSignal<string | null> = input<HTMLElement['ariaAutoComplete']>(null, {
    alias: 'aria-autocomplete'
  });
  protected readonly ariaAutocomplete: Signal<string | null> = computed(
    () => this.ariaAutocompleteInput() ?? (this.inCombobox ? 'list' : null)
  );

  /**
   * Aria attribute relaying what element the input controls.
   * @default null
   * @default '&lt;listbox-id&gt;' when input is used within combobox and combobox menu is open.
   * @builtin true
   */
  readonly ariaControlsInput: InputSignal<string | null> = input<string | null>(null, { alias: 'aria-controls' });
  protected readonly ariaControls: Signal<string | null> = computed(
    () => this.ariaControlsInput() ?? this.combobox?.ariaControls() ?? null
  );

  /**
   * Aria attribute relaying whether input is expanded.
   * @default null
   * @builtin true
   */
  readonly ariaExpandedInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'aria-expanded',
    transform: booleanAttribute
  });
  protected readonly ariaExpanded: Signal<boolean | null> = computed(
    () => this.ariaExpandedInput() ?? this.combobox?.ariaExpanded() ?? null
  );

  /**
   * Sets input aria-haspopup attribute.
   * @default null
   * @default 'listbox' when input is used within combobox and no custom value is given.
   * @builtin true
   */
  readonly ariaHaspopupInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'aria-haspopup',
    transform: booleanAttribute
  });
  protected readonly ariaHaspopup: Signal<boolean | 'listbox' | null> = computed(
    () => this.ariaHaspopupInput() ?? (this.inCombobox ? 'listbox' : null)
  );

  /**
   * Sets input aria-owns attribute.
   * @default null
   * @default '&lt;listbox-container-id&gt;' when input is used within combobox and no custom value is given.
   * @builtin true
   */
  readonly ariaOwnsInput: InputSignal<string | null> = input<string | null>(null, { alias: 'aria-owns' });
  protected readonly ariaOwns: Signal<string | null> = computed(
    () => this.ariaOwnsInput() ?? this.combobox?.ariaOwns() ?? null
  );

  /**
   * Sets component as disabled when true.
   * @default false
   */
  readonly disabledInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'disabled',
    transform: booleanAttribute
  });
  readonly disabledInternal: WritableSignal<boolean | null> = signal<boolean | null>(null);
  readonly disabled: Signal<boolean | null> = computed(
    () => this.disabledInput() ?? this.combobox?.disabled() ?? this.disabledInternal()
  );
  /** Fires when a formControl's disabled state updates  */
  override setDisabledState(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);
    this.disabledInternal.set(isDisabled);
  }

  /**
   * Sets custom id.
   * @default idGenerator.newId('v-input')
   * @builtin true
   */
  readonly id: InputSignal<string> = input(this.idGenerator.newId('v-input'));

  /**
   * Marks component as invalid when true.
   * @default false
   */
  readonly invalidInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'invalid',
    transform: booleanAttribute
  });
  readonly invalid: Signal<boolean | null> = computed(() => this.invalidInput() ?? this.combobox?.invalid() ?? null);

  /**
   * Removes resize from textarea when true.
   * @default false
   */
  readonly noResize: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    transform: booleanAttribute
  });

  /**
   * Sets input to one-time-passcode (OTP) variant when true.
   * @default false
   */
  readonly otp: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    transform: booleanAttribute
  });

  /**
   * Sets input as readonly when true.
   * @default false
   */
  readonly readonlyInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'readonly',
    transform: booleanAttribute
  });
  readonly readonly: Signal<boolean | null> = computed(() => this.readonlyInput() ?? this.combobox?.readonly() ?? null);

  /**
   * Sets custom role.
   * @default null
   * @default 'combobox' when input is used within combobox and no custom role is provided.
   * @builtin true
   */
  readonly roleInput: InputSignal<HTMLElement['role']> = input<HTMLElement['role']>(null, { alias: 'role' });
  protected readonly role: Signal<HTMLElement['role']> = computed(
    () => this.roleInput() ?? (this.inCombobox ? 'combobox' : null)
  );

  /**
   * Value of input.
   * Use [value] when you want to handle the value of the input.
   * Use (valuedChange) when you want the library to handle the value of the input, but get notified of changes.
   * Use [(value)] when you want the value to reflect changes by both you and the library.
   */
  readonly value: ModelSignal<string | null> = model<string | null>('');
  // This is required since you can bind [value] to the host, and we need to update the property when it changes.
  private prevInputValue: string | null = '';
  private readonly valueEffect = effect(() => {
    const value = this.value();
    if (value === this.prevInputValue) return;
    this.onChange(this.value());
    this.setProperty('value', this.value());
    this.prevInputValue = value;
  }, defaultEffectParam);

  /**
   * Emits value when the input event is triggered or backspace key is pressed.
   */
  readonly inputEvent: OutputEmitterRef<string> = output<string>();

  /**
   * Emits event when host interactive element is blurred.
   */
  readonly blurred: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  /**
   * Emits event when host interactive element is clicked.
   */
  readonly clicked: EventEmitter<Event> = new EventEmitter<Event>();

  handleBlur(event: FocusEvent): void {
    this.isFocused.set(false);
    this.blurred.emit(event);
  }

  handleInput(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    this.writeValue(value);
    this.inputEvent.emit(value);
  }

  handleReadonlySpace(event: KeyboardEvent): void {
    // this resolves a bug where date/time/color menus were still opening when readonly and pressing space
    if (this.readonly() && event.key === SPACE_KEY) {
      event.preventDefault();
    }
  }

  override writeValue(value: string): void {
    super.writeValue(value);
    this.value.set(value);
  }
}
