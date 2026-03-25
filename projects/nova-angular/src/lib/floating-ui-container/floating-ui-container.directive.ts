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
  Directive,
  ElementRef,
  InputSignal,
  InputSignalWithTransform,
  OutputEmitterRef,
  Renderer2,
  Signal,
  WritableSignal,
  booleanAttribute,
  computed,
  contentChild,
  contentChildren,
  effect,
  forwardRef,
  inject,
  input,
  output,
  signal
} from '@angular/core';
import { Middleware } from '@floating-ui/dom';
import { ButtonDirective } from '../button/button.directive';
import { DropdownItemDirective } from '../dropdown-item/dropdown-item.directive';
import { DropdownMenuDirective } from '../dropdown-menu/dropdown-menu.directive';
import { FloatingUIElementDirective } from '../floating-ui-element/floating-ui-element.directive';
import { FloatingUITriggerDirective } from '../floating-ui-trigger/floating-ui-trigger.directive';
import {
  FloatingUIPlacements,
  FloatingUIVisibility,
  UIEventVisibilityPair
} from '../floating-ui/floating-ui.constants';
import { FloatingUIService } from '../floating-ui/floating-ui.service';
import { IconToggleComponent } from '../icon-toggle/icon-toggle.component';
import { IconToggleDirective } from '../icon-toggle/icon-toggle.directive';
import { IdGenerator } from '../id-generator/id-generator.service';
import { ListboxItemComponent } from '../listbox-item/listbox-item.component';
import { ListboxDirective } from '../listbox/listbox.directive';
import { TooltipDirective } from '../tooltip/tooltip.directive';
import { TabItemDirective } from '../tab-item/tab-item.directive';
import { Unsubscribable } from '../types';
import { AccordionHeadingDirective } from '../accordion-heading/accordion-heading.directive';

@Directive({
  host: {
    style: '--v-dropdown-menu-surface-margin-block-start: 0;', // this is an angular-specific override. Spacing between dropdown-menu and button/trigger, is handled within floating-ui.service

    '(document:keydown)': 'tab($event)',
    '(focusout)': 'focusout($event)'
  },
  providers: [FloatingUIService],
  selector: '[v-floating-ui-container]',
  standalone: true
})
export class FloatingUIContainer implements AfterContentInit {
  // service injection
  private readonly idGenerator: IdGenerator = inject(IdGenerator);
  private readonly renderer: Renderer2 = inject(Renderer2);
  public readonly floatingUIService: FloatingUIService = inject(FloatingUIService);

  // element injection
  private readonly el: ElementRef = inject(ElementRef);

  /**
   * we need to find child containers so we can SKIP setting up any of their children
   * We want to set up any toggle buttons, tooltips, menus, etc in this current container
   * but not in any child containers
   */
  private readonly containers: Signal<readonly FloatingUIContainer[]> = contentChildren(FloatingUIContainer, {
    descendants: true
  });

  /**
   * Gather accordions so we can SKIP setting up any of their children as toggle icons
   */
  private readonly accordions: Signal<readonly AccordionHeadingDirective[]> = contentChildren(
    AccordionHeadingDirective,
    {
      descendants: true
    }
  );

  // gather the children!
  // we specifically need the toggle button (buttons with toggleIcon or toggleIconComponent)
  private readonly buttons: Signal<readonly ButtonDirective[]> = contentChildren(
    forwardRef(() => ButtonDirective),
    {
      descendants: true
    }
  );
  // the following are all possible floating UI elements
  private readonly genericFloatingUIComponent: Signal<FloatingUIElementDirective | undefined> =
    contentChild(FloatingUIElementDirective);
  private readonly listbox: Signal<ListboxDirective | undefined> = contentChild(forwardRef(() => ListboxDirective));
  private readonly menu: Signal<DropdownMenuDirective | undefined> = contentChild(
    forwardRef(() => DropdownMenuDirective)
  );
  private readonly tooltip: Signal<TooltipDirective | undefined> = contentChild(forwardRef(() => TooltipDirective));

  // floating UI trigger
  private readonly triggers: Signal<readonly FloatingUITriggerDirective[] | undefined> = contentChildren(
    forwardRef(() => FloatingUITriggerDirective),
    { descendants: true }
  );
  private readonly dropdownItems: Signal<readonly DropdownItemDirective[]> = contentChildren(
    forwardRef(() => DropdownItemDirective),
    {
      descendants: true
    }
  );
  private readonly tabItems: Signal<readonly TabItemDirective[]> = contentChildren(
    forwardRef(() => TabItemDirective),
    {
      descendants: true
    }
  );
  private readonly toggleIconComponent: Signal<IconToggleComponent | undefined> = contentChild(
    forwardRef(() => IconToggleComponent),
    {
      descendants: true
    }
  );
  private readonly toggleIconDirective: Signal<IconToggleDirective | undefined> = contentChild(
    forwardRef(() => IconToggleDirective),
    {
      descendants: true
    }
  );

