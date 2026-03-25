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
import { HttpClient, HttpHandler } from '@angular/common/http';
import { render } from '@testing-library/angular';
import { MockDataService } from '../../shared/services/mock-data.service';

import { IdGenerator } from '@visa/nova-angular';
import { AutoAutocompleteComboboxComponent } from './auto-autocomplete/auto-autocomplete.docs';
import { DefaultComboboxComponent } from './default/default.docs';
import { DisabledComboboxComponent } from './disabled/disabled.docs';
import { DynamicDataSetComboboxComponent } from './dynamic-data-set/dynamic-data-set.docs';
import { ErrorComboboxComponent } from './error/error.docs';
import { CustomFilterComboboxComponent } from './fully-custom-filter/fully-custom-filter.docs';
import { HighlightOnCloseComboboxComponent } from './highlight-on-close/highlight-on-close.docs';
import { InfiniteScrollComboboxComponent } from './infinite-scroll/infinite-scroll.docs';
import { ManualAutocompleteComboboxComponent } from './manual-autocomplete/manual-autocomplete.docs';
import { ModelDrivenFbComboboxComponent } from './model-driven-fb/model-driven-fb.docs';
import { ModelDrivenComboboxComponent } from './model-driven/model-driven.docs';
import { OpenOnSelectComboboxComponent } from './open-on-select/open-on-select.docs';
import { ReadOnlyComboboxComponent } from './read-only/read-only.docs';
import { DisplayedComboboxDocsComponent } from './shared-combobox-with-delayed-data/shared-combobox-with-delayed-data.docs';
import { TemplateDrivenProgrammaticSelectionComboboxComponent } from './template-driven-with-programmatic-selection/template-driven-with-programmatic-selection.docs';
import { TemplateDrivenComboboxComponent } from './template-driven/template-driven.docs';
import { WithClearButtonComboboxComponent } from './with-clear-button/with-clear-button.docs';
import { DisabledOptionComboboxComponent } from './with-disabled-option/with-disabled-option.docs';
import { WithInlineLabelComboboxComponent } from './with-inline-label/with-inline-label.docs';
import { WithInlineMessageComboboxComponent } from './with-inline-message/with-inline-message.docs';
import { WithLeadingIconComboboxComponent } from './with-leading-icon/with-leading-icon.docs';
import { ScrollBarComboboxComponent } from './with-scroll-bar/with-scroll-bar.docs';
import { WithSelectedOptionComboboxComponent } from './with-selected-option/with-selected-option.docs';
import { WithoutDropdownChevronComboboxComponent } from './without-dropdown-chevron/without-dropdown-chevron.docs';
// TODO: Fix this example change detection
// import { ModelDrivenProgrammticSelectionComboboxComponent } from './model-driven-with-programmatic-selection/model-driven-with-programmatic-selection.docs';

const examples = {
  AutoAutocompleteComboboxComponent,
  DefaultComboboxComponent,
  DisabledComboboxComponent,
  DynamicDataSetComboboxComponent,
  ErrorComboboxComponent,
  CustomFilterComboboxComponent,
  HighlightOnCloseComboboxComponent,
  ManualAutocompleteComboboxComponent,
  ModelDrivenComboboxComponent,
  ReadOnlyComboboxComponent,
  TemplateDrivenProgrammaticSelectionComboboxComponent,
  TemplateDrivenComboboxComponent,
  WithClearButtonComboboxComponent,
  DisabledOptionComboboxComponent,
  WithInlineLabelComboboxComponent,
  WithInlineMessageComboboxComponent,
  WithLeadingIconComboboxComponent,
  ScrollBarComboboxComponent,
  WithSelectedOptionComboboxComponent,
  WithoutDropdownChevronComboboxComponent,
  OpenOnSelectComboboxComponent,
  InfiniteScrollComboboxComponent,
  ModelDrivenFbComboboxComponent,
  DisplayedComboboxDocsComponent
  // ModelDrivenProgrammticSelectionComboboxComponent,
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Combobox examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container, fixture } = await render(examples[key], {
        providers: [MockDataService, HttpClient, HttpHandler]
      });
      fixture.detectChanges();
      expect(container).toMatchSnapshot();
    });
  });
});
