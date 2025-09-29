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
  Signal,
  WritableSignal,
  afterNextRender,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  numberAttribute,
  signal
} from '@angular/core';
import { BadgeDirective } from '../badge/badge.directive';
import { ComboboxDirective } from '../combobox/combobox.directive';
import { IconToggleComponent } from '../icon-toggle/icon-toggle.component';
import { IconToggleDirective } from '../icon-toggle/icon-toggle.directive';
import { InputContainerComponent } from '../input-container/input-container.component';
import { ListenerService } from '../listener-service/listener.service';
import { TabItemDirective } from '../tab-item/tab-item.directive';
import { ToggleContainerDirective } from '../toggle-container/toggle-container.directive';
import { ButtonColor, ButtonSize } from './button.constants';

@Directive({
  host: {
    class: 'v-button',
    type: 'button',

    '[attr.aria-current]': '!ariaSelected() ? ariaCurrent() : null',
    '[attr.aria-describedby]': 'ariaDescribedby()',
    '[attr.aria-disabled]': 'ariaDisabled()',
    '[attr.aria-expanded]': 'ariaExpanded()',
    '[attr.aria-haspopup]': 'ariaHaspopup()',
    '[attr.aria-selected]': '!ariaCurrent() ? ariaSelected() : null',
    '[attr.disabled]': 'disabled() ? "disabled" : null',
    '[attr.role]': 'role()',
    '[attr.tabindex]': 'tabindex()',
    '[class.v-button-destructive]': 'destructive()',
    '[class.v-button-icon]': 'buttonIcon()',
    '[class.v-button-large]': 'buttonSize() === "large"',
    '[class.v-button-secondary]': 'buttonColor() === "secondary"',
    '[class.v-button-small]': 'buttonSize() === "small"',
    '[class.v-button-stacked]': 'buttonStacked()',
    '[class.v-button-subtle]': 'subtle()',
    '[class.v-button-tertiary]': 'buttonColor() === "tertiary"',

    '(blur)': 'blurred.emit($event)',
    '(click)': 'clicked.emit($event)'
  },
  providers: [ListenerService],
  selector: '[v-button], [v-button-icon], [v-button-stacked], [v-panel-toggle]',
  standalone: true
})
export class ButtonDirective {
  constructor() {
    afterNextRender({
      read: () => {
        this.tagName.set(this.el.nativeElement.tagName.toLowerCase());
      }
    });
  }
  public readonly el: ElementRef = inject(ElementRef);
  public readonly listenerService: ListenerService = inject(ListenerService);

  // possible parents
  private readonly combobox: ComboboxDirective | null = inject(ComboboxDirective, { optional: true, host: true });
  private readonly toggleContainer: ToggleContainerDirective | null = inject(ToggleContainerDirective, {
    optional: true,
    host: true
  });
  private readonly inputContainer: InputContainerComponent | null = inject(InputContainerComponent, { optional: true });
  private readonly tabItem: TabItemDirective | null = inject(TabItemDirective, { optional: true });
  private readonly tagName: WritableSignal<string> = signal<string>('');
  protected readonly isLink: Signal<boolean> = computed(() => this.tagName() === 'a');
  protected readonly isSummary: Signal<boolean> = computed(() => this.tagName() === 'summary');

  private noTabRole: Signal<boolean | null> = computed<boolean | null>(() => {
    if (this.tabItem?.trigger() || this.tabItem?.disclosureTab() || this.tabItem?.sectionTitle()) {
      return true; // no tab role
    }
    return false;
  });

  // possible children
  private readonly badge: Signal<BadgeDirective | undefined> = contentChild(BadgeDirective);
  public readonly toggleIcon: Signal<IconToggleDirective | undefined> = contentChild(IconToggleDirective); // Needed for Accordion
  public readonly toggleIconComponent: Signal<IconToggleComponent | undefined> = contentChild(IconToggleComponent); // Needed for Accordion

