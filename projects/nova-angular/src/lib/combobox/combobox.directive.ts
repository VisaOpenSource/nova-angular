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
  AfterContentInit,
  booleanAttribute,
  computed,
  contentChild,
  contentChildren,
  Directive,
  effect,
  forwardRef,
  inject,
  input,
  InputSignalWithTransform,
  model,
  ModelSignal,
  OnInit,
  output,
  OutputEmitterRef,
  Renderer2,
  Signal,
  signal,
  untracked,
  WritableSignal
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChipDirective } from '../chip/chip.directive';
import { FloatingUIContainer } from '../floating-ui-container/floating-ui-container.directive';
import { IdGenerator } from '../id-generator/id-generator.service';
import { InputContainerComponent } from '../input-container/input-container.component';
import { InputDirective } from '../input/input.directive';
import { LabelDirective } from '../label/label.directive';
import { ListboxContainerDirective } from '../listbox-container/listbox-container.directive';
import { ListboxItemComponent } from '../listbox-item/listbox-item.component';
import { ListboxDirective } from '../listbox/listbox.directive';
import { ListboxService } from '../listbox/listbox.service';
import { ListenerService } from '../listener-service/listener.service';
import {
  BACKSPACE_KEY,
  DOWN_ARROW_KEY,
  ENTER_KEY,
  LEFT_ARROW_KEY,
  RIGHT_ARROW_KEY,
  TAB_KEY,
  UP_ARROW_KEY
} from '../nova-lib.constants';
import { NovaLibService } from '../nova-lib.service';
import { valuesDiffer } from '../utilities';
import { ComboboxFilterType, ComboboxValue, MultiSelectValue, SingleSelectValue } from './combobox.constants';

@Directive({
  host: {
    class: 'v-combobox',

    '[attr.aria-invalid]': 'invalid()',
    '[attr.disabled]': 'disabled() ? "disabled" : null',

    '(keydown)': 'hostKeyDown($event)'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboboxDirective),
      multi: true
    },
    ListenerService
  ],
  selector: '[v-combobox]',
  standalone: true
})
export class ComboboxDirective implements ControlValueAccessor, OnInit, AfterContentInit {
  public readonly floatingContainer: FloatingUIContainer | null = inject(FloatingUIContainer, { optional: true });
  private readonly idGenerator: IdGenerator = inject(IdGenerator);
  private readonly listboxService: ListboxService = inject(ListboxService);
  private readonly novaLibService: NovaLibService = inject(NovaLibService);
  private readonly renderer: Renderer2 = inject(Renderer2);
  public readonly listenerService: ListenerService = inject(ListenerService);

  readonly chips: Signal<readonly ChipDirective[]> = contentChildren(
    forwardRef(() => ChipDirective),
    { descendants: true }
  );
  private readonly inputContainer: Signal<InputContainerComponent | undefined> = contentChild(InputContainerComponent);
  public readonly input: Signal<InputDirective | undefined> = contentChild<InputDirective>(
    forwardRef(() => InputDirective)
  );
  private readonly listboxContainer: Signal<ListboxContainerDirective | undefined> =
    contentChild(ListboxContainerDirective);
  public readonly listbox: Signal<ListboxDirective | undefined> = contentChild(forwardRef(() => ListboxDirective));
  private readonly label: Signal<LabelDirective | undefined> = contentChild(LabelDirective);

  public highlightedIndex: Signal<number | null> = computed<number | null>(() => {
    const index = this.listbox()
      ?.listItems()
      ?.findIndex((item: ListboxItemComponent) => item === this.listbox()?.highlightedItem());
    return index !== undefined && index !== -1 ? index : null;
  });
  public activeIndex: Signal<number | null> = computed(() => {
    const index = this.listbox()
      ?.listItems()
      ?.findIndex((item: ListboxItemComponent) => item.active());
    return index !== undefined && index !== -1 ? index : null;
  });
  // used in service only to store previously active item of type ListboxItemComponent or of type of array passed with custom filter
  public prevActiveItem: ListboxItemComponent | any;
  public autoSelect: WritableSignal<boolean> = signal(false);
  public selectFirstFilteredItemEffect = effect(() => {
    if (!this.autoSelect()) return;
    const listItems = this.listbox()?.listItems() || [];
    if (listItems.length && this.input()?.value() !== '') {
      const firstItem = this.novaLibService.nextEnabledItem(this.listbox()?.listItems() || []);
      this.listbox()?.highlightedItem.set(this.listbox()?.listItems()[firstItem] || null);
    }
  });
  /**
   * children aria attributes
   */
  readonly ariaOwns: Signal<string | null> = computed(
    () => this.floatingContainer?.floatingElementID() ?? this.listboxContainer()?.id() ?? null
  );
  readonly ariaExpanded: Signal<boolean | null> = computed(() => this.floatingContainer?.isShown() ?? null);
  readonly ariaControls: Signal<string | null> = computed(() =>
    this.floatingContainer?.isShown() && this.listbox() ? this.listbox()!.id() : null
  );

