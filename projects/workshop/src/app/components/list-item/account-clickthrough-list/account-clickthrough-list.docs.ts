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
  selector: 'nova-workshop-account-clickthrough-list',
  standalone: true,
  imports: [NovaLibModule, VisaChevronRightTiny],
  templateUrl: './account-clickthrough-list.docs.html'
})
export class AccountClickthroughListComponent {
  items = [
    { id: 'item-1', overline: '•••• 1111', href: './list-item', color: '#18385C' },
    { id: 'item-2', overline: '•••• 2222', href: './list-item', color: '#308342' },
    { id: 'item-3', overline: '•••• 3333', href: './list-item', color: '#A6304B' },
    { id: 'item-4', overline: '•••• 4444', href: './list-item', color: '#1569CF' }
  ];
}
