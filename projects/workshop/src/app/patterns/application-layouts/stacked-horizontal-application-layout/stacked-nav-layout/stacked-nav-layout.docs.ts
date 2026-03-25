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
import { Component, computed, effect, ElementRef, signal, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FloatingUIContainer, NovaLibModule } from '@visa/nova-angular';
import {
  VisaAccountLow,
  VisaChevronDownTiny,
  VisaChevronUpTiny,
  VisaCloseLow,
  VisaMenuLow,
  VisaNotificationsLow,
  VisaSearchLow
} from '@visa/nova-icons-angular';

/**
 * Two-tier horizontal navigation with top bar and secondary menu.
 * Includes search, notifications, user account, and stacked navigation levels.
 * #patterns #isSubComponent
 **/
@Component({
  selector: 'nova-workshop-stacked-nav-layout',
  templateUrl: './stacked-nav-layout.docs.html',
  standalone: true,
  host: { '(window:resize)': 'onResize()' },
  imports: [
    NovaLibModule,
    RouterModule,
    VisaCloseLow,
    VisaSearchLow,
    VisaMenuLow,
    VisaChevronDownTiny,
    VisaChevronUpTiny,
    VisaNotificationsLow,
    VisaAccountLow
  ]
})
export class StackedNavLayoutComponent {
  /** Reference to the search input element in the template. */
  readonly searchInput = viewChild<ElementRef>('searchInput');

  /** Reference to the search button element in the template. */
  readonly searchButton = viewChild<ElementRef>('searchButton');

  /**
   * Tracks whether the search bar is expanded.
   * Null on initial load to prevent focus changes during page load.
   */
  readonly searchExpanded = signal<boolean | null>(null);

  /**
   * Manages focus when search expands or collapses.
   * When expanded, focuses the input field. When collapsed, focuses the button.
   */
  readonly searchExpandedEffect = effect(() => {
    const expanded = this.searchExpanded();
    if (expanded === null) return; // don't move focus on page load
    if (expanded) {
      this.searchInput()?.nativeElement.focus();
    } else {
      this.searchButton()?.nativeElement.focus();
    }
  });

  /** Reference to the floating container used for the mobile menu. */
  readonly mobileMenuContainer = viewChild(FloatingUIContainer);

  /** Indicates whether the mobile menu is currently visible. */
  readonly mobileMenuOpen = computed(() => this.mobileMenuContainer()?.floatingUIService?.isShown());

  /** Tracks the open/closed state of the account dropdown menu. */
  readonly accountOpen = signal(false);

  /** Additional floating container reference used in the template. */
  readonly container = viewChild(FloatingUIContainer);

  /** Screen width in pixels where the layout switches between mobile and desktop views. */
  readonly mobileBreakpoint = 600;

  /**
   * Toggles the open/closed state of the account dropdown menu.
   */
  handleToggleAccount() {
    this.accountOpen.update((open) => !open);
  }

  /**
   * Handles window resize events to close the mobile menu when switching to desktop width.
   */
  onResize() {
    if (window.innerWidth > this.mobileBreakpoint) {
      this.mobileMenuContainer()?.floatingUIService?.hidefloatingUI();
    }
  }
}
