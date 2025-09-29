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
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny } from '@visa/nova-icons-angular';
import { Subscription } from 'rxjs';
import { MockDataService } from '../../../shared/services/mock-data.service';

type Option = {
  label: string;
  value: string;
};

/** #custom **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-select-mock-data',
  templateUrl: './mock-data.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaChevronDownTiny]
})
export class MockDataSelectComponent implements OnInit {
  readonly currentData = signal<'heroes' | 'produce'>('produce');
  readonly mockDataService = inject(MockDataService);
  readonly options = signal<Option[]>([]);

  fetchSubscription$?: Subscription;
  mockDataSubscription$?: Subscription;

  ngOnInit() {
    this.onDataChange();
  }

  onDataChange() {
    this.fetchSubscription$?.unsubscribe();

    if (this.currentData() === 'heroes') {
      this.fetchSubscription$ = this.mockDataService
        .getAgriProduce()
        .subscribe((res: Option[]) => this.options.set(res.slice(0, 6)));
      this.currentData.set('produce');
      return;
    }

    this.mockDataSubscription$ = this.mockDataService.getHeroes().subscribe((res: Option[]) => this.options.set(res));
    this.currentData.set('heroes');
  }

  ngOnDestroy() {
    this.fetchSubscription$?.unsubscribe();
    this.mockDataSubscription$?.unsubscribe();
  }
}
