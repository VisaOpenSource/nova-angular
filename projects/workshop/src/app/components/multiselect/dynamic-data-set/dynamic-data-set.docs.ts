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
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  OutputRefSubscription,
  signal,
  viewChild
} from '@angular/core';
import { ComboboxDirective, ComboboxService, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny } from '@visa/nova-icons-angular';
import { MockDataService } from '../../../shared/services/mock-data.service';

/** @ignore */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-multiselect-dynamic-data-set',
  templateUrl: './dynamic-data-set.docs.html',
  providers: [ComboboxService],
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaChevronDownTiny, VisaChevronUpTiny]
})
export class DynamicDataSetMultiselectComponent implements OnInit {
  readonly combobox = viewChild(ComboboxDirective);
  readonly comboboxService = inject(ComboboxService);
  readonly mockDataService = inject(MockDataService);

  mockDataSubscription?: OutputRefSubscription;
  comboboxFilterSubscription?: OutputRefSubscription;

  readonly listData = signal<{ id: string | number; value: string | number }[]>([]);
  readonly filteredData = signal(this.listData());

  ngOnInit() {
    this.getMockData();
  }

  getMockData() {
    this.mockDataSubscription = this.mockDataService
      .getLargeData()
      .subscribe((data: { id: string | number; value: string | number }[]) => {
        this.listData.set(data);
        this.filteredData.set(this.listData());
        const combobox = this.combobox();
        if (!combobox) return;
        this.comboboxService.autoFilterBasedOnList(combobox, this.listData(), 'id');
      });
  }

  ngAfterViewInit(): void {
    const combobox = this.combobox();
    if (combobox) {
      // ComboboxService provider needed to get unique reference to filteredListEmitter
      this.comboboxFilterSubscription = combobox.filteredListEmitter.subscribe(
        (listItems: { id: string | number; value: string | number }[]) => {
          this.filteredData.set(listItems);
        }
      );
      this.comboboxService.closeMenuOnItemClick(combobox);
    }
  }

  ngOnDestroy(): void {
    this.mockDataSubscription?.unsubscribe();
    this.comboboxFilterSubscription?.unsubscribe();
  }
}
