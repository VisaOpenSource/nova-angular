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
  VisaMediaFastForwardTiny,
  VisaMediaRewindTiny,
  VisaNotesTiny,
  VisaSecurityTiny,
  VisaSettingsTiny,
  VisaStatisticsTiny,
  VisaSupportTicketTiny
} from '@visa/nova-icons-angular';

/**
 * Vertical sidebar for mixed navigation layouts.
 * Works with horizontal top bar to provide combined navigation structure.
 * #patterns #isSubComponent
 **/
@Component({
  selector: 'nova-workshop-vertical-mixed-nav-layout',
  templateUrl: './vertical-mixed-nav-layout.docs.html',
  standalone: true,
  imports: [
    RouterModule,
    NovaLibModule,
    VisaMediaRewindTiny,
    VisaMediaFastForwardTiny,
    VisaStatisticsTiny,
    VisaSettingsTiny,
    VisaNotesTiny,
    VisaSecurityTiny,
    VisaSupportTicketTiny
  ]
})
export class VerticalMixedNavLayoutComponent {
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