  /**
   * Aria attribute relaying whether button is selected. <br />
   * <code>aria-current</code> and <code>aria-selected</code> cannot be used together.
   * @default null
   * @builtin true
   */
  readonly ariaCurrentInput: InputSignalWithTransform<HTMLButtonElement['ariaCurrent'] | boolean, unknown> = input<
    HTMLButtonElement['ariaCurrent'] | boolean,
    unknown
  >(null, {
    alias: 'aria-current',
    transform: (v) => {
      if (v === 'page') return 'page';
      return booleanAttribute(v);
    }
  });
  protected readonly ariaCurrent: Signal<string | boolean | null> = computed(
    () =>
      this.ariaCurrentInput() ?? // aria-current is used for navigational or nested tabs
      ((this.tabItem?.tabList?.tabListParent || this.tabItem?.tabList?.navParent) && !this.noTabRole()
        ? this.tabItem?.active()
        : null) ??
      null
  );

  /**
   * Aria attribute pointing to id of descriptive element. <br />
   * If the button has a badge, the <code>aria-describedby</code> will be set to the badge's id by default.
   * @default false
   */
  readonly ariaDescribedbyInput: InputSignal<string | null> = input<null | string>(null, { alias: 'aria-describedby' });
  protected readonly ariaDescribedby: Signal<string | undefined> = computed(
    () => this.ariaDescribedbyInput() ?? this.badge()?.id()
  );

  /**
   * Sets aria disabled state for accessibility purposes. <br />
   * When true, indicates that the button is disabled and not interactive.
   * @default false
   */
  readonly ariaDisabledInput: InputSignal<HTMLElement['ariaDisabled']> = input<HTMLElement['ariaDisabled']>(null, {
    alias: 'aria-disabled'
  });
  readonly ariaDisabled: Signal<HTMLElement['ariaDisabled']> = computed<HTMLElement['ariaDisabled']>(
    () => this.ariaDisabledInput() ?? ((this.isLink() || this.isSummary()) && this.disabled() ? 'true' : null)
  );

