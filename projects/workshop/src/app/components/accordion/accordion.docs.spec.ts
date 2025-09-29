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
import { render } from '@testing-library/angular';

import { DefaultAccordionComponent } from './default/default.docs';
import { DisabledAccordionComponent } from './disabled/disabled.docs';
import { MultiSelectDefaultAccordionComponent } from './multi-select-default/multi-select-default.docs';
import { MultiSelectExpandedAccordionComponent } from './multi-select-expanded/multi-select-expanded.docs';
import { MultiSelectSubtleAccordionComponent } from './multi-select-subtle/multi-select-subtle.docs';
import { MultiSelectWithDisabledAccordionComponent } from './multi-select-with-disabled-accordion/multi-select-with-disabled-accordion.docs';
import { SeparateToggleAccordionComponent } from './separate-toggle/separate-toggle.docs';
import { SingleSelectDefaultAccordionComponent } from './single-select-default/single-select-default.docs';
import { SingleSelectExpandedAccordionComponent } from './single-select-expanded/single-select-expanded.docs';
import { SingleSelectSubtleAccordionComponent } from './single-select-subtle/single-select-subtle.docs';
import { SingleSelectWithDisabledAccordionComponent } from './single-select-with-disabled-accordion/single-select-with-disabled-accordion.docs';
import { SubtleDisabledAccordionComponent } from './subtle-disabled/subtle-disabled.docs';
import { SubtleWithIconAccordionComponent } from './subtle-with-icon/subtle-with-icon.docs';
import { SubtleAccordionComponent } from './subtle/subtle.docs';
import { WithArrowKeyNavAccordionComponent } from './with-arrow-key-navigation/with-arrow-key-navigation.docs';
import { ArrowKeysAndNoTabNavAccordionComponent } from './with-arrow-keys-and-no-tab-navigation/with-arrow-keys-and-no-tab-navigation.docs';
import { WithBadgeAccordionComponent } from './with-badge/with-badge.docs';
import { WithCustomToggleIconsAccordionComponent } from './with-custom-toggle-icons/with-custom-toggle-icons.docs';
import { WithIconAccordionComponent } from './with-icon/with-icon.docs';
import { WithProgrammaticExpansionAccordionComponent } from './with-programmatic-expansion/with-programmatic-expansion.docs';
import { IdGenerator } from '@visa/nova-angular';

const examples = {
  DefaultAccordionComponent,
  DisabledAccordionComponent,
  MultiSelectDefaultAccordionComponent,
  MultiSelectExpandedAccordionComponent,
  MultiSelectSubtleAccordionComponent,
  MultiSelectWithDisabledAccordionComponent,
  SeparateToggleAccordionComponent,
  SingleSelectDefaultAccordionComponent,
  SingleSelectExpandedAccordionComponent,
  SingleSelectSubtleAccordionComponent,
  SingleSelectWithDisabledAccordionComponent,
  SubtleDisabledAccordionComponent,
  SubtleWithIconAccordionComponent,
  SubtleAccordionComponent,
  WithArrowKeyNavAccordionComponent,
  ArrowKeysAndNoTabNavAccordionComponent,
  WithBadgeAccordionComponent,
  WithCustomToggleIconsAccordionComponent,
  WithIconAccordionComponent,
  WithProgrammaticExpansionAccordionComponent
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Accordion examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key]);
      expect(container).toMatchSnapshot();
    });
  });
});
