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
  numberAttribute,
  signal,
  untracked
} from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComboboxDirective } from '../combobox/combobox.directive';
import { IdGenerator } from '../id-generator/id-generator.service';
import { ListboxItemComponent } from '../listbox-item/listbox-item.component';
import { ListboxService } from './listbox.service';
import { NovaLibService } from '../nova-lib.service';
import { MultiSelectValue, SingleSelectValue } from '../combobox/combobox.constants';
import { defaultEffectParam } from '../nova-lib.constants';
import { valuesDiffer } from '../utilities';

export type ListboxValue = string | number | (string | number)[] | null;

const LISTBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ListboxDirective),
  multi: true
};
@Directive({
  host: {
    role: 'group',
    class: 'v-listbox',

    '[attr.id]': 'id()',
    '[class.v-listbox-error]': 'invalid()',
    '[class.v-listbox-scroll]': 'containHeight()',
    '[style.--v-listbox-block-size-scroll]': 'scrollHeight()'
  },
  providers: [LISTBOX_VALUE_ACCESSOR],
  selector: '[v-listbox]',
  standalone: true
})
export class ListboxDirective extends DefaultValueAccessor {
  readonly combobox: ComboboxDirective | null = inject(ComboboxDirective, { optional: true }); // accessed in listbox-item.component.ts
  public readonly el: ElementRef = inject(ElementRef);
  private readonly idGenerator: IdGenerator = inject(IdGenerator);
  private readonly listboxService: ListboxService = inject(ListboxService);
  public readonly novaLibService: NovaLibService = inject(NovaLibService);

  public readonly listItems: Signal<readonly ListboxItemComponent[]> = contentChildren(
    forwardRef(() => ListboxItemComponent)
  );

  // set up listbox when rendered (or re-rendered)
  prevListItems: ListboxItemComponent[] | undefined = undefined;
  private readonly listboxItemsChangeEffect = effect(() => {
    const prevListItems = this.prevListItems;
    /**
     * this effect will be called for every list item change (including active)
     * we need to only update the listbox and relevant item props when the **rendered** items change
     * ie when items are added or removed
     * */
    if (this.listItems() && this.listItems() !== prevListItems) {
      // set up listbox
      // if not in combobox, add arrow key navigation
      if (!this.inCombobox) this.listboxService.setUpListbox(this);

      if (this.customScrollControl()) return; // if custom scroll control is set, skip scrolling
      setTimeout(() => {
        this.listboxService.scrollItemIntoView(this);
      }, 500); // on initial load, extra time is needed for getComputedStyle

      // grab first focusable item and set as highlighted
      const firstFocusableItem = this.listItems().find((item) => untracked(() => item.active()));
      if (!firstFocusableItem) return; // if no focusable item, do nothing
      // if an active item exists, set it as first highlighted
      this.highlightedItem.set(firstFocusableItem);
      this.prevListItems = this.listItems() as ListboxItemComponent[];
    }
  }, defaultEffectParam);

  private readonly inCombobox: boolean = !!this.combobox;

  // used in service
  public listboxHeight: number = 0;
  public listboxItemHeight: number = 0;
  public listboxGap: number = 0;
  public listboxScrollStylesSet: boolean = false;
  public listeners: (() => void)[] = []; // used in service

  public keyword: string = '';
  public highlightedItem: WritableSignal<ListboxItemComponent | null> = signal(null);
  public showFocus: WritableSignal<boolean> = signal(false);
  public isHotkeyEvent: Boolean = false;
  public timeoutId: number = 0;
  public readonly ariaActiveDescendant: Signal<string | null> = computed(() => this.highlightedItem()?.id() || null);
  public readonly recentSelectedItem: Signal<ListboxItemComponent | undefined> = computed(() => {
    const value = this.value();

    // if no value, return undefined
    if (!value) return undefined;

    // if multiselect, return last selected item
    if (this.multiselect() && Array.isArray(value))
      return this.listItems().find((item) => item.value() === value[value.length - 1]);

    // if single select, return item with value
    return this.listItems().find((item: ListboxItemComponent) => item.value() === value);
  });

