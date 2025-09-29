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

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { WorkshopService } from '../../shared/services/workshop.service';
import { DefaultRangeDateTimeComponent } from './date-range-default/date-range-default.docs';
import { StackedRangeDateTimeComponent } from './date-range-stacked/date-range-stacked.docs';
import { DateSelectorValuesDateTimeComponent } from './date-selector-values/date-selector-values.docs';
import { WithDisabledDatesDateTimeComponent } from './date-selector-with-disabled-dates/date-selector-with-disabled-dates.docs';
import { InvalidDateSelectorDateTimeComponent } from './date-selector-with-error/date-selector-with-error.docs';
import { DefaultDateSelectorDateTimeComponent } from './default-date-selector/default-date-selector.docs';
import { DefaultTimeSelectorDateTimeComponent } from './default-time-selector/default-time-selector.docs';
import { DisabledDateSelectorDateTimeComponent } from './disabled-date-selector/disabled-date-selector.docs';
import { DisabledTimeSelectorDateTimeComponent } from './disabled-time-selector/disabled-time-selector.docs';
import { ReadOnlyDateSelectorDateTimeComponent } from './read-only-date-selector/read-only-date-selector.docs';
import { ReadOnlyTimeSelectorDateTimeComponent } from './read-only-time-selector/read-only-time-selector.docs';
import { InvalidTimeSelectorDateTimeComponent } from './time-selector-with-error/time-selector-with-error.docs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NovaLibModule,
    NovaSharedModule,
    DefaultDateSelectorDateTimeComponent,
    DefaultRangeDateTimeComponent,
    DefaultTimeSelectorDateTimeComponent,
    DisabledDateSelectorDateTimeComponent,
    DisabledTimeSelectorDateTimeComponent,
    InvalidDateSelectorDateTimeComponent,
    InvalidTimeSelectorDateTimeComponent,
    ReadOnlyDateSelectorDateTimeComponent,
    ReadOnlyTimeSelectorDateTimeComponent,
    StackedRangeDateTimeComponent,
    WithDisabledDatesDateTimeComponent,
    DateSelectorValuesDateTimeComponent
  ],
  standalone: true,
  selector: 'nova-docs-date-and-time-selectors',
  templateUrl: './date-and-time-selectors.docs.html'
})
export class DateTimeSelectorsDocsComponent {
  readonly workshopService = inject(WorkshopService);

  constructor() {
    this.workshopService.componentName.set('Date and time selectors');
    this.workshopService.neededAPI.set([
      { name: 'InputDirective' },
      { name: 'InputContainerComponent', type: 'component' },
      { name: 'LabelDirective' },
      { name: 'InputMessageDirective' },
      { name: 'AppReadyService', type: 'service-source' },
      { name: 'IdGenerator', type: 'service-source' }
    ]);
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
