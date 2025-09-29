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
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  InputSignal,
  InputSignalWithTransform,
  OnInit,
  Signal,
  ViewEncapsulation,
  WritableSignal,
  afterNextRender,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  signal
} from '@angular/core';
import { ListboxDirective } from '../listbox/listbox.directive';
import { ListenerService } from '../listener-service/listener.service';
import { defaultEffectParam, END_KEY, ENTER_KEY, HOME_KEY, SPACE_KEY } from '../nova-lib.constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'v-listbox-item',
    role: 'option',

    '[attr.aria-disabled]': ' disabled() ? "true" : null',
    '[attr.aria-selected]': 'active()',
    '[attr.disabled]': 'null',
    '[attr.id]': 'id()',
    '[attr.value]': 'value()',
    '[class.v-listbox-item-highlighted]': 'highlighted()',

    '(click)': 'handleClick($event)',
    '(keydown)': 'handleKeyDown($event)',
    '(keyup)': 'handleKeyup($event)',
    '(blur)': 'listbox?.onTouched()'
  },
  providers: [ListenerService],
  selector: '[v-listbox-item] ',
  standalone: true,
  templateUrl: './listbox-item.component.html'
})
export class ListboxItemComponent implements OnInit {
  constructor() {
    afterNextRender({
      read: () => {
        this.label.set(this.el.nativeElement.innerText || this.el.nativeElement.textContent || null);
      }
    });
  }

  readonly ready: WritableSignal<boolean> = signal<boolean>(false);
  ngOnInit(): void {
    this.ready.set(true);
  }

  // keep track of own label

  public readonly el: ElementRef = inject(ElementRef);
  protected readonly listbox: ListboxDirective | null = inject(ListboxDirective, { optional: true });
  public readonly listenerService: ListenerService = inject(ListenerService);

  readonly multiselect: Signal<boolean> = computed(() => this.listbox?.multiselect() ?? false);
  readonly label: WritableSignal<string | null> = signal<string | null>(null);

  /**
   * Marks item as **intitally** selected when true. <br />
   * Use the listbox directive's <code>value</code> to update the active state of the items.
   * @default false
   */
  readonly activeInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'active',
    transform: booleanAttribute
  });
  private readonly initialActiveEffect = effect(() => {
    const isActive = this.activeInput();
    if (!isActive) return; // don't add to listbox value if not active
    if (this.multiselect()) {
      // multiselect, add value to array
      this.listbox?.value.update((value) => (Array.isArray(value) ? [...value, this.value()] : [this.value()]));
    } else {
      // single select, set value directly
      this.listbox?.value.set(this.value());
    }
  }, defaultEffectParam);

  // holds the active state of the item
  readonly active: Signal<boolean | null> = computed(() => {
    if (!this.ready()) return null; // wait for initial render
    const listboxValue = this.listbox?.value();
    const itemValue = this.value();
    if (Array.isArray(listboxValue) && this.multiselect()) {
      // multiselect, check if item value is in the listbox value array
      return listboxValue.includes(itemValue);
    }
    return listboxValue === itemValue;
  });

  /**
   * Emits event when host interactive element is clicked.
   */
  readonly clicked: EventEmitter<Event> = new EventEmitter<Event>();

  /**
   * Marks item as selected when true.
   * @default false
   */
  readonly disabledInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'disabled',
    transform: booleanAttribute
  });
  readonly disabledInternal: WritableSignal<boolean | null> = signal<boolean | null>(null); // used in listbox directive. Needed so there's no circular dependency between disableds.
  readonly disabled: Signal<boolean | null> = computed(
    () => this.disabledInput() ?? this.disabledInternal() ?? this.listbox?.disabled() ?? null
  );

  handleClick(event: Event): void {
    this.clicked.emit(event);

    // Directly call the combobox's handleListboxItemClick method if available
    if (this.listbox?.combobox) {
      this.listbox?.combobox?.handleListboxItemClick();
    }

    this.selectItem();
  }

  /**
   * Marks item as highlighted when true. Occurs natively with :focus-visible.
   * @default false
   * @builtin true
   */
  readonly highlighted: Signal<boolean | null> = computed(() =>
    // show highlight state when the item is highlighted and the listbox is focused
    // this 'focus' is typically the psuedo focus state from combobox
    this.value() === this.listbox?.highlightedItem()?.value() && this.listbox?.showFocus() ? true : false
  );

  /**
   * Sets custom id.
   * @default 'v-listbox-item-<value>'
   * @builtin true
   */
  readonly idInput: InputSignal<string | null> = input<string | null>(null, {
    alias: 'id'
  });
  readonly id: Signal<string> = computed(() => this.idInput() ?? 'v-listbox-item-' + this.value());

  /**
   * Value of listbox item. <br />
   * A value <strong>must</strong> be present on every list item if it does not have a child radio or checkbox.
   */
  readonly value: InputSignal<string | number> = input.required<string | number>();

  handleKeyup(event: KeyboardEvent): void {
    // look for enter or space key to select item, but not if shift is pressed in tandem
    if ((event.key === ENTER_KEY || event.key === SPACE_KEY) && !event.shiftKey) {
      this.selectItem();
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === ENTER_KEY || event.key === SPACE_KEY || event.key === HOME_KEY || event.key === END_KEY) {
      event.preventDefault(); // prevent scrolling
    }
  }

  selectItem(newState?: boolean): void {
    if (!this.listbox || this.disabled()) return;

    const multiselect = this.multiselect();
    const itemValue = this.value();
    const listboxValue = this.listbox.value();

    if (multiselect) {
      // Ensure listboxValue is an array
      const values: Array<string | number> = Array.isArray(listboxValue)
        ? [...listboxValue]
        : listboxValue
          ? [listboxValue]
          : [];
      const index = values.indexOf(itemValue);
      const exists = index !== -1;

      // Determine if item should be in the array
      const shouldInclude = newState === undefined ? !exists : newState;

      // Add or remove item based on shouldInclude
      if (shouldInclude && !exists) {
        values.push(itemValue);
      } else if (!shouldInclude && exists) {
        values.splice(index, 1);
      }

      this.listbox.value.set(values);
    } else {
      // For single select, set to itemValue or null based on newState
      this.listbox.value.set(newState === false ? null : itemValue);
    }
  }
}
