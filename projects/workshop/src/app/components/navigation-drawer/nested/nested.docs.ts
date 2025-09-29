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
import { Component, ElementRef, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { NovaLibModule, PanelDirective } from '@visa/nova-angular';
import { VisaAccountTiny, VisaChevronDownTiny, VisaChevronUpTiny, VisaCloseTiny } from '@visa/nova-icons-angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-nav-drawer-nested',
  templateUrl: './nested.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaAccountTiny, VisaChevronDownTiny, VisaChevronUpTiny, VisaCloseTiny]
})
export class NestedNavDrawerComponent {
  readonly panel = viewChild<PanelDirective, ElementRef<HTMLDialogElement>>(PanelDirective, {
    read: ElementRef
  });

  avatarOpen = false;
  l1_4Open = false;
  l1_2Open = false;
  l2_1Open = false;

  closeModal() {
    this.panel()?.nativeElement.close();
  }

  showModal() {
    this.panel()?.nativeElement.showModal();
  }
}
