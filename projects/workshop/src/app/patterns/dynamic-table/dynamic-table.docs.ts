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
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { WorkshopService } from '../../shared/services/workshop.service';
import { ActionBarAndPaginationDynamicTableComponent } from './action-bar-and-pagination/action-bar-and-pagination.docs';
import { ColumnHeaderActionsDynamicTableComponent } from './column-header-actions/column-header-actions.docs';
import { DataFetchAccordionToggleDynamicTableComponent } from './data-fetch-on-accordion-toggle/data-fetch-on-accordion-toggle.docs';
import { DataFetchOnPaginationDynamicTableComponent } from './data-fetch-on-pagination/data-fetch-on-pagination.docs';
import { DefaultDynamicTableComponent } from './default/default.docs';
import { FilterDialogDynamicTableComponent } from './filter-dialog/filter-dialog.docs';
import { FiltersDynamicTableComponent } from './filters/filters.docs';
import { InTableFiltersDynamicTableComponent } from './in-table-filters/in-table-filters.docs';
import { IndeterminateCircularProgressDynamicTableComponent } from './indeterminate-circular-progress/indeterminate-circular-progress.docs';
import { IndeterminateLinearProgressDynamicTableComponent } from './indeterminate-linear-progress/indeterminate-linear-progress.docs';
import { MultiRowExpandableDynamicTableComponent } from './multi-row-expandable/multi-row-expandable.docs';
import { MultiSelectDynamicTableComponent } from './multi-select/multi-select.docs';
import { MultipleActionButtonsDynamicTableComponent } from './multiple-action-buttons/multiple-action-buttons.docs';
import { NotificationsDynamicTableComponent } from './notifications/notifications.docs';
import { PaginationDynamicTableComponent } from './pagination/pagination.docs';
import { PinnedColumnAndHorizontalScrollDynamicTableComponent } from './pinned-column-and-horizontal-scroll/pinned-column-and-horizontal-scroll.docs';
import { SearchActionBarDynamicTableComponent } from './search-action-bar/search-action-bar.docs';
import { SelectionBasedActionBarDynamicTableComponent } from './selection-based-action-bar/selection-based-action-bar.docs';
import { SingleRowExpandableDynamicTableComponent } from './single-row-expandable/single-row-expandable.docs';
import { SubtleActionBarDynamicTableComponent } from './subtle-action-bar/subtle-action-bar.docs';
import { ToggleActionBarDynamicTableComponent } from './toggle-action-bar/toggle-action-bar.docs';
import { VerticalAndHorizontalScrollDynamicTableComponent } from './vertical-and-horizontal-scroll/vertical-and-horizontal-scroll.docs';
import { VerticalScrollAndStickyRowDynamicTableComponent } from './vertical-scroll-and-sticky-row/vertical-scroll-and-sticky-row.docs';

/** #patterns **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NovaSharedModule,
    NovaLibModule,
    DefaultDynamicTableComponent,
    MultipleActionButtonsDynamicTableComponent,
    ColumnHeaderActionsDynamicTableComponent,
    VerticalScrollAndStickyRowDynamicTableComponent,
    PinnedColumnAndHorizontalScrollDynamicTableComponent,
    VerticalAndHorizontalScrollDynamicTableComponent,
    IndeterminateLinearProgressDynamicTableComponent,
    IndeterminateCircularProgressDynamicTableComponent,
    NotificationsDynamicTableComponent,
    MultiSelectDynamicTableComponent,
    SingleRowExpandableDynamicTableComponent,
    MultiRowExpandableDynamicTableComponent,
    SelectionBasedActionBarDynamicTableComponent,
    SearchActionBarDynamicTableComponent,
    SubtleActionBarDynamicTableComponent,
    ToggleActionBarDynamicTableComponent,
    PaginationDynamicTableComponent,
    ActionBarAndPaginationDynamicTableComponent,
    FilterDialogDynamicTableComponent,
    InTableFiltersDynamicTableComponent,
    FiltersDynamicTableComponent,
    DataFetchOnPaginationDynamicTableComponent,
    DataFetchAccordionToggleDynamicTableComponent
  ],
  standalone: true,
  selector: 'nova-workshop-dynamic-table',
  templateUrl: './dynamic-table.docs.html'
})
export class DynamicTableDocsComponent {
  readonly workshopService = inject(WorkshopService);
  constructor() {
    this.workshopService.componentName.set('Dynamic Table');
    this.workshopService.neededAPI.set([
      { name: 'TableComponent', type: 'component' },
      { name: 'TableWrapperComponent', type: 'component' }
    ]);
  }
}