  /**
   * Aria attribute relaying whether button is expanded.
   * @default null
   * @builtin true
   */
  readonly ariaExpandedInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'aria-expanded',
    transform: booleanAttribute
  });
  readonly ariaExpandedInternal: WritableSignal<boolean | null> = signal<boolean | null>(null); // used in panel and disclosure tab
  readonly ariaExpanded: Signal<boolean | null> = computed(
    () =>
      // if aria-expanded is set, use that
      this.ariaExpandedInput() ??
      this.ariaExpandedInternal() ??
      // else
      null
  );

  /**
   * Sets button to combobox toggle button when true.
   * @default false
   * @default true when button is used within combobox and no custom value is given.
   * @builtin true
   */
  readonly ariaHaspopupInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'aria-haspopup',
    transform: booleanAttribute
  });
  protected readonly ariaHaspopup: Signal<string | null> = computed(() => {
    return (
      this.ariaHaspopupInput()?.toString() ??
      (this.combobox && (this.toggleIcon() || this.toggleIconComponent()) ? 'true' : null)
    );
  });

  /**
   * Aria attribute relaying whether button is selected. <br />
   * <code>aria-current</code> and <code>aria-selected</code> cannot be used together.
   * @default null
   * @builtin true
   */
  readonly ariaSelectedInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'aria-selected',
    transform: booleanAttribute
  });
  readonly ariaSelected: Signal<boolean | string | null> = computed(
    () =>
      this.ariaSelectedInput() ??
      // aria-selected is used for tabs
      (!this.tabItem?.tabList?.tabListParent && !this.noTabRole() ? this.tabItem?.active() : null) ??
      null
  );

  /**
   * Sets button size.
   * @default 'medium' / ButtonSize.MEDIUM
   * @options 'small' | ButtonSize.SMALL | <br> 'medium' | ButtonSize.MEDIUM | <br> 'large' | ButtonSize.LARGE
   */
  readonly buttonSizeInput: InputSignal<ButtonSize | null> = input<ButtonSize | null>(null, { alias: 'buttonSize' });
  readonly buttonSizeInternal: WritableSignal<ButtonSize | null> = signal<ButtonSize | null>(null); // used in accordion heading
  protected readonly buttonSize: Signal<ButtonSize> = computed(
    () =>
      this.buttonSizeInput() ??
      this.buttonSizeInternal() ??
      (this.tabItem?.tabList?.vertical() ? ButtonSize.MEDIUM : null) ??
      (!this.tabItem || this.tabItem?.stackedButton() ? null : ButtonSize.LARGE) ??
      ButtonSize.MEDIUM
  );

  /**
   * Sets button color scheme.
   * @default 'primary' / ButtonColor.PRIMARY
   * @options 'primary' | ButtonSize.PRIMARY | <br> 'secondary' | ButtonSize.SECONDARY | <br> 'tertiary' | ButtonSize.TERTIARY
   */
  readonly buttonColorInput: InputSignal<ButtonColor | null> = input<ButtonColor | null>(null, {
    alias: 'buttonColor'
  });
  readonly buttonColorInternal: WritableSignal<ButtonColor | null> = signal<ButtonColor | null>(null); // used in accordion heading
  protected readonly buttonColor: Signal<ButtonColor> = computed<ButtonColor>(
    () =>
      this.buttonColorInput() ?? // prevents parent component from overriding if buttonColor if buttonColor is given directly by user
      this.buttonColorInternal() ??
      (this.tabItem ? ButtonColor.TERTIARY : null) ??
      ButtonColor.PRIMARY
  );

  readonly buttonIcon: InputSignalWithTransform<boolean, unknown> = input(false, {
    alias: 'v-button-icon',
    transform: booleanAttribute
  });

  readonly buttonStacked: InputSignalWithTransform<boolean, unknown> = input(false, {
    alias: 'v-button-stacked',
    transform: booleanAttribute
  });

  /**
   * Sets button to destructive variant when true.
   * @default false
   */
  readonly destructive: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Disables button when true.
   * @default false
   */
  readonly disabledInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'disabled',
    transform: booleanAttribute
  });
  readonly disabled: Signal<boolean | null> = computed<boolean | null>(
    () =>
      this.disabledInput() ?? this.toggleContainer?.disabled() ?? this.inputContainer?.childButtonsDisabled() ?? null
  );

  /**
   * Sets role of button. <br />
   * If no custom role is given, role may be set by a parent component (nav, tabs, etc.).
   * @builtin true
   */
  readonly roleInput: InputSignal<HTMLElement['role']> = input<HTMLElement['role']>(null, { alias: 'role' });
  readonly role: Signal<HTMLElement['role']> = computed<HTMLElement['role']>(
    () =>
      this.roleInput() ??
      (this.isLink() && this.disabled() ? 'link' : null) ??
      (!this.tabItem?.tabList || this.tabItem?.tabList?.tabListParent || this.tabItem?.tabList?.navParent
        ? null
        : 'tab')
  ); // prevents parent component from overriding if role is given directly by user

  /**
   * Sets button to subtle variant when true.
   * @default false
   */
  readonly subtle: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets button's tabIndex.
   * @default null
   * @default -1 when button is used within combobox and no custom value is given.
   * @builtin true
   */
  readonly tabindexInput: InputSignalWithTransform<number | null, unknown> = input<null | number, unknown>(null, {
    alias: 'tabindex',
    transform: numberAttribute
  });
  protected readonly tabindex: Signal<string | number | null> = computed<number | null | string>(
    () =>
      this.tabindexInput() ??
      ((this.combobox && (this.toggleIcon() || this.toggleIconComponent())) || this.ariaDisabled() ? '-1' : null)
  );

  /**
   * Emits event when host interactive element is blurred.
   */
  readonly blurred: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  /**
   * Emits event when host interactive element is clicked.
   */
  readonly clicked: EventEmitter<Event> = new EventEmitter<Event>();
}