  private prevButtons: ButtonDirective[] = [];
  private prevDropdownItems: DropdownItemDirective[] = [];
  private prevListItems: ListboxItemComponent[] = [];
  private prevTabItems: TabItemDirective[] = [];
  private prevTrigger: FloatingUITriggerDirective | null = null;
  private childrenClickSubscriptions: (Unsubscribable | undefined)[] = [];

  /**
   * Dropdown items that are direct children of this container (not nested in child containers).
   */
  private readonly ownDropdownItems: Signal<readonly DropdownItemDirective[]> = computed(() =>
    this.dropdownItems().filter(
      (item) => !this.containers().some((container) => container.dropdownItems().includes(item))
    )
  );

  /**
   * Listbox items that are direct children of this container (not nested in child containers).
   */
  private readonly ownListItems: Signal<readonly ListboxItemComponent[]> = computed(() =>
    (this.listbox()?.listItems() || []).filter(
      (item) => !this.containers().some((container) => (container.listbox()?.listItems() || []).includes(item))
    )
  );

  /**
   * Tab items that are direct children of this container (not nested in child containers).
   */
  private readonly ownTabItems: Signal<readonly TabItemDirective[]> = computed(() =>
    this.tabItems().filter(
      (item) =>
        item.disclosureTab() && !this.containers().some((container) => (container.ownTabItems() || []).includes(item))
    )
  );
  // if children re-render, re-set up close on click
  private childrenEffect = effect(() => {
    const buttons = this.buttons();
    const listItems = this.ownListItems();
    const dropdownItems = this.ownDropdownItems();
    const tabItems = this.ownTabItems();
    const trigger = this.floatingUITrigger();

    // check if the buttons have changed
    if (
      buttons === this.prevButtons &&
      listItems === this.prevListItems &&
      dropdownItems === this.prevDropdownItems &&
      tabItems === this.prevTabItems &&
      this.prevTrigger === trigger
    )
      return;
    this.prevButtons = buttons as ButtonDirective[];
    this.prevListItems = listItems as ListboxItemComponent[];
    this.prevDropdownItems = dropdownItems as DropdownItemDirective[];
    this.prevTabItems = tabItems as TabItemDirective[];
    this.prevTrigger = trigger;
    this.autoCloseOnItemClick();
  });

  // store pieces of information about the floating UI
  private readonly floatingElement: WritableSignal<
    FloatingUIElementDirective | DropdownMenuDirective | TooltipDirective | null
  > = signal(null);
  private readonly floatingUITrigger: WritableSignal<FloatingUITriggerDirective | null> = signal(null);
  private readonly floatingUIToggleIcon: WritableSignal<IconToggleComponent | IconToggleDirective | null> =
    signal(null);
  public readonly floatingElementID: Signal<string | null> = computed(
    () => this.floatingElement()?.id() ?? this.idGenerator.newId('v-floating-ui-element')
  );
  public readonly triggersDropdownMenu: WritableSignal<boolean> = signal(false);
  public readonly triggersTooltip: WritableSignal<boolean> = signal(false);
  public readonly isCombobox: WritableSignal<boolean> = signal(false);
  private readonly floatingUIToggleButton: Signal<ButtonDirective | null> = computed(
    () =>
      this.buttons()?.find(
        (button) =>
          (button.toggleIcon() || button.toggleIconComponent()) &&
          !this.containers().some((container) => container.buttons().includes(button))
      ) || null
  );

  // default events differ per component
  private tooltipDefaultEvents: UIEventVisibilityPair = [
    [new UIEvent('mouseenter'), FloatingUIVisibility.SHOW],
    [new UIEvent('mouseleave'), FloatingUIVisibility.HIDE],
    [new UIEvent('focus'), FloatingUIVisibility.SHOW],
    [new UIEvent('blur'), FloatingUIVisibility.HIDE]
  ];
  private dropdownMenuDefaultEvents: UIEventVisibilityPair = [[new UIEvent('click')]];

