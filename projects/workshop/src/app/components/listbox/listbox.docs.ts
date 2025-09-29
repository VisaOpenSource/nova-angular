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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovaLibModule } from '@visa/nova-angular';
import { MarkdownModule } from 'ngx-markdown';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { WorkshopService } from '../../shared/services/workshop.service';
import { DisabledMultiSelectListboxComponent } from './disabled-multi-select-listbox/disabled-multi-select-listbox.docs';
import { DisabledSingleSelectListboxComponent } from './disabled-single-select-listbox/disabled-single-select-listbox.docs';
import { ModelDrivenFBListboxComponent } from './model-driven-fb/model-driven-fb.docs';
import { ModelDrivenFormListboxComponent } from './model-driven-form/model-driven-form.docs';
import { MultiSelectDefaultListboxComponent } from './multi-select-default/multi-select-default.docs';
import { MultiSelectModelDrivenListboxComponent } from './multi-select-model-driven/multi-select-model-driven.docs';
import { MultiSelectScrollToIndexListboxComponent } from './multi-select-scroll-to-index/multi-select-scroll-to-index.docs';
import { MultiSelectTemplateDrivenListboxComponent } from './multi-select-template-driven/multi-select-template-driven.docs';
import { MultiSelectWithDisabledItemListboxComponent } from './multi-select-with-disabled-item/multi-select-with-disabled-item.docs';
import { MultiSelectWithErrorListboxComponent } from './multi-select-with-error/multi-select-with-error.docs';
import { MultiSelectWithInlineMessageListboxComponent } from './multi-select-with-inline-message/multi-select-with-inline-message.docs';
import { MultiSelectWithResizeListboxComponent } from './multi-select-with-resize/multi-select-with-resize.docs';
import { MultiSelectWithSelectedItemListboxComponent } from './multi-select-with-selected-item/multi-select-with-selected-item.docs';
import { AutomaticSingleSelectListboxComponent } from './single-select-automatic-selection/single-select-automatic-selection.docs';
import { SingleSelectDefaultListboxComponent } from './single-select-default/single-select-default.docs';
import { SingleSelectModelDrivenListboxComponent } from './single-select-model-driven/single-select-model-driven.docs';
import { SingleSelectTemplateDrivenListboxComponent } from './single-select-template-driven/single-select-template-driven.docs';
import { SingleSelectWithDisabledItemListboxComponent } from './single-select-with-disabled-item/single-select-with-disabled-item.docs';
import { SingleSelectWithErrorListboxComponent } from './single-select-with-error/single-select-with-error.docs';
import { SingleSelectWithInlineMessageListboxComponent } from './single-select-with-inline-message/single-select-with-inline-message.docs';
import { SingleSelectWithResizeListboxComponent } from './single-select-with-resize/single-select-with-resize.docs';
import { SingleSelectWithSelectedItemListboxComponent } from './single-select-with-selected-item/single-select-with-selected-item.docs';
import { TemplateDrivenFormListboxComponent } from './template-driven-form/template-driven-form.docs';
import { VisaInformationLow } from '@visa/nova-icons-angular';
import { MultiSelectCheckboxGroupListboxComponent } from './multi-select-checkbox-group/multi-select-checkbox-group.docs';
import { SingleSelectRadioGroupListboxComponent } from './single-select-radio-group/single-select-radio-group.docs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MarkdownModule,
    NovaLibModule,
    NovaSharedModule,
    FormsModule,
    ReactiveFormsModule,
    AutomaticSingleSelectListboxComponent,
    DisabledMultiSelectListboxComponent,
    DisabledSingleSelectListboxComponent,
    ModelDrivenFBListboxComponent,
    ModelDrivenFormListboxComponent,
    MultiSelectCheckboxGroupListboxComponent,
    MultiSelectDefaultListboxComponent,
    MultiSelectModelDrivenListboxComponent,
    MultiSelectScrollToIndexListboxComponent,
    MultiSelectScrollToIndexListboxComponent,
    MultiSelectTemplateDrivenListboxComponent,
    MultiSelectWithDisabledItemListboxComponent,
    MultiSelectWithErrorListboxComponent,
    MultiSelectWithInlineMessageListboxComponent,
    MultiSelectWithResizeListboxComponent,
    MultiSelectWithSelectedItemListboxComponent,
    SingleSelectDefaultListboxComponent,
    SingleSelectModelDrivenListboxComponent,
    SingleSelectRadioGroupListboxComponent,
    SingleSelectTemplateDrivenListboxComponent,
    SingleSelectWithDisabledItemListboxComponent,
    SingleSelectWithErrorListboxComponent,
    SingleSelectWithInlineMessageListboxComponent,
    SingleSelectWithResizeListboxComponent,
    SingleSelectWithSelectedItemListboxComponent,
    TemplateDrivenFormListboxComponent,
    VisaInformationLow
  ],
  standalone: true,
  selector: 'vds-docs-listbox',
  templateUrl: './listbox.docs.html'
})
export class ListboxDocsComponent {
  readonly workshopService = inject(WorkshopService);

  constructor() {
    this.workshopService.componentName.set('Listbox');
    this.workshopService.neededAPI.set([
      { name: 'ListboxContainerDirective' },
      { name: 'ListboxDirective' },
      { name: 'ListboxItemComponent', type: 'component' },
      { name: 'LabelDirective' },
      { name: 'InputMessageDirective' },
      { name: 'ListboxService', type: 'service-source' },
      { name: 'IdGenerator', type: 'service-source' },
      { name: 'NovaLibService', type: 'service-source' },
      { name: 'AppReadyService', type: 'service-source' }
    ]);
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
