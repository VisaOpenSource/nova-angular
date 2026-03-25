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
import { ChangeDetectionStrategy, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import {
  VisaAccountLow,
  VisaChevronDownTiny,
  VisaChevronUpTiny,
  VisaMenuLow,
  VisaNotificationsLow,
  VisaCloseLow,
  VisaSearchLow,
  VisaStatisticsTiny,
  VisaSettingsTiny,
  VisaSecurityTiny
} from '@visa/nova-icons-angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-horizontal-nav-with-icons',
  templateUrl: './with-icons.docs.html',
  standalone: true,
  imports: [
    NovaLibModule,
    RouterModule,
    VisaCloseLow,
    VisaSearchLow,
    VisaMenuLow,
    VisaChevronDownTiny,
    VisaChevronUpTiny,
    VisaNotificationsLow,
    VisaAccountLow,
    VisaStatisticsTiny,
    VisaSettingsTiny,
    VisaSecurityTiny
  ]
})
export class WithIconsHorizontalNavComponent {
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
}