  /** @ignore */
  public readonly isShown: Signal<boolean | null> = computed(() => this.floatingUIService?.isShown());
  private isShownEffect = effect(() => {
    const isShown = this.isShown();
    if (isShown === undefined || isShown === null) return;
    this.floatingUIToggled.emit(isShown);
    this.floatingUIToggleIcon()?.rotatedInternal.set(isShown);
    this.floatingUITrigger()?.isShown.set(isShown);
  });
  /**
   * Placement of floating content relevant to triggering element.
   * @default FloatingUIPlacements.BOTTOM_START
   * @see 'FloatingUIPlacements'.
   */
  readonly placement: InputSignal<FloatingUIPlacements> = input<FloatingUIPlacements>(
    FloatingUIPlacements.BOTTOM_START
  );
  readonly placementEffect = effect(() => {
    const placement = this.placement();
    if (!placement) return;
    this.floatingUIService.customizeFloatingUI(placement, null, null, null);
  });

  /**
   * Middleware for FloatingUIService.
   * @default [ offset(2), flip(), shift() ] for tooltip <br />
   * @default [ offset(0), flip(), shift() ] for combobox <br />
   * @see [Floating UI](https://floating-ui.com/docs/middleware) for options.
   */
  readonly middlewareInput: InputSignal<Middleware[] | null> = input<Middleware[] | null>(null, {
    alias: 'middleware'
  });
  private readonly middleware: Signal<Middleware[] | null> = computed(
    () => this.middlewareInput() ?? (this.isCombobox() ? this.floatingUIService?.comboboxMiddleware : null)
  );
  private middlewareEffect = effect(() => {
    const middleware = this.middleware();
    if (!middleware || middleware.length === 0) return;
    this.floatingUIService.customizeFloatingUI(null, middleware, null, null);
  });

  /**
   * Events array for FloatingUIService. <br />
   * This array specifies whether to show or hide the floating element on a given UIEvent. <br />
   * This should be an array of [UIEvent, FloatingUIVisibility].
   * @default [ [new UIEvent('mouseenter'), FloatingUIVisibility.SHOW], <br /> [new UIEvent('mouseleave'), FloatingUIVisibility.HIDE], <br /> [new UIEvent('focus'), FloatingUIVisibility.SHOW], <br /> [new UIEvent('blur'), FloatingUIVisibility.HIDE] <br />] for tooltip
   * @default [ [new UIEvent('click')] ] for dropdown-menu and floating-ui-element
   * @default [] Ie. events are removed for combobox.
   */
  readonly eventsArrayInput: InputSignal<UIEventVisibilityPair | null> = input<UIEventVisibilityPair | null>(null, {
    alias: 'eventsArray'
  });
  private readonly eventsArrayInternal: WritableSignal<UIEventVisibilityPair | null> =
    signal<UIEventVisibilityPair | null>(null);
  private readonly eventsArray: Signal<UIEventVisibilityPair | null> = computed(
    () => this.eventsArrayInput() ?? (this.isCombobox() ? [] : null) ?? this.eventsArrayInternal()
  );

  /**
   * Closes the menu on item click/select when true. <br>
   * If <code>multiselect</code> is set to <code>true</code>, it will not take effect.<br>
   * @default true
   */
  readonly closeOnClick: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(true, {
    transform: booleanAttribute
  });

  /**
   * Emits whether or not the floating UI element is visible.
   */
  readonly floatingUIToggled: OutputEmitterRef<boolean> = output<boolean>();

