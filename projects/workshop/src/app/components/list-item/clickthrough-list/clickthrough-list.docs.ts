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
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaChevronRightTiny } from '@visa/nova-icons-angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-clickthrough-list',
  standalone: true,
  imports: [NovaLibModule, VisaChevronRightTiny],
  templateUrl: './clickthrough-list.docs.html'
})
export class ClickthroughListComponent {
  items = [
    { id: 'item-1', text: 'Item A label' },
    { id: 'item-2', text: 'Item B label' },
    { id: 'item-3', text: 'Item C label' },
    { id: 'item-4', text: 'Item D label' }
  ];
}
