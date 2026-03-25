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
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, viewChildren } from '@angular/core';
import { ButtonDirective, NovaLibModule, NovaLibService } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronRightTiny } from '@visa/nova-icons-angular';

/** #custom **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-accordion-with-arrow-key-navigation',
  templateUrl: './with-arrow-key-navigation.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaChevronRightTiny, VisaChevronDownTiny]
})
export class WithArrowKeyNavAccordionComponent implements AfterViewInit {
  readonly buttons = viewChildren(ButtonDirective);

  readonly novaLibService = inject(NovaLibService);

  ngAfterViewInit(): void {
    if (this.buttons()?.length) this.novaLibService.addArrowKeyNavigation(this.buttons());
  }
}
