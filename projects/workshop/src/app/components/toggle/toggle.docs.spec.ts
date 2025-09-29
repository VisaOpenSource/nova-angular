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

import { IdGenerator } from '@visa/nova-angular';
import { NovaToggleDefaultComponent } from './default/default.docs';
import { NovaToggleDisabledComponent } from './disabled/disabled.docs';
import { NovaToggleIconOnlyComponent } from './icon-only/icon-only.docs';
import { ModelDrivenFbToggleComponent } from './model-driven-fb/model-driven-fb.docs';
import { ModelDrivenFormToggleComponent } from './model-driven-form/model-driven-form.docs';
import { MultiSelectCheckboxesToggleComponent } from './multi-select-with-checkboxes/multi-select-with-checkboxes.docs';
import { NovaMultiSelectToggleComponent } from './multi-select/multi-select.docs';
import { NovaToggleOneButtonDisabledComponent } from './one-button-disabled/one-button-disabled.docs';
import { SingleSelectRadioButtonToggleComponent } from './single-select-with-radio-buttons/single-select-with-radio-buttons.docs';
import { NovaStandaloneMultiSelectToggleComponent } from './standalone-multi-select/standalone-multi-select.docs';
import { TemplateDrivenFormToggleComponent } from './template-driven-form/template-driven-form.docs';
import { NovaToggleWithLeadingIconComponent } from './with-leading-icon/with-leading-icon.docs';
import { NovaToggleWithTrailingIconComponent } from './with-trailing-icon/with-trailing-icon.docs';

const examples = {
  NovaToggleDefaultComponent,
  NovaToggleDisabledComponent,
  NovaToggleIconOnlyComponent,
  ModelDrivenFbToggleComponent,
  ModelDrivenFormToggleComponent,
  MultiSelectCheckboxesToggleComponent,
  NovaMultiSelectToggleComponent,
  NovaToggleOneButtonDisabledComponent,
  SingleSelectRadioButtonToggleComponent,
  NovaStandaloneMultiSelectToggleComponent,
  TemplateDrivenFormToggleComponent,
  NovaToggleWithLeadingIconComponent,
  NovaToggleWithTrailingIconComponent
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Toggle examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key]);
      expect(container).toMatchSnapshot();
    });
  });
});
