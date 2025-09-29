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
  ElementRef,
  forwardRef,
  inject,
  input,
  InputSignal,
  InputSignalWithTransform,
  signal,
  Signal,
  WritableSignal
} from '@angular/core';
import { ButtonDirective } from '../button/button.directive';
import { NavDirective } from '../nav/nav.directive';
import { NovaLibService } from '../nova-lib.service';
import { PanelContentDirective } from '../panel-content/panel-content.directive';
import { TabItemDirective } from '../tab-item/tab-item.directive';
import { defaultEffectParam } from '../nova-lib.constants';

@Directive({
  host: {
    class: 'v-tabs',

    '[attr.aria-orientation]': "vertical() && !navParent ?  'vertical' : null",
    '[attr.role]': 'role()',
    '[class.v-panel-tabs]': 'panelParent',
    '[class.v-tabs-horizontal]': '!vertical()',
    '[class.v-tabs-vertical]': 'vertical()'
  },
  selector: '[v-tabs]',
  standalone: true
})
export class TabListDirective implements AfterContentInit {
  prevTabs: WritableSignal<TabItemDirective[] | undefined> = signal(undefined);
  constructor() {
    /**
     * this effect will be called for every tab item change (including active)
     * we need to only update the list and relevant item props when the **rendered** items change
     * ie when items are added or removed
     * */
    effect(() => {
      const tabs = this.tabs();
      if (!tabs || tabs.length === 0 || tabs === this.prevTabs()) return;
      this.setUpTabs();
      this.prevTabs.set(tabs as TabItemDirective[]); // store the current tabs for comparison
    }, defaultEffectParam);
  }

  ngAfterContentInit(): void {
    // set up tabs immediately so if user calls resetNavigation from NovaService,
    // it will have the correct listeners to reset
    // otherwise the listeners will be added AFTER the user calls resetNavigation
    this.setUpTabs();
    this.prevTabs.set(this.tabs() as TabItemDirective[]); // store the current tabs for comparison
  }

  readonly tabListParent: TabListDirective | null = inject(TabListDirective, {
    optional: true,
    host: true,
    skipSelf: true
  });
  readonly navParent: NavDirective | null = inject(NavDirective, {
    optional: true,
    host: true
  });
  protected readonly panelParent: PanelContentDirective | null = inject(PanelContentDirective, {
    optional: true,
    host: true
  });
  private readonly el: ElementRef = inject(ElementRef, { host: true });
  private readonly novaLibService: NovaLibService = inject(NovaLibService);

  public readonly buttons: Signal<readonly ButtonDirective[]> = contentChildren(
    forwardRef(() => ButtonDirective),
    { descendants: true }
  );
  public readonly tabs: Signal<readonly TabItemDirective[]> = contentChildren(forwardRef(() => TabItemDirective));

  /**
   * Sets custom role.
   * @default 'tablist'
   * @default null if nested tab list or within Navigation.
   * @builtin true
   */
  readonly roleInput: InputSignal<string | null> = input<HTMLElement['role']>(null, { alias: 'role' });
  protected readonly role: Signal<string | null> = computed(
    () => this.roleInput() ?? (this.tabListParent || this.navParent ? null : 'tablist')
  );

  /**
   * Sets tab list to vertical orientation when true.
   * @default false
   */
  readonly vertical: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  private setUpTabs(): void {
    if (this.navParent) return;
    // if just plain tabs..
    this.novaLibService.addArrowKeyNavigation(
      this.buttons(),
      this.el.nativeElement,
      this.vertical() ? 'vertical' : 'horizontal'
    );

    this.setUpFocusListener();
  }

  private readonly prevActiveTab: WritableSignal<TabItemDirective | undefined> = signal(
    this.tabs()?.find((tab) => tab.active()) || undefined
  );
  private readonly activeTabEffect = effect(() => {
    this.tabs().forEach((tab) => {
      const active = tab.active();

      if (active && this.prevActiveTab && this.prevActiveTab() !== tab) {
        this.prevActiveTab()?.active.set(false); // deactivate previous active tab
        // if the tab is active, set it as the previous active tab
        this.prevActiveTab.set(tab);
      }
    });
  }, defaultEffectParam);

  private setUpFocusListener(): void {
    this.buttons()?.forEach((button) => {
      // button's listenerService will clean up the subscriptions
      button.listenerService.navSubscriptions.push(
        button.blurred.subscribe((event: FocusEvent) => {
          // if focus is leaving the tab list, find the starting focusable tab for when the list receives focus again
          // if focus stays in the tab list, relatedTarget will be a button within the tab list
          if (!event.relatedTarget || !!this.el.nativeElement.contains(event.target)) {
            this.novaLibService.findStartingFocus(this.buttons());
          }
        })
      );
    });
  }
}
