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
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import {
  VisaAccountTiny,
  VisaChevronDownTiny,
  VisaChevronUpTiny,
  VisaMediaFastForwardTiny,
  VisaMediaRewindTiny,
  VisaNotesTiny,
  VisaSecurityTiny,
  VisaSettingsTiny,
  VisaStatisticsTiny,
  VisaSupportTicketTiny
} from '@visa/nova-icons-angular';

/**
 * Vertical side navigation bar with expandable sections.
 * Includes collapsible menu and user account disclosure.
 * #patterns #isSubComponent
 **/
@Component({
  selector: 'nova-workshop-vertical-nav-layout',
  templateUrl: './vertical-nav-layout.docs.html',
  standalone: true,
  imports: [
    RouterModule,
    NovaLibModule,
    VisaAccountTiny,
    VisaChevronDownTiny,
    VisaChevronUpTiny,
    VisaMediaRewindTiny,
    VisaMediaFastForwardTiny,
    VisaStatisticsTiny,
    VisaSettingsTiny,
    VisaNotesTiny,
    VisaSecurityTiny,
    VisaSupportTicketTiny
  ]
})
export class VerticalNavLayoutComponent {
  /** Tracks whether the side navigation is open or collapsed. */
  navOpen = true;

  /** Tracks whether the disclosure tab is open within the navigation. */
  disclosureTabOpen = false;

  /**
   * Updates the state of the disclosure tab.
   * @param event - Boolean indicating whether the disclosure should be open
   */
  handleToggle(event: boolean) {
    this.disclosureTabOpen = event;
  }
}
