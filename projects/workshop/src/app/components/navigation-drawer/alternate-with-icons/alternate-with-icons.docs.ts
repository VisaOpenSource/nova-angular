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
import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { NovaLibModule, PanelDirective } from '@visa/nova-angular';
import {
  VisaAccountTiny,
  VisaChevronDownTiny,
  VisaChevronUpTiny,
  VisaCloseTiny,
  VisaNotesTiny,
  VisaSecurityTiny,
  VisaSettingsTiny,
  VisaStatisticsTiny,
  VisaSupportTicketTiny
} from '@visa/nova-icons-angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-nav-drawer-alternate-with-icons',
  templateUrl: './alternate-with-icons.docs.html',
  standalone: true,
  imports: [
    NovaLibModule,
    VisaAccountTiny,
    VisaChevronDownTiny,
    VisaChevronUpTiny,
    VisaStatisticsTiny,
    VisaSettingsTiny,
    VisaNotesTiny,
    VisaSecurityTiny,
    VisaSupportTicketTiny,
    VisaCloseTiny
  ]
})
export class AlternateWithIconsNavDrawerComponent {
  readonly panel = viewChild<PanelDirective, ElementRef<HTMLDialogElement>>(PanelDirective, {
    read: ElementRef
  });

  disclosureTabOpen = false;

  closeModal() {
    this.panel()?.nativeElement.close();
  }

  showModal() {
    this.panel()?.nativeElement.showModal();
  }
}
