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
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaDisclosureCollapseTiny, VisaDisclosureExpandTiny } from '@visa/nova-icons-angular';

/** #custom **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-accordion-with-custom-toggle-icons',
  templateUrl: './with-custom-toggle-icons.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaDisclosureExpandTiny, VisaDisclosureCollapseTiny]
})
export class WithCustomToggleIconsAccordionComponent {
  readonly expandedArray = signal<boolean[]>([false, false, false]);

  toggleExpanded(index: number) {
    this.expandedArray.update((prevExpandedState) => {
      const expanded = [...prevExpandedState];
      expanded[index] = !expanded[index];
      return expanded;
    });
  }
}
