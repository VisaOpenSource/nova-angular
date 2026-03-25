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
import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import {
  VisaAccountLow,
  VisaChevronDownTiny,
  VisaChevronUpTiny,
  VisaClearAltTiny,
  VisaMenuLow,
  VisaNotificationsLow,
  VisaSearchLow
} from '@visa/nova-icons-angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-horizontal-nav-persistent-search',
  templateUrl: './persistent-search.docs.html',
  standalone: true,
  imports: [
    RouterModule,
    NovaLibModule,
    VisaMenuLow,
    VisaSearchLow,
    VisaAccountLow,
    VisaNotificationsLow,
    VisaChevronDownTiny,
    VisaChevronUpTiny,
    VisaClearAltTiny
  ]
})
export class PersistentSearcgHorizontalNavComponent {
  readonly input = viewChild<ElementRef>('inputRef');
  readonly button = viewChild<ElementRef>('searchClearBtn');
  readonly inFocus = signal(false);
  value: string = '';

  blur(event: FocusEvent) {
    const { relatedTarget } = event;
    const buttonElement = this.button()?.nativeElement;
    const inputElement = this.input()?.nativeElement;
    if (relatedTarget !== buttonElement && relatedTarget !== inputElement) this.inFocus.set(false);
  }

  clearAndFocus() {
    const input = this.input();
    if (!input) return;
    this.value = '';
    input.nativeElement.focus();
  }

  focus() {
    this.inFocus.set(true);
  }
}