  readonly ariaActiveDescendant: Signal<string | null> = computed(() =>
    this.floatingContainer?.isShown() && this.highlightedIndex() !== null && this.getListItem(this.highlightedIndex())
      ? this.getListItem(this.highlightedIndex())!.id()
      : null
  );

  /**
   * Removes appended screenreader readonly text when true. <br>
   * By default &#40;when <code>removeReadonlyText="false"</code>&#41;, if a combobox is readonly, a span element with text '&#40;readonly&#41;' will be appended to the label element for screenreader support.
   * @default false
   */
  readonly removeReadonlyText: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets component as readonly when true.
   * @default false
   */
  readonly readonlyInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'readonly',
    transform: booleanAttribute
  });
  readonly readonly: Signal<boolean | null> = computed<boolean | null>(
    () => this.readonlyInput() ?? this.input()?.readonlyInput() ?? null
  );
  private readonly readonlyEffect = effect(() => {
    const readonly = this.readonly();
    const removeText = untracked(() => this.removeReadonlyText());
    if (!removeText) this.appendReadonlyText(readonly);
  });

  /**
   * Sets component as disabled when true.
   * @default false
   */
  readonly disabledInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'disabled',
    transform: booleanAttribute
  });
  private readonly disabledInternal: WritableSignal<boolean | null> = signal<boolean | null>(null);
  private readonly disabledInputChild: Signal<boolean | null> = computed<boolean | null>(
    () => this.input()?.disabledInput() ?? this.input()?.disabledInternal() ?? null
  );
  private readonly disabledListboxChild: Signal<boolean | null> = computed<boolean | null>(
    () => this.listbox()?.disabledInput() ?? this.listbox()?.disabledInternal() ?? null
  );
  readonly disabled: Signal<boolean | null> = computed<boolean | null>(
    () =>
      // combobox disabled priority goes user input, set by formControl, input, listbox
      this.disabledInput() ?? this.disabledInternal() ?? this.disabledInputChild() ?? this.disabledListboxChild()
  );
  /** Fires when a formControl's disabled state updates  */
  setDisabledState(disabled: boolean): void {
    this.disabledInternal.set(disabled);
  }

  /**
   * Marks component as invalid when true.
   * @default false
   */
  readonly invalidInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'invalid',
    transform: booleanAttribute
  });
  private readonly invalidInternal: Signal<boolean | null> = computed<boolean | null>(
    () => this.input()?.invalidInput() ?? this.listbox()?.invalidInput() ?? null
  );
  readonly invalid: Signal<boolean | null> = computed(() => this.invalidInput() ?? this.invalidInternal());

  /**
   * Marks component as required when true.
   * @default false
   */
  readonly required: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    transform: booleanAttribute
  });

  /**
   * Value of combobox.
   * Use [value] when you want to handle the value of the combobox.
   * Use (valuedChange) when you want the library to handle the value of the combobox, but get notified of changes.
   * Use [(value)] when you want the value to reflect changes by both you and the library.
   */
  readonly value: ModelSignal<ComboboxValue> = model<ComboboxValue>(null);

  private readonly labelIdEffect = effect(() => {
    const id = this.inputContainer()?.labelId();
    if (id) this.label()?.htmlForInternal.set(id);
  });

  selectedItem: WritableSignal<ListboxItemComponent | undefined> = signal<ListboxItemComponent | undefined>(undefined);
  private readonly selectedItemLabelReady = effect(() => {
    const itemReady = this.selectedItem()?.ready();
    const itemLabel = this.selectedItem()?.label();

    if (!itemReady || !itemLabel) return;
    const currentInputValue = untracked(() => this.input()?.value());
    if (currentInputValue === itemLabel) return; // don't set input value if it already matches the selected item label
    this.input()?.value.set(itemLabel);
  });

  prevInputValue: string | null = '';
  private readonly inputValueEffect = effect(() => {
    const input = untracked(() => this.input());
    if (!input) return;
    const inputValue = input.value();
    if (!valuesDiffer(inputValue, this.prevInputValue)) return;
    // if input value changes, update combobox value
    untracked(() => {
      const listboxValue = this.listbox()?.value();
      this.value.set({ label: inputValue || '', value: listboxValue ?? null });
    });
    this.prevInputValue = inputValue;
  });

  prevListboxValue: SingleSelectValue | MultiSelectValue | null = null;
  private readonly listboxValueEffect = effect(() => {
    // update combobox and input value when listbox value changes
    const listboxValue: SingleSelectValue | MultiSelectValue | null = this.listbox()?.value() || null;
    if (!valuesDiffer(listboxValue, this.prevListboxValue)) return;
    this.prevListboxValue = listboxValue;

    let inputText = untracked(() => this.input()?.value());

    const multiselect = untracked(() => this.listbox()?.multiselect());
    const comboboxValue = untracked(() => this.value());
    if (listboxValue && !multiselect) {
      this.selectedItem.set(
        this.listbox()
          ?.listItems()
          ?.find((item: ListboxItemComponent) => untracked(() => item.active()))
      );
      const selectedItem = this.selectedItem();
      if (selectedItem) {
        inputText = selectedItem.label() ?? inputText;
      }
    } else if (multiselect) {
      // for multiselect listbox selection, clear input
      inputText = '';
    }
    const newValue = { label: inputText ?? undefined, value: listboxValue };
    if (!this.meaningfulComboboxValueChange(newValue, comboboxValue)) return;
    // if the value is different, set it
    this.value.set(newValue);
    this.itemSelected.emit(newValue.value);
    if (newValue.value) {
      this.filter.emit({
        type: 'selection',
        listbox: newValue.value,
        input: newValue.label
      });
    }
  });

  prevValue: ComboboxValue = this.value();
  private readonly valueEffect = effect(() => {
    const value = this.value();

    if (!this.meaningfulComboboxValueChange(value, this.prevValue)) return;

    if (!value || (value && !value.value && !value.label)) {
      // if no value or both value and label are empty, reset input and listbox
      this.input()?.value.set('');
      this.listbox()?.value.set(null);
      this.filter.emit({ type: 'reset', listbox: null, input: '' });
    } else {
      // update input and listbox value when combobox value changes
      let newListboxValue: SingleSelectValue | MultiSelectValue | null = value.value;
      const currentInputValue = untracked(() => this.input()?.value());
      const currentListboxValue = untracked(() => this.listbox()?.value());
      if (valuesDiffer(value.label, currentInputValue) && untracked(() => this.input()))
        this.input()?.value.set(value.label ?? '');

      if (valuesDiffer(newListboxValue, currentListboxValue)) {
        if (this.listbox()?.multiselect() && newListboxValue !== null && !Array.isArray(newListboxValue)) {
          newListboxValue = [newListboxValue];
        }
        this.listbox()?.value.set(newListboxValue);
        this.itemSelected.emit(value.value);
        this.filter.emit({ type: 'selection', listbox: value.value, input: value.label });
      }
    }

    if (this.manualChange()) {
      // only emit onChange if the change was made by user interaction (listbox item selection)
      this.manualChange.set(false);
      this.onChange(value);
    }
    this.prevValue = value;
  });

  /**
   * Emits value of selected item(s).
   */
  readonly itemSelected: OutputEmitterRef<SingleSelectValue | MultiSelectValue | null> = output<
    SingleSelectValue | MultiSelectValue | null
  >();

  /**
   * Emitted when a listbox item is selected, when an input value is entered, and when the combobox is reset. <br />
   * Subscribe to provide your own filter function when this event is emitted. <br />
   * Emits { type: 'selection' | 'input' | 'reset'; listbox: string; input: string } where type is the type of filter event, listbox is the value of the selected item(s), and input is the value of the input.
   */
  readonly filter = output<{
    type: ComboboxFilterType;
    listbox: SingleSelectValue | MultiSelectValue | null;
    input?: string | null;
  }>();

  /**
   * Emits the filtered array of ListboxItemComponents when the list is filtered by ComboboxService.
   */
  readonly filteredListEmitter: OutputEmitterRef<any[]> = output<any[]>();

  ngOnInit(): void {
    this.floatingContainer?.isCombobox.set(true);
  }

  private readonly manualChange = signal<boolean>(false);
  ngAfterContentInit(): void {
    // early returns are avoided here to ensure that all content children are initialized before setting up the combobox
    const input = this.input();
    if (input) {
      this.listenerService.subscriptions.push(
        input.inputEvent.subscribe(() => {
          this.manualChange.set(true);
          if (!this.listbox()?.multiselect()) this.listbox()?.value.set(null);
          this.filter.emit({
            type: 'input',
            listbox: null,
            input: input.value()
          });
          // if input event occurs and floating ui is closed, open it
          if (!this.floatingContainer || this.floatingContainer?.isShown()) return;
          this.floatingContainer.floatingUIService.showfloatingUI();
          this.listbox()?.showFocus.set(true);
        })
      );

      // Subscribe to input blur to mark combobox as touched
      this.listenerService.subscriptions.push(
        input.blurred.subscribe((event) => {
          this.onTouched(event);
        })
      );
    }

    const inputContainer = this.inputContainer();
    if (inputContainer?.buttons()) {
      const toggleButton = inputContainer.buttons().find((button) => button.toggleIcon || button.toggleIconComponent);
      if (!toggleButton) return;
      this.listenerService.subscriptions.push(
        toggleButton.clicked.subscribe(() => {
          this.input()?.el.nativeElement.focus();
          this.floatingContainer?.floatingUIService.toggleFloatingUI();
        })
      );
    }

    const listbox = this.listbox();
    if (listbox) {
      this.listenerService.subscriptions.push(
        listbox.manualUserChange.subscribe(() => {
          // mark that the change was made by user interaction
          this.manualChange.set(true);
        })
      );
    }

    if (this.floatingContainer) {
      this.listenerService.subscriptions.push(
        this.floatingContainer.floatingUIService.isShownEmitter.subscribe(() => {
          // when floating UI is shown, highlight first item
          if (this.listbox()?.listItems()?.length) {
            const firstFocusableItem = this.listbox()
              ?.listItems()
              .find((item: ListboxItemComponent) => item.active());
            if (firstFocusableItem) {
              this.listbox()?.highlightedItem.set(firstFocusableItem);
              this.listbox()?.showFocus.set(true);
            }
          }
        })
      );
    }
  }
  /**
   * Public method to handle listbox item clicks directly
   * This can be called from the listbox-item component to ensure the click is processed
   */
  public handleListboxItemClick(): void {
    this.input()?.el.nativeElement.focus();
  }

  hostKeyDown(event: KeyboardEvent): void {
    // don't perform any keboard functions if readonly or disabled
    // also don't open menu if no floating container exists
    const input = this.input();
    if (input?.readonly() || input?.disabled() || !this.input()?.isFocused() || !this.floatingContainer) return;

    if (event.key === DOWN_ARROW_KEY || event.key === RIGHT_ARROW_KEY) {
      // highlight next item and show menu
      if (event.key === DOWN_ARROW_KEY) event.preventDefault(); // allow right arrow to navigate through input
      this.highlightNextPrevItem('next');
      if (!this.floatingContainer?.isShown()) this.floatingContainer.floatingUIService.showfloatingUI();
      const listbox = this.listbox();
      if (this.highlightedIndex() !== null && listbox)
        this.listboxService.scrollItemIntoView(listbox, this.highlightedIndex()!);
    } else if (event.key === UP_ARROW_KEY || event.key === LEFT_ARROW_KEY) {
      // highlight previous item and show menu
      if (event.key === UP_ARROW_KEY) event.preventDefault(); // allow left arrow to navigate through input
      this.highlightNextPrevItem('prev');
      if (!this.floatingContainer?.isShown()) this.floatingContainer.floatingUIService.showfloatingUI();
      if (this.highlightedIndex() !== null && this.listbox) {
        this.listboxService.scrollItemIntoView(this.listbox()!, this.highlightedIndex()!);
      }
    } else if (event.key === ENTER_KEY) {
      if (this.floatingContainer?.isShown()) {
        event.preventDefault(); // prevent form submission if enter is triggered on list item
      }
      // select currently highlighted item
      if (this.highlightedIndex() !== null) {
        this.listbox()
          ?.highlightedItem()
          ?.selectItem(this.listbox()?.multiselect() ? undefined : true); // multiselect should toggle, single select should select
        this.getListItem(this.highlightedIndex())?.clicked.emit(null as unknown as Event); // emit click event (closes item when close on click is called)
      }
    } else if (event.key === TAB_KEY && event.shiftKey) {
      if (this.listbox()?.multiselect() && this.chips().length > 0) {
        // if shift+tab is pressed and there is a chip (aka a value), close the menu
        // @note, possibly make this optional by providing an opt-out input
        this.floatingContainer.floatingUIService.hidefloatingUI();
      }
    } else if (event.key === BACKSPACE_KEY) {
      if (!this.listbox()?.multiselect() && this.listbox()?.highlightedItem()) {
        // in single select, if backspace is pressed, reset highlighted item
        // keep on multiselect since it can have other items selected?
        this.listbox()?.highlightedItem.set(null);
      }
      const value = this.value();
      if (
        this.listbox()?.multiselect() &&
        Array.isArray(value?.value) &&
        !this.input()?.value() &&
        this.chips().length > 0
      ) {
        // remove last chip if backspace is pressed on empty input and there are chips (aka a value)
        const lastValue = value?.value[value?.value?.length - 1];
        const lastItem = this.listbox()
          ?.listItems()
          ?.find((item: ListboxItemComponent) => item.value() === lastValue);
        lastItem?.selectItem(false);
      }
    }
  }

  /**
   * Highlight next enabled item or previous enabled item depending on type.
   * @param type 'next' | 'prev'
   */
  private highlightNextPrevItem(type: 'next' | 'prev'): void {
    let filteredIndex: number | null = null;
    if (this.highlightedIndex() !== null) {
      // find next item given current item
      if (type === 'next')
        filteredIndex = this.novaLibService.nextEnabledItem(
          this.listbox()?.listItems() || [],
          this.highlightedIndex()!
        );
      if (type === 'prev')
        filteredIndex = this.novaLibService.previousEnabledItem(
          this.listbox()?.listItems() || [],
          this.highlightedIndex()!
        );
    } else if (this.activeIndex() !== null) {
      filteredIndex = this.activeIndex();
    } else {
      // find next item initially
      if (type === 'next') filteredIndex = this.novaLibService.nextEnabledItem(this.listbox()?.listItems() || []);
      if (type === 'prev') filteredIndex = this.novaLibService.previousEnabledItem(this.listbox()?.listItems() || []);
    }

    if (filteredIndex === -1 || filteredIndex === null) return;
    this.listbox()?.highlightedItem.set(this.listbox()?.listItems()[filteredIndex] || null);
    this.listbox()?.showFocus.set(true);
  }

  /**
   * @param index
   * @returns ListboxItemComponent at index given.
   */
  private getListItem(index: number | null): ListboxItemComponent | undefined {
    if (index === null || !this.listbox()?.listItems()[index]) {
      return;
    }
    return this.listbox()?.listItems()[index];
  }

  private readonlySpanID?: string;
  private appendReadonlyText(readonly: boolean | null): void {
    if (readonly) {
      const span = this.renderer.createElement('span');
      this.renderer.addClass(span, 'v-sr');
      this.readonlySpanID = this.idGenerator.newId('v-label');
      this.renderer.setAttribute(span, 'id', this.readonlySpanID);
      const text = this.renderer.createText(' (read-only)');
      this.renderer.appendChild(span, text);
      if (this.label()?.el.nativeElement) {
        this.renderer.appendChild(this.label()?.el.nativeElement, span);
      }
    } else {
      if (!this.readonlySpanID) return;
      const readonlyText = document.getElementById(this.readonlySpanID);
      if (readonlyText) this.renderer.removeChild(this.label()?.el.nativeElement, readonlyText);
    }
  }

  /**
   * For our comparison purposes, we don't want to trigger a value change effect if
   * the first combobox value passed is set to an empty string or null,
   * and second the combobox value passed is set to an empty combobox value object
   * with an empty label and value.
   * @param a combobox value
   * @param b combobox value
   * @returns boolean indicating whether the values are meaningfully different.
   */
  private meaningfulComboboxValueChange(a: ComboboxValue, b: ComboboxValue): boolean {
    if (
      (a === null &&
        b &&
        (b.label === '' || b.label === null || b.label === undefined) &&
        (b.value === null || (Array.isArray(b.value) && b.value.length === 0))) ||
      (b === null &&
        a &&
        (a.label === '' || a.label === null || a.label === undefined) &&
        (a.value === null || (Array.isArray(a.value) && a.value.length === 0)))
    ) {
      return false;
    }
    return valuesDiffer(a, b);
  }

  private onChange = (_: any) => {};

  onTouched = (_: any) => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: ComboboxValue): void {
    const newValue = value;
    if (!this.meaningfulComboboxValueChange(newValue, this.value())) return;
    if (this.listbox()?.multiselect() && newValue?.value && !Array.isArray(newValue.value)) {
      // if multiselect, ensure value is an array
      newValue.value = [newValue.value];
    }
    this.value.set(newValue);
  }
}
