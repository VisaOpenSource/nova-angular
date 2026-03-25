/**
 *              © 2026 Visa
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
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  linkedSignal,
  model,
  numberAttribute,
  Provider,
  signal,
  viewChild
} from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonDirective, IdGenerator, InputDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaClearAltTiny, VisaErrorTiny, VisaPasswordHideTiny, VisaPasswordShowTiny } from '@visa/nova-icons-angular';

/// This allows for reactive `formControl`'s or `ngModel`'s
const DEFAULT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ReusableInput),
  multi: true
};

/** #AI-first */
@Component({
  selector: 'nova-reusable-input',
  imports: [NovaLibModule, VisaClearAltTiny, VisaErrorTiny, VisaPasswordHideTiny, VisaPasswordShowTiny],
  templateUrl: './reusable-component.docs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DEFAULT_VALUE_ACCESSOR]
})
export class ReusableInput extends DefaultValueAccessor {
  // View children:
  private readonly button = viewChild(ButtonDirective, { read: ElementRef });
  private readonly input = viewChild(InputDirective, { read: ElementRef });

  // Unique ID for the input
  private readonly generatedId = inject(IdGenerator).newId('reusable-input');

  // Inputs:
  readonly characterCounter = input(null, { transform: booleanAttribute });
  readonly clearable = input(false, { transform: booleanAttribute });
  readonly disabledInput = input(null, { alias: 'disabled', transform: booleanAttribute });
  readonly idInput = input<string | null>(null, { alias: 'id' });
  readonly inline = input(false, { transform: booleanAttribute });
  readonly invalid = input(null, { transform: booleanAttribute });
  readonly label = input('');
  readonly maskable = input(null, { transform: booleanAttribute });
  readonly maxLength = input(400, { transform: numberAttribute });
  readonly message = input<string>();
  readonly otp = input(false, { transform: booleanAttribute });
  readonly placeholder = input<string>();
  readonly prefix = input<string>();
  readonly readonly = input(null, { transform: booleanAttribute });
  readonly required = input(null, { transform: booleanAttribute });
  readonly step = input(null, { transform: numberAttribute });
  readonly suffix = input<string>();
  readonly textareaInput = input(null, { transform: booleanAttribute, alias: 'textarea' });
  readonly typeInput = input<HTMLInputElement['type'] | null>(null, { alias: 'type' });
  readonly value = model<string>('');

  // Textarea inputs (for textarea only):
  readonly resizable = input(null, { transform: booleanAttribute });

  // State:
  protected readonly inFocus = signal(false);
  protected readonly masked = signal<boolean>(true);

  // Computed values:
  protected readonly textarea = computed(() => this.textareaInput() || this.resizable() || this.characterCounter());
  protected readonly disabled = linkedSignal(() => this.disabledInput());
  protected readonly id = computed(() => this.idInput() ?? this.generatedId);
  protected readonly type = computed(() => {
    if (this.typeInput()) return this.typeInput();
    if (!this.maskable()) return null;
    return this.masked() ? 'password' : 'text';
  });
  protected readonly inputDescribedBy = computed(() => {
    const id = this.id();
    const messageId = this.message() ? id + '-message' : false;
    const charCounterId = this.characterCounter() ? id + '-char-counter' : false;
    const prefixId = this.prefix() ? id + '-prefix' : false;
    const suffixId = this.suffix() ? id + '-suffix' : false;
    const describedBy = [messageId, charCounterId, prefixId, suffixId].filter(Boolean);
    if (describedBy.length) return describedBy.join(' ');
    return null;
  });
  protected readonly empty = computed(() => !this.value());
  protected readonly overLimit = computed(() => {
    const val = this.value();
    const max = this.maxLength();
    return val && val.length > max ? val.length - max : false;
  });
  protected readonly charactersRemaining = computed(() => {
    const max = this.maxLength();
    const val = this.value();
    return max - (val ? val.length : 0);
  });

  // Effects:
  protected readonly disabledEffect = effect(() => {
    const disabled = !!this.disabled();
    this.setDisabledState(disabled);
  });

  // Events:
  protected handleBlur(event: FocusEvent) {
    const { relatedTarget } = event;
    if (relatedTarget !== this.button()?.nativeElement && relatedTarget !== this.input()?.nativeElement)
      this.inFocus.set(false);
    this.onTouched();
  }
  protected handleClear() {
    this.writeValue('');
    this.input()?.nativeElement.focus();
  }
  protected handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.writeValue(value);
  }
  protected handleToggleMask() {
    this.masked.update((val) => !val);
  }

  /// These are to allow for reactive `formControl`'s or `ngModel`'s

  override setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  override writeValue(value: any): void {
    this.value.set(value);
    super.writeValue(value);
    this.onChange(value);
  }
}
