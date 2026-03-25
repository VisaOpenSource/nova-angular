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
  effect,
  ElementRef,
  EventEmitter,
  inject,
  Injectable,
  isDevMode,
  Renderer2,
  RendererFactory2,
  signal,
  WritableSignal
} from '@angular/core';
import { arrow, autoUpdate, computePosition, ComputePositionReturn, flip, offset, shift, hide } from '@floating-ui/dom';
import { TooltipArrowDirective } from '../arrow/arrow.directive';
import { FloatingUIPlacements, FloatingUIVisibility, UIEventVisibilityPair } from './floating-ui.constants';

/**
 * This internal service is used by Combobox, Dropdown Menu, and Tooltip components. <br />
 * It can be used with generic FloatingUIContainer, FloatingUIElementDirective, and FloatingUITriggerDirective to create your own custom floating-ui. <br />
 * If you are using any of the components mentioned, you will typically not need to use this service directly. <br />
 * Derived from [Floating UI documentation](https://floating-ui.com/).
 */
@Injectable({
  providedIn: 'root'
})
export class FloatingUIService {
  /** @ignore */
  private readonly rendererFactory: RendererFactory2 = inject(RendererFactory2);
  /** @ignore */
  private renderer: Renderer2 = this.rendererFactory.createRenderer(null, null);

  /** @ignore */
  private trigger?: Element;
  /** @ignore */
  private floatingUI?: ElementRef;
  /** @ignore */
  private arrow?: TooltipArrowDirective;
  /** @ignore */
  private offset: number = 0;
  /** @ignore */
  private offsetDefault: number = 2;
  /** @ignore */
  public comboboxMiddleware: any = [offset(0), flip(), shift(), hide()];
  /** @ignore */
  private middlewareDefault: any = [offset(this.offsetDefault), flip(), shift(), hide()];
  /** @ignore */
  private middleware: any = this.middlewareDefault;
  /** @ignore */
  private placement: FloatingUIPlacements = FloatingUIPlacements.BOTTOM;
  /** @ignore */
  public isShown: WritableSignal<boolean> = signal(false);
  private readonly isShownEffect = effect(() => {
    const isShown = this.isShown();
    this.isShownEmitter.emit(isShown);
    if (!isShown && this.floatingUI) return this.renderer.setStyle(this.floatingUI.nativeElement, 'display', 'none');
    const triggerDisabled = this.trigger?.getAttribute('disabled');
    // only show the floating UI if the trigger and element exist, menu is set to shown, and trigger is not disabled
    if (!this.trigger || !this.floatingUI || !isShown || triggerDisabled) return;
    this.positionFloatingUI();
    this.renderer.setStyle(this.floatingUI.nativeElement, 'display', this.display);
  });

  /**
   * Displays property of the floating UI element.
   * @default 'flex'
   */
  private display: string = 'flex';

  /**
   * Time in milliseconds to wait before hiding the floating UI element when the trigger is hovered over.
   * @default A factor of the offset middleware option if provided, otherwise 50.
   */
  private hideOnHoverTimeout: number = 0;

  // store unlisten functions
  private rendererListeners: (() => void)[] = [];

  /**
   * Emits true when this floating UI element is shown and false when hidden.
   */
  readonly isShownEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * The setUpFloatingUI method is required to initialize the floating element and its trigger. <br />
   * Called by default with FloatingUIContainer or ComboboxDirective.
   * @param referenceEl References element that will trigger floating UI.
   * @param floatingEl References floating UI element.
   * @param eventArray Array of events for the reference/trigger element to listen for. <br> i.e. <code>[new UIEvent('focus'), FloatingUIVisibility.SHOW]</code> <br> tells the element to show the floating UI when the triggering element is focused.
   */
  public setUpfloatingUI(
    referenceEl: ElementRef | HTMLElement,
    floatingEl: ElementRef,
    eventArray: UIEventVisibilityPair | null
  ): void {
    this.rendererListeners?.forEach((unlisten) => unlisten());
    this.rendererListeners = [];
    this.trigger = this.nativeElement(referenceEl);
    this.floatingUI = floatingEl;
    if (!this.trigger && isDevMode()) return console.error('Floating UI trigger element is not defined.');
    if (!this.floatingUI && isDevMode()) return console.error('Floating UI element is not defined.');

    this.renderer.setStyle(this.floatingUI.nativeElement, 'top', '0');
    this.renderer.setStyle(this.floatingUI.nativeElement, 'left', '0');
    this.renderer.setStyle(this.floatingUI.nativeElement, 'display', 'none');

    if (eventArray) {
      this.setUpTrigger(eventArray);
    } else if (isDevMode()) {
      console.error('No events provided to trigger the Floating UI.');
    }
  }

  /**
   * The nativeElement method returns the Element type of the reference element.
   * @param element Element to be converted to Element type.
   * @returns Element
   */
  private nativeElement(element: ElementRef<any> | HTMLElement): Element {
    if (element instanceof ElementRef) {
      return element.nativeElement;
    }
    return element;
  }

