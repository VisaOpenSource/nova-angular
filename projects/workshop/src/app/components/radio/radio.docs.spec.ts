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
import { DisabledAndSelectedRadioComponent } from './disabled-and-selected/disabled-and-selected.docs';
import { DisabledPanelRadioComponent } from './disabled-panel/disabled-panel.docs';
import { DisabledRadioComponent } from './disabled/disabled.docs';
import { GroupWithErrorRadioComponent } from './group-with-error/group-with-error.docs';
import { GroupRadioComponent } from './group/group.docs';
import { HorizontalGroupRadioComponent } from './horizontal-group/horizontal-group.docs';
import { ModelDrivenFbRadioComponent } from './model-driven-fb/model-driven-fb.docs';
import { ModelDrivenFormRadioComponent } from './model-driven-form/model-driven-form.docs';
import { PanelGroupWithErrorRadioComponent } from './panel-group-with-error/panel-group-with-error.docs';
import { PanelGroupRadioComponent } from './panel-group/panel-group.docs';
import { PanelWithoutDescriptionRadioComponent } from './panel-without-description/panel-without-description.docs';
import { PanelRadioComponent } from './panel/panel.docs';
import { SelectedRadioComponent } from './selected/selected.docs';
import { TemplateDrivenFormRadioComponent } from './template-driven-form/template-driven-form.docs';
import { WithDescriptionRadioComponent } from './with-description/with-description.docs';
import { WithLabelRadioComponent } from './with-label/with-label.docs';
import { WithoutVisibleLabelRadioComponent } from './without-visible-label/without-visible-label.docs';

const examples = {
  DisabledAndSelectedRadioComponent,
  DisabledPanelRadioComponent,
  DisabledRadioComponent,
  GroupWithErrorRadioComponent,
  GroupRadioComponent,
  HorizontalGroupRadioComponent,
  ModelDrivenFbRadioComponent,
  ModelDrivenFormRadioComponent,
  PanelGroupWithErrorRadioComponent,
  PanelGroupRadioComponent,
  PanelWithoutDescriptionRadioComponent,
  PanelRadioComponent,
  SelectedRadioComponent,
  TemplateDrivenFormRadioComponent,
  WithDescriptionRadioComponent,
  WithLabelRadioComponent,
  WithoutVisibleLabelRadioComponent
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Radio examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key]);
      expect(container).toMatchSnapshot();
    });
  });
});