  /**
   * Sets custom id.
   * @default idGenerator.newId('v-listbox')
   * @builtin true
   */
  readonly id: InputSignal<string> = input<string>(this.idGenerator.newId('v-listbox'));

  /**
   * Sets listbox to multiselect variant when true.
   * @default false
   */
  readonly multiselect: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets component and any ListboxItemComponent children as disabled when true. <br>
   * Will automatically become true if all children are disabled.
   * @default false
   */
  readonly disabledInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'disabled',
    transform: booleanAttribute
  });
  readonly disabledInternal: WritableSignal<boolean | null> = signal<boolean | null>(null);
  // if any items are enabled, set listbox to enabled, if all items are disabled, set listbox to disabled
  readonly disabledChildren: Signal<boolean | null> = computed(() => {
    // if no items exist, return null
    if (!this.listItems() || this.listItems().length === 0) return null;
    // if any items are enabled, set listbox to enabled, if all items are disabled, set listbox to disabled
    return this.listItems().some((item) => !item.disabledInput() && !item.disabledInternal()) ? null : true;
  });
  readonly disabled: Signal<boolean | null> = computed(
    () =>
      this.disabledInput() ?? this.disabledChildren() ?? this.combobox?.disabled() ?? this.disabledInternal() ?? null
  );
  /** Fires when a formControl's disabled state updates  */
  override setDisabledState(isDisabled: boolean): void {
    this.disabledInternal.set(isDisabled);
    super.setDisabledState(isDisabled);
  }

  /**
   * Sets component and any ListboxItemComponent children as invalid when true. <br>
   * @default false
   */
  readonly invalidInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'invalid',
    transform: booleanAttribute
  });
  readonly invalid: Signal<boolean | null> = computed(() => this.invalidInput() ?? this.combobox?.invalid() ?? null);

  /**
   * Marks component as required when true.
   * @default false
   */
  readonly requiredInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'required',
    transform: booleanAttribute
  });
  readonly required: Signal<boolean | null> = computed(() => this.requiredInput() ?? this.combobox?.required() ?? null);

  /**
   * Sets CSS variable <code>--v-listbox-block-size-scroll</code>. <br />
   * If true, the default 180px will be the listbox's <code>max-block-size</code>. <br />
   * If set to a number or string representing a number (ie <code>[containHeight]="250"</code>), the variable will be set to that amount of pixels.
   */
  readonly containHeight: InputSignalWithTransform<boolean | null | number, unknown> = input<
    boolean | null | number,
    unknown
  >(null, {
    transform: (v) => {
      const asNum = numberAttribute(v);
      const asBool = booleanAttribute(v);
      // if num is 0 return boolean
      if (asNum === 0 || Number.isNaN(asNum)) return asBool;
      return asNum;
    }
  });
  protected readonly scrollHeight: Signal<string | null> = computed(() =>
    this.containHeight() && this.containHeight() !== true ? parseInt(this.containHeight()?.toString()!) + 'px' : null
  ); // allows "250" or "250px" for example

  /**
   * Value of listbox.
   */
  readonly value: ModelSignal<SingleSelectValue | MultiSelectValue | null> = model<
    SingleSelectValue | MultiSelectValue | null
  >(null);

  // update item active from listbox value
  private prevListboxValue: SingleSelectValue | MultiSelectValue | null = null;
  private readonly valueChangeEffect = effect(() => {
    const value = this.value();
    if (!valuesDiffer(value, this.prevListboxValue)) return; // if value hasn't changed, do nothing
    this.prevListboxValue = this.value();
    // let form control know value has changed
    this.onChange(value);
  }, defaultEffectParam);

  /**
   * Overrides default scroll control behavior. <br />
   * By default the listbox will scroll to the last selected item.
   * @default false
   */
  readonly customScrollControl: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  override writeValue(value: SingleSelectValue | MultiSelectValue | null): void {
    this.value.set(value);
    super.writeValue(value);
  }

  ngOnDestroy(): void {
    // remove listeners
    this.listeners?.forEach((listener) => listener());
    this.listeners = [];
  }
}
