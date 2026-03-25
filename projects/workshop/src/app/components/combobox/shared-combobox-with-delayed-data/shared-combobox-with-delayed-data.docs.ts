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
import { ChangeDetectionStrategy, Component, computed, inject, OutputRefSubscription, signal } from '@angular/core';
import { ComboboxValue, ListboxItemType, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny } from '@visa/nova-icons-angular';
import { MockDataService } from '../../../shared/services/mock-data.service';
import { SharedComboboxDocsComponent } from './shared-combobox/shared-combobox.docs';
import { ExampleComponent } from '../../../shared/app-components/example/example.docs';

/** #custom */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-combobox-shared-combobox-with-delayed-data',
  templateUrl: './shared-combobox-with-delayed-data.docs.html',
  standalone: true,
  imports: [NovaLibModule, ExampleComponent, SharedComboboxDocsComponent, VisaChevronDownTiny]
})
export class DisplayedComboboxDocsComponent {
  readonly mockDataService = inject(MockDataService);
  readonly items = signal<ListboxItemType[]>([]);
  readonly selectedValue = computed<ListboxItemType>(() => this.items()?.[0]);
  comboboxValue: ComboboxValue = null;
  mockDataSubscription?: OutputRefSubscription;

  /**
   * get value of select, note it's empty originally
   */
  selectChanged(event: Event) {
    const { value } = event.target as HTMLInputElement;
    if (value) this.getMockData(value);
  }

  getMockData(option: string) {
    this.mockDataSubscription?.unsubscribe();
    switch (option) {
      case '1':
        this.mockDataSubscription = this.mockDataService.getAgriProduce().subscribe((data: ListboxItemType[]) => {
          this.items.set(data);
        });
        break;
      case '2':
        this.mockDataSubscription = this.mockDataService.getHeroes().subscribe((data: ListboxItemType[]) => {
          this.items.set(data);
        });
        break;
      case '3':
        this.mockDataSubscription = this.mockDataService
          .getLargeData()
          .subscribe((data: { actor: { login: string }; id: string | number }[]) => {
            this.items.set(
              data.map((item) => {
                return { label: item.actor.login, value: item.id };
              })
            );
          });
        break;
      default:
    }
  }

  updateSharedValue(value: ComboboxValue) {
    this.comboboxValue = value;
  }

  ngOnDestroy(): void {
    this.mockDataSubscription?.unsubscribe();
  }
}
