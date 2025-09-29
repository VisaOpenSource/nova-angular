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
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, QueryList, viewChildren } from '@angular/core';
import { ListboxItemComponent, NovaLibModule, NovaLibService } from '@visa/nova-angular';

/** #docs */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-listbox-single-select-automatic-selection',
  templateUrl: './single-select-automatic-selection.docs.html'
})
export class AutomaticSingleSelectListboxComponent implements AfterViewInit {
  readonly listItems = viewChildren(ListboxItemComponent);

  readonly items = [
    {
      label: 'Item A',
      value: 'item-a'
    },
    {
      label: 'Item B',
      value: 'item-b'
    },
    {
      label: 'Item C',
      value: 'item-c'
    },
    {
      label: 'Item D',
      value: 'item-d'
    },
    {
      label: 'Item E',
      value: 'item-e'
    },
    {
      label: 'Item F',
      value: 'item-f'
    },
    {
      label: 'Item G',
      value: 'item-g'
    }
  ];

  readonly novaLibService = inject(NovaLibService);

  ngAfterViewInit(): void {
    this.novaLibService.addAutomaticActivation(this.listItems());
  }
}
