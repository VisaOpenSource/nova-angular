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
import { Component, effect, ElementRef, signal, computed, inject, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovaLibModule, FloatingUIService } from '@visa/nova-angular';
import {
  VisaAccountLow,
  VisaChevronDownTiny,
  VisaChevronUpTiny,
  VisaCloseLow,
  VisaMenuLow,
  VisaNotificationsLow,
  VisaSearchLow
} from '@visa/nova-icons-angular';

@Component({
  selector: 'nova-workshop-test-horizontal-nav-nested-menus',
  templateUrl: './horizontal-nav-nested-menus.docs.html',
  standalone: true,
  imports: [
    RouterModule,
    NovaLibModule,
    VisaCloseLow,
    VisaSearchLow,
    VisaMenuLow,
    VisaChevronDownTiny,
    VisaChevronUpTiny,
    VisaNotificationsLow,
    VisaAccountLow
  ]
})
export class HorizontalNavNestedMenusTestComponent {
  readonly searchInput = viewChild<ElementRef>('searchInput');
  readonly searchButton = viewChild<ElementRef>('searchButton');
  readonly searchExpanded = signal<boolean | null>(null);
  readonly searchExpandedEffect = effect(() => {
    const expanded = this.searchExpanded();
    if (expanded === null) return; // don't move focus on page load
    if (expanded) {
      this.searchInput()?.nativeElement.focus();
    } else {
      this.searchButton()?.nativeElement.focus();
    }
  });

  floatingUIService = inject(FloatingUIService);
  isFloatingUIOpen(): boolean {
    return this.floatingUIService.isShown();
  }
  readonly mobileMenuOpen = signal(this.isFloatingUIOpen());
  readonly mobileOpenComputed = computed(() => {
    return this.floatingUIService.isShown();
  });

  readonly label4Open = signal(false);
  readonly accountOpen = signal(false);

  handleToggleLabel4(event: Event) {
    event.stopPropagation();
    this.label4Open.update((open) => !open);
  }

  handleToggleAccount(event: Event) {
    event.stopPropagation();
    this.accountOpen.update((open) => !open);
  }
}
