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
import { CommonModule } from '@angular/common';
import { Component, input, signal, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovaLibModule } from '@visa/nova-angular';
import {
  VisaSearchLow,
  VisaPinFillTiny,
  VisaAddAltTiny,
  VisaMediaRewindTiny,
  VisaMediaFastForwardTiny
} from '@visa/nova-icons-angular';

/**
 * Full-page navigation component for chat interfaces.
 * Provides a collapsible sidebar with chat history, search functionality, and responsive behavior.
 * Automatically adjusts expansion state based on screen size.
 *
 * #patterns #isShared
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'full-page-navigation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NovaLibModule,
    VisaSearchLow,
    VisaPinFillTiny,
    VisaAddAltTiny,
    VisaMediaRewindTiny,
    VisaMediaFastForwardTiny,
  ],
  templateUrl: "./full-page-navigation.docs.html",
  styleUrls: ["./full-page-navigation.docs.scss"]
})
export class FullPageNavigationComponent {
  /**
   * Element ID for the navigation container.
   * @default 'full-page-nav'
   */
  readonly id = input<string>('full-page-nav');

  /**
   * Whether the navigation sidebar is expanded.
   * Automatically set to false on screens 500px or narrower.
   */
  readonly navExpanded = signal(true);

  /**
   * Whether the mobile menu overlay is open.
   */
  readonly mobileMenuOpen = signal(false);

  /**
   * Emits when the new chat button is activated.
   */
  readonly newChatStarted = output<void>();

  /**
   * Array of chat names from two days ago for the chat history list.
   */
  readonly twoDaysAgoChats = ['Chat name 1', 'Chat name 2', 'Chat name 3'];

  /**
   * Array of chat names from one week ago for the chat history list.
   */
  readonly oneWeekAgoChats = ['Chat name 4', 'Chat name 5', 'Chat name 6'];

  constructor() {
    if (typeof window !== 'undefined') {
      // Check initial screen size
      this.checkScreenSize();
      // Listen for window resize
      window.addEventListener('resize', () => this.checkScreenSize());
    }
  }

  /**
   * Checks the screen width and adjusts navigation expansion state.
   * Collapses the navigation on screens 500px or narrower, expands on wider screens.
   */
  private checkScreenSize(): void {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 500) {
        this.navExpanded.set(false);
      } else {
        this.navExpanded.set(true);
      }
    }
  }

  /**
   * Toggles the navigation sidebar between expanded and collapsed states.
   */
  toggleNavExpanded() {
    this.navExpanded.update((expanded) => !expanded);
  }

  /**
   * Toggles the mobile menu overlay between open and closed states.
   */
  toggleMobileMenu() {
    this.mobileMenuOpen.update((open) => !open);
  }

  /**
   * Emits an event to signal that a new chat should be started.
   */
  startNewChat() {
    this.newChatStarted.emit();
  }
}