  /**
   * The customizeFloatingUI method allows you to provide custom placement and middleware options to the Floating UI service.
   * @param placement Optional. See <code>FloatingUIPlacements</code> enum.
   * @param middleware Optional. Visit the official Floating UI documentation for more on [middleware options](https://floating-ui.com/docs/computePosition#middleware).
   * @param display Optional. Sets CSS display property for the floating UI element.
   * @param tooltipArrow Optional. Directive reference to the arrow element. See TooltipArrowDirective.
   */
  public customizeFloatingUI(
    placement?: FloatingUIPlacements | null,
    middleware?: any | null,
    display?: string | null,
    tooltipArrow?: TooltipArrowDirective | null
  ): void {
    // custom placement
    if (placement) this.placement = placement;

    // custom middleware
    if (middleware) {
      this.middleware = middleware;
      // save a custom offset
      const customOffset = (this.middleware.find((m: any) => m['name'] === 'offset') as any) || 2;
      this.offset = customOffset.options;
    }

    // custom display
    if (display) this.display = display;

    // custom arrow
    if (!tooltipArrow) return;
    this.arrow = tooltipArrow;
    // update the offset to factor in the arrow size if no custom offset was placed
    const floatingOffset = Math.ceil(Math.sqrt(2 * this.arrow.customSize() ** 2) / 2);
    this.offset = this.offset ? floatingOffset + this.offset : floatingOffset + this.offsetDefault;
    this.middleware.push(arrow({ element: this.arrow.el.nativeElement }));
    const offsetIndex = this.middleware.findIndex((func: any) => func.name === 'offset');

    // If no old offset function is found, just add the new one
    if (offsetIndex === -1) {
      this.middleware = [...this.middleware, offset(this.offset)];
      return;
    }
    // Replace the old offset function with the new one
    this.middleware = [
      ...this.middleware.slice(0, offsetIndex),
      offset(this.offset),
      ...this.middleware.slice(offsetIndex + 1)
    ];
  }

  /**
   * The positionFloatingUI method positions the Floating UI based on the given placement and middleware. <br />
   * For more details on the internal function, refer to Floating UI's [compute position documentation](https://floating-ui.com/docs/computePosition).
   * @param trigger The triggering element.
   * @param floatingUI The element that will "float" when triggered.
   * @param placement Reference FloatingUIPlacements.
   * @param middleware Visit the official Floating UI documentation for more on [middleware options](https://floating-ui.com/docs/computePosition#middleware).
   */
  public positionFloatingUI(
    trigger: Element | undefined = this.trigger,
    floatingUI: HTMLElement | undefined = this.floatingUI?.nativeElement,
    placement: FloatingUIPlacements = this.placement
  ): void {
    if (!trigger) return;
    autoUpdate(trigger, floatingUI, () => {
      computePosition(trigger, floatingUI, {
        placement: placement,
        middleware: this.middleware
      }).then(({ x, y, middlewareData, placement }: ComputePositionReturn) => {
        // Handle hiding when reference is out of view (if hide middleware is present)
        if (
          middlewareData.hide &&
          middlewareData.hide.referenceHidden &&
          // Skip this check in test environments where JSDOM may not properly calculate element visibility
          !window?.navigator?.userAgent?.includes('jsdom')
        ) {
          this.hidefloatingUI();
          return; // Don't update position if hidden
        }

        floatingUI.style.left = `${x}px`;
        floatingUI.style.top = `${y}px`;

        if (!middlewareData.arrow || !this.arrow) return;

        // see: https://codesandbox.io/s/mystifying-kare-ee3hmh?file=/src/index.js
        const { x: arrowX, y: arrowY } = middlewareData.arrow;

        this.renderer.setStyle(this.arrow.el.nativeElement, 'left', arrowX != null ? `${arrowX}px` : '');
        this.renderer.setStyle(this.arrow.el.nativeElement, 'top', arrowY != null ? `${arrowY}px` : '');
        this.renderer.setStyle(this.arrow.el.nativeElement, 'right', '');
        this.renderer.setStyle(this.arrow.el.nativeElement, 'bottom', '');

        const side = placement.split('-')[0];
        const staticSide = {
          top: 'bottom',
          bottom: 'top',
          left: 'right',
          right: 'left'
        }[side];

        if (!staticSide) return;

        this.renderer.setStyle(
          this.arrow.el.nativeElement,
          staticSide,
          -(this.arrow.el.nativeElement.offsetWidth / 2) + 'px'
        );
      });
    });
  }

  /**
   * The showFloatingUI method displays the Floating UI element.
   */
  public showfloatingUI(): void {
    this.isShown.set(true);
  }

  /**
   * The hideFloatingUI method hides the Floating UI element.
   */
  public hidefloatingUI(): void {
    this.isShown.set(false);
  }

  /**
   * The toggleFloatingUI method toggles the visibility of the Floating UI element.
   */
  public toggleFloatingUI(): void {
    this.isShown.update((prev) => !prev);
  }

