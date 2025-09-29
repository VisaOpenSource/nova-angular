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
import { AccountClickthroughListComponent } from './account-clickthrough-list/account-clickthrough-list.docs';
import { CheckboxListComponent } from './checkbox-list/checkbox-list.docs';
import { ClickthroughListComponent } from './clickthrough-list/clickthrough-list.docs';
import { DefaultCheckboxListItemComponent } from './default-checkbox/default-checkbox.docs';
import { DefaultClickthroughListItemComponent } from './default-clickthrough/default-clickthrough.docs';
import { DefaultListWithDividersComponent } from './default-list-with-dividers/default-list-with-dividers.docs';
import { DefaultListWithSectionTitleAndHyperlinkComponent } from './default-list-with-section-title-and-hyperlink/default-list-with-section-title-and-hyperlink.docs';
import { DefaultListWithTitleComponent } from './default-list-with-title/default-list-with-title.docs';
import { DefaultListComponent } from './default-list/default-list.docs';
import { DefaultRadioListItemComponent } from './default-radio/default-radio.docs';
import { DefaultSwitchListItemComponent } from './default-switch/default-switch.docs';
import { DisabledCardArtClickthroughListItemComponent } from './disabled-card-art-clickthrough/disabled-card-art-clickthrough.docs';
import { DisabledCardArtWithNumberClickthroughListItemComponent } from './disabled-card-art-with-number-clickthrough/disabled-card-art-with-number-clickthrough.docs';
import { DisabledCheckboxListItemComponent } from './disabled-checkbox/disabled-checkbox.docs';
import { DisabledClickthroughListItemComponent } from './disabled-clickthrough/disabled-clickthrough.docs';
import { DisabledLeadingIconClickthroughListItemComponent } from './disabled-leading-icon-clickthrough/disabled-leading-icon-clickthrough.docs';
import { DisabledLeadingImageClickthroughListItemComponent } from './disabled-leading-image-clickthrough/disabled-leading-image-clickthrough.docs';
import { DisabledRadioListItemComponent } from './disabled-radio/disabled-radio.docs';
import { DisabledSwitchListItemComponent } from './disabled-switch/disabled-switch.docs';
import { IndicatorLineListItemComponent } from './indicator-line/indicator-line.docs';
import { LeadingCardArtListItemComponent } from './leading-card-art/leading-card-art.docs';
import { LeadingIconWithBackgroundListItemComponent } from './leading-icon-with-background/leading-icon-with-background.docs';
import { LeadingIconListItemComponent } from './leading-icon/leading-icon.docs';
import { LeadingImageListItemComponent } from './leading-image/leading-image.docs';
import { OneLineTwoColumnListItemComponent } from './one-line-two-column/one-line-two-column.docs';
import { OneLineListItemComponent } from './one-line/one-line.docs';
import { RadioListComponent } from './radio-list/radio-list.docs';
import { ThreeLineListItemComponent } from './three-line/three-line.docs';
import { TrailingCardArtListItemComponent } from './trailing-card-art/trailing-card-art.docs';
import { TrailingIconWithBackgroundListItemComponent } from './trailing-icon-with-background/trailing-icon-with-background.docs';
import { TrailingIconListItemComponent } from './trailing-icon/trailing-icon.docs';
import { TrailingImageListItemComponent } from './trailing-image/trailing-image.docs';
import { TransactionsListComponent } from './transactions-list/transactions-list.docs';
import { TwoLineListItemComponent } from './two-line/two-line.docs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NovaLibModule,
    NovaSharedModule,
    OneLineListItemComponent,
    OneLineTwoColumnListItemComponent,
    TwoLineListItemComponent,
    ThreeLineListItemComponent,
    LeadingIconListItemComponent,
    LeadingIconWithBackgroundListItemComponent,
    LeadingImageListItemComponent,
    LeadingCardArtListItemComponent,
    IndicatorLineListItemComponent,
    TrailingIconListItemComponent,
    TrailingIconWithBackgroundListItemComponent,
    TrailingImageListItemComponent,
    TrailingCardArtListItemComponent,
    DefaultClickthroughListItemComponent,
    DisabledClickthroughListItemComponent,
    DisabledLeadingImageClickthroughListItemComponent,
    DisabledLeadingIconClickthroughListItemComponent,
    DisabledCardArtClickthroughListItemComponent,
    DisabledCardArtWithNumberClickthroughListItemComponent,
    DefaultSwitchListItemComponent,
    DisabledSwitchListItemComponent,
    DefaultRadioListItemComponent,
    DisabledRadioListItemComponent,
    DefaultCheckboxListItemComponent,
    DisabledCheckboxListItemComponent,
    DefaultListComponent,
    DefaultListWithDividersComponent,
    DefaultListWithTitleComponent,
    DefaultListWithSectionTitleAndHyperlinkComponent,
    ClickthroughListComponent,
    RadioListComponent,
    CheckboxListComponent,
    AccountClickthroughListComponent,
    TransactionsListComponent
  ],
  standalone: true,
  selector: 'nova-docs-list-item',
  templateUrl: './list-item.docs.html'
})
export class ListItemDocsComponent {
  readonly workshopService = inject(WorkshopService);
  constructor() {
    this.workshopService.componentName.set('List item');
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
