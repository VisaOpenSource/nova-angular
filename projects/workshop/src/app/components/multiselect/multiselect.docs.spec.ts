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
import { render } from '@testing-library/angular';

import { HttpClient, HttpHandler } from '@angular/common/http';
import { IdGenerator } from '@visa/nova-angular';
import { MockDataService } from '../../shared/services/mock-data.service';
import { AutoAutocompleteMultiselectComponent } from './auto-autocomplete/auto-autocomplete.docs';
import { DefaultMultiselectComponent } from './default/default.docs';
import { DisabledMultiselectComponent } from './disabled/disabled.docs';
import { ErrorMultiselectComponent } from './error/error.docs';
import { InfiniteScrollMultiselectComponent } from './infinite-scroll/infinite-scroll.docs';
import { InlineMessageMultiselectComponent } from './inline-message/inline-message.docs';
import { ManualAutocompleteMultiselectComponent } from './manual-autocomplete/manual-autocomplete.docs';
import { ModelDrivenFbMultiselectComponent } from './model-driven-fb/model-driven-fb.docs';
import { ModelDrivenMultiselectComponent } from './model-driven/model-driven.docs';
import { ReadOnlyMultiselectComponent } from './read-only/read-only.docs';
import { TemplateDrivenProgrammaticSelectionMultiselectComponent } from './template-driven-with-programmatic-selection/template-driven-with-programmatic-selection.docs';
import { WithDisabledOptionMultiselectComponent } from './with-disabled-option/with-disabled-option.docs';
import { MultiselectWithMultipleSelectionsAndVerticalScrollComponent } from './with-multiple-selections-and-vertical-scroll/with-multiple-selections-and-vertical-scroll.docs';
import { WithScrollMultiselectComponent } from './with-scroll-bar/with-scroll-bar.docs';
import { SelectAndUnselectAllMenuMultiselectComponent } from './with-select-and-unselect-all-buttons/with-select-and-unselect-all-buttons.docs';
import { WithoutDropdownChevronMultiselectComponent } from './without-dropdown-chevron/without-dropdown-chevron.docs';
// import { ModelDrivenProgrammticSelectionMultiselectComponent } from './model-driven-with-programmatic-selection/model-driven-with-programmatic-selection.docs';

const examples = {
  AutoAutocompleteMultiselectComponent,
  DefaultMultiselectComponent,
  DisabledMultiselectComponent,
  ErrorMultiselectComponent,
  InfiniteScrollMultiselectComponent,
  InlineMessageMultiselectComponent,
  ManualAutocompleteMultiselectComponent,
  ModelDrivenFbMultiselectComponent,
  ModelDrivenMultiselectComponent,
  MultiselectWithMultipleSelectionsAndVerticalScrollComponent,
  ReadOnlyMultiselectComponent,
  SelectAndUnselectAllMenuMultiselectComponent,
  // TemplateDrivenMultiselectComponent,
  TemplateDrivenProgrammaticSelectionMultiselectComponent,
  WithDisabledOptionMultiselectComponent,
  WithoutDropdownChevronMultiselectComponent,
  WithScrollMultiselectComponent
  // TODO: Fix this examples change detection
  // ModelDrivenProgrammticSelectionMultiselectComponent,
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Multiselect examples', () => {
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
