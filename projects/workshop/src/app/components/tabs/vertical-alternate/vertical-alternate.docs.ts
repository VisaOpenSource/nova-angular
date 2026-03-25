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

/** #custom #alternate */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-tabs-vertical-alternate',
  templateUrl: './vertical-alternate.docs.html',
  standalone: true,
  imports: [NovaLibModule]
})
export class VerticalAlternateTabsComponent {
  selectedButtonTab = 0;

  tabContent = [
    {
      tabLabel: 'Label 1',
      text: 'This is content area for label 1',
      id: 'nova-vertical-alternate-example-0'
    },
    {
      tabLabel: 'Label 2',
      text: 'This is content area for label 2',
      id: 'nova-vertical-alternate-example-1'
    },
    {
      tabLabel: 'Label 3',
      text: 'This is content area for label 3',
      id: 'nova-vertical-alternate-example-2'
    },
    {
      tabLabel: 'Label 4',
      text: 'This is content area for label 4',
      id: 'nova-vertical-alternate-example-3'
    }
  ];

  showPanel(index: number) {
    this.selectedButtonTab = index;
  }
}
