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
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-radio-list',
  standalone: true,
  imports: [NovaLibModule],
  templateUrl: './radio-list.docs.html'
})
export class RadioListComponent {
  items = [
    { id: 'radio-list-1', label1: 'Item A label 1', label2: 'Item A label 2' },
    { id: 'radio-list-2', label1: 'Item B label 1', label2: 'Item B label 2' },
    { id: 'radio-list-3', label1: 'Item C label 1', label2: 'Item C label 2' },
    { id: 'radio-list-4', label1: 'Item D label 1', label2: 'Item D label 2' }
  ];
}
