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
import { CheckedCheckboxComponent } from './checked/checked.docs';
import { DisabledCheckedCheckboxComponent } from './disabled-checked/disabled-checked.docs';
import { DisabledPanelCheckboxComponent } from './disabled-panel/disabled-panel.docs';
import { DisabledCheckboxComponent } from './disabled/disabled.docs';
import { ErrorCheckboxComponent } from './error/error.docs';
import { GroupWithErrorCheckboxComponent } from './group-with-error/group-with-error.docs';
import { GroupCheckboxComponent } from './group/group.docs';
import { HorizontalGroupCheckboxComponent } from './horizontal-group/horizontal-group.docs';
import { IndeterminateGroupWithErrorCheckboxComponent } from './indeterminate-group-with-error/indeterminate-group-with-error.docs';
import { IndeterminateGroupCheckboxComponent } from './indeterminate-group/indeterminate-group.docs';
import { IndeterminateWithErrorCheckboxComponent } from './indeterminate-with-error/indeterminate-with-error.docs';
import { ModelDrivenFbCheckboxComponent } from './model-driven-fb/model-driven-fb.docs';
import { ModelDrivenFormCheckboxComponent } from './model-driven-form/model-driven-form.docs';
import { ModelDrivenCheckboxComponent } from './model-driven/model-driven.docs';
import { PanelGroupWithErrorCheckboxComponent } from './panel-group-with-error/panel-group-with-error.docs';
import { PanelGroupCheckboxComponent } from './panel-group/panel-group.docs';
import { PanelWithoutDescriptionCheckboxComponent } from './panel-without-description/panel-without-description.docs';
import { PanelCheckboxComponent } from './panel/panel.docs';
import { TemplateDrivenFormCheckboxComponent } from './template-driven-form/template-driven-form.docs';
import { TemplateDrivenCheckboxComponent } from './template-driven/template-driven.docs';
import { WithDescriptionCheckboxComponent } from './with-description/with-description.docs';
import { WithLabelCheckboxComponent } from './with-label/with-label.docs';
import { WithoutVisibleLabelCheckboxComponent } from './without-visible-label/without-visible-label.docs';

const examples = {
  CheckedCheckboxComponent,
  DisabledCheckedCheckboxComponent,
  DisabledPanelCheckboxComponent,
  DisabledCheckboxComponent,
  ErrorCheckboxComponent,
  GroupWithErrorCheckboxComponent,
  GroupCheckboxComponent,
  HorizontalGroupCheckboxComponent,
  IndeterminateGroupWithErrorCheckboxComponent,
  IndeterminateGroupCheckboxComponent,
  IndeterminateWithErrorCheckboxComponent,
  ModelDrivenFbCheckboxComponent,
  ModelDrivenFormCheckboxComponent,
  ModelDrivenCheckboxComponent,
  PanelGroupWithErrorCheckboxComponent,
  PanelGroupCheckboxComponent,
  PanelWithoutDescriptionCheckboxComponent,
  PanelCheckboxComponent,
  TemplateDrivenFormCheckboxComponent,
  TemplateDrivenCheckboxComponent,
  WithDescriptionCheckboxComponent,
  WithLabelCheckboxComponent,
  WithoutVisibleLabelCheckboxComponent
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Checkbox examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key]);
      expect(container).toMatchSnapshot();
    });
  });
});