  private tabPressed: boolean = false;
  tab(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      // used in focusout function
      this.tabPressed = true;
    }
  }

  focusout(event: FocusEvent): void {
    if (!this.tabPressed) return;
    this.tabPressed = false;
    // if focus out is a result of tabbing out of this component, hide the floating UI
    // (keep the ui visible if focus out is a result of tabbing into another element within this component)
    if (!event.relatedTarget || this.el.nativeElement.contains(event.relatedTarget)) return;
    this.floatingUIService.hidefloatingUI();
  }

  ngAfterContentInit(): void {
    // set up the items, methods will return if the item does not exist or is in a child container
    this.setUpTooltip();
    this.setUpMenu();
    this.setUpGenericFloatingUIComponent();
    this.setUpTrigger();
    this.setUpToggleIcon();

    // if the tooltip arrow exists and a valid, visual display is set, use that display
    // otherwise (if the tooltip arrow exists), use block
    // if the tooltip arrow does not exist, use the default display
    const display = this.tooltip()?.arrow()
      ? this.tooltip()?.display() !== 'none'
        ? this.tooltip()?.display()
        : 'block'
      : undefined;
    this.floatingUIService.customizeFloatingUI(this.placement(), this.middleware(), display, this.tooltip()?.arrow());

    const floatingUITriggerElementRef = this.floatingUITrigger()?.el;
    const floatingUIElementRef = this.floatingElement()?.el;
    if (floatingUITriggerElementRef && floatingUIElementRef) {
      this.floatingUIService.setUpfloatingUI(floatingUITriggerElementRef, floatingUIElementRef, this.eventsArray());
    }
  }

  private setUpTooltip(): void {
    const tooltip = this.tooltip();
    // if the tooltip doesn't exist or is in a child container, we don't want to set it up
    if (!tooltip || this.containers().some((container) => container.tooltip() === tooltip)) return;
    // if the tooltip is in this container, we want to set it up
    this.triggersTooltip.set(true);
    this.floatingUISetup(tooltip, this.tooltipDefaultEvents);
  }

  private setUpMenu(): void {
    const menu = this.menu();
    // if the menu doesn't exist or is in a child container, we don't want to set it up
    if (!menu || this.containers().some((container) => container.menu() === menu)) return;
    // if the menu is in this container, we want to set it up
    this.triggersDropdownMenu.set(true);
    this.floatingUISetup(menu, this.dropdownMenuDefaultEvents, 'absolute');
  }

  private setUpGenericFloatingUIComponent(): void {
    const genericFloatingUIComponent = this.genericFloatingUIComponent();
    // if the genericFloatingUIComponent doesn't exist or is in a child container, we don't want to set it up
    if (
      !genericFloatingUIComponent ||
      this.containers().some((container) => container.genericFloatingUIComponent() === genericFloatingUIComponent)
    )
      return;
    // if the genericFloatingUIComponent is in this container, we want to set it up
    this.triggersDropdownMenu.set(true);
    this.floatingUISetup(genericFloatingUIComponent, this.dropdownMenuDefaultEvents, 'absolute');
  }

  private floatingUISetup(
    component: FloatingUIElementDirective | DropdownMenuDirective | TooltipDirective,
    events: UIEventVisibilityPair,
    position?: string
  ): void {
    this.floatingElement.set(component);
    this.floatingElement()?.idInternal.set(this.floatingElementID());
    if (position) this.renderer.setStyle(component.el.nativeElement, 'position', position || 'absolute');
    this.eventsArrayInternal.set(events);
  }

  private setUpTrigger(): void {
    const triggers = this.triggers();
    if (!triggers || triggers?.length === 0) return;
    const triggerElem =
      triggers.find((trigger) => !this.containers().some((container) => container.triggers()?.includes(trigger))) ||
      null;
    // if the trigger is in this container, we want to set it up
    this.floatingUITrigger.set(triggerElem);
  }

  private setUpToggleIcon(): void {
    // this must be done here rather than computed in child components because we need to know if the trigger is in a child container
    const toggleIcon = this.toggleIconComponent() || this.toggleIconDirective();
    // if the toggleIcon doesn't exist is in a child container, we don't want to set it up
    if (
      !toggleIcon ||
      this.containers().some((container) => container.floatingUIToggleIcon() === toggleIcon) ||
      // if the toggleIcon is part of a button in a child accordion-heading, we don't want to set it up
      this.accordions().some(
        (accordion) =>
          accordion.hostButton?.toggleIcon() === toggleIcon ||
          accordion.hostButton?.toggleIconComponent() === toggleIcon
      )
    )
      return;
    // if the toggleIcon is in this container, we want to set it up
    this.floatingUIToggleIcon.set(toggleIcon);
  }

  private autoCloseOnItemClick(): void {
    const isMultiSelect = this.listbox()?.multiselect();

    // don't set up the close on click if we are in a multiselect listbox or user has set closeOnClick to false
    if (!this.closeOnClick() || isMultiSelect) return;

    // clean up previous subscriptions
    this.childrenClickSubscriptions?.forEach((subscription) => subscription?.unsubscribe());
    this.childrenClickSubscriptions = [];

    const ownTabItemButtons: ButtonDirective[] = this.ownTabItems()
      .map((tabItem) => tabItem.button())
      .filter((button): button is ButtonDirective => !!button);

    const nonToggleButtons = this.buttons().filter(
      (button) =>
        button !== this.floatingUIToggleButton() &&
        button !== this.floatingUITrigger()?.button &&
        !ownTabItemButtons.includes(button) &&
        !this.containers().some((container) => container?.el?.nativeElement?.contains(button?.el?.nativeElement))
    );

    const clickableChildren = [...this.ownDropdownItems(), ...nonToggleButtons, ...this.ownListItems()];
    clickableChildren.forEach((child) => {
      // don't call for the floating UI trigger, duplicating check for safety
      if (child.el.nativeElement === this.floatingUITrigger()?.el?.nativeElement) return;

      this.childrenClickSubscriptions.push(
        child.clicked.subscribe(() => {
          if (child.disabled()) return;
          this.floatingUIService.hidefloatingUI();
          // when a child is clicked and the floating UI is closed, restore focus to the trigger
          this.floatingUIService.restoreFocus();
        })
      );
    });
  }

  ngOnDestroy(): void {
    this.floatingUIService?.cleanupListeners();
  }
}
