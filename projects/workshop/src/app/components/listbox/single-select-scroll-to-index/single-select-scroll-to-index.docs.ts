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
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { ListboxDirective, ListboxService, NovaLibModule } from '@visa/nova-angular';

/** #docs */

/** @ignore */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-listbox-single-select-scroll-to-index',
  templateUrl: './single-select-scroll-to-index.docs.html'
})
export class SingleSelectScrollToIndexListboxComponent implements AfterViewInit {
  readonly listbox = viewChild(ListboxDirective);
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
  index = 6;

  readonly listboxService = inject(ListboxService);

  ngAfterViewInit() {
    const listbox = this.listbox();
    if (!listbox) return;
    // scrolls given item of index into view
    this.listboxService.scrollItemIntoView(listbox, this.index);
  }
}
