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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import {
  VisaAccountTiny,
  VisaChevronDownTiny,
  VisaChevronUpTiny,
  VisaMediaFastForwardTiny,
  VisaMediaRewindTiny
} from '@visa/nova-icons-angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-nav-vertical-with-active-prop',
  templateUrl: './with-active-prop.docs.html',
  styleUrls: ['../vertical-navigation.docs.scss'],
  standalone: true,
  imports: [
    NovaLibModule,
    VisaAccountTiny,
    VisaChevronDownTiny,
    VisaChevronUpTiny,
    VisaMediaRewindTiny,
    VisaMediaFastForwardTiny
  ]
})
export class VerticalWithActivePropNavComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  navOpen = true;
  disclosureTabOpen = false;
  readonly currentPage = signal<string>('l1-label-1');

  handleToggle(event: boolean) {
    this.disclosureTabOpen = event;
  }

  setCurrentPage(page: string, event: Event) {
    event.preventDefault();
    this.currentPage.set(page);
    this.cdr.markForCheck();
  }
}