  /**
   * The closeOnClickOut method closes the menu when a click occurs outside of the menu and the triggering element.
   * @param event Document click event.
   */
  private closeOnClickOut(event: Event): void {
    // listen for document click and close menu if click is outside of component
    if (!this.isShown()) return;
    const target = event.target as HTMLInputElement;
    if (!this.floatingUI?.nativeElement.contains(event.target) && !this.trigger?.contains(target)) {
      this.hidefloatingUI();
    }
  }

  /**
   * The closeAndFocus method hides the Floating UI element and focuses the trigger element. <br />
   * This is typically used when closing the menu with the escape key or clicking outside of the floating UI element.
   */
  private readonly closeAndFocus = (): void => {
    this.hidefloatingUI();
    this.restoreFocus();
  };

  /**
   * The restoreFocus method focuses the trigger element. <br />
   * This method is useful if you've set `closeOnClick` to false and want to manually restore focus.
   */
  public readonly restoreFocus = (): void => {
    if (this.trigger) {
      (this.trigger as HTMLElement)?.focus(); // ensure the trigger is focused after restoring focus
    }
  };

  /**
   * The addCloseActions method adds default close actions to the Floating UI component. These actions include closing the menu when the escape key is pressed or when clicking outside of the floating element.
   */
  private addCloseActions(): void {
    // close menu on escape key press or clicking outside of menu
    if (!document) return;
    this.rendererListeners.push(this.renderer.listen(document, 'click', this.closeOnClickOut.bind(this)));
    this.rendererListeners.push(this.renderer.listen(document, 'keydown.esc', this.hidefloatingUI.bind(this)));
    if (!this.floatingUI) return;
    this.rendererListeners.push(
      this.renderer.listen(this.floatingUI.nativeElement, 'keydown.escape', this.closeAndFocus.bind(this))
    );
  }

  /**
   * The setUpTrigger method configures the triggering element by setting up the events to listen for and the actions to take when those events are triggered.
   * @param eventArray Array of events for the reference/trigger element to listen for.<br> i.e. <code>[new UIEvent('focus'), FloatingUIVisibility.SHOW]</code> <br> tells the element to show the floating UI when the triggering element is focused.
   */
  private setUpTrigger(eventArray: UIEventVisibilityPair): void {
    // add default actions to close menu
    this.addCloseActions();
    eventArray.forEach((pair) => {
      /**
       * if a custom eventArray is **not** typed as UIEventVisibilityPair[],<br />
       * Typescript will type the array as ((UIEvent | "show")[] | (UIEvent | "hide")[])[] <br />
       * because the passed arrays have different types, the type of the array is inferred as a union of the types of the passed arrays. <br />
       * The following code ensures the correct types are assigned to the event and listener variables.
       */
      const event: UIEvent | undefined | FloatingUIVisibility = pair.find((e) => e instanceof UIEvent);
      const listener: FloatingUIVisibility | undefined | UIEvent = pair.find(
        (e) => e === FloatingUIVisibility.SHOW || e === FloatingUIVisibility.HIDE
      );
      if (!(event instanceof UIEvent)) return;
      if (event.type === 'click') {
        this.rendererListeners.push(this.renderer.listen(this.trigger, event.type, this.toggleFloatingUI.bind(this)));
      } else if (event.type === 'mouseleave' && listener && listener === FloatingUIVisibility.HIDE) {
        this.keepOnHover();
      } else if (listener && listener === FloatingUIVisibility.SHOW) {
        this.rendererListeners.push(this.renderer.listen(this.trigger, event.type, this.showfloatingUI.bind(this)));
      } else if (listener && listener === FloatingUIVisibility.HIDE) {
        this.rendererListeners.push(this.renderer.listen(this.trigger, event.type, this.hidefloatingUI.bind(this)));
      }
    });
  }

  // for keepOnHover
  /** @ignore */
  onTooltip: boolean = false;
  /** @ignore */
  onTrigger: boolean = false;

  /**
   * The keepOnHover method keeps the floating element visible when hovering over the trigger or the floating element.
   */
  private keepOnHover(): void {
    let offset = this.middleware.find((m: any) => m['name'] === 'offset') as any;
    offset = this.hideOnHoverTimeout ? this.hideOnHoverTimeout : offset['options'] ? offset['options'] * 20 : 50;
    this.rendererListeners.push(
      this.renderer.listen(this.trigger, 'mouseleave', () => {
        setTimeout(() => {
          this.onTrigger = false;
          if (!this.onTooltip) this.hidefloatingUI();
        }, offset);
      })
    );
    this.rendererListeners.push(
      this.renderer.listen(this.trigger, 'mouseenter', () => {
        this.onTrigger = true;
      })
    );

    this.rendererListeners.push(
      this.renderer.listen(this.floatingUI?.nativeElement, 'mouseenter', () => {
        this.onTooltip = true;
      })
    );
    this.rendererListeners.push(
      this.renderer.listen(this.floatingUI?.nativeElement, 'mouseleave', () => {
        setTimeout(() => {
          this.onTooltip = false;
          if (!this.onTrigger) this.hidefloatingUI();
        }, offset);
      })
    );
  }

  // method to clean up all listeners
  public cleanupListeners(): void {
    this.rendererListeners?.forEach((unlisten) => unlisten());
    this.rendererListeners = [];
  }
}
