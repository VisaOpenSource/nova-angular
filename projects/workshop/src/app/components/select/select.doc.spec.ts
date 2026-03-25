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
import { MockDataService } from '../../shared/services/mock-data.service';

import { IdGenerator } from '@visa/nova-angular';
import { DefaultSelectComponent } from './default/default.docs';
import { DisabledSelectComponent } from './disabled/disabled.docs';
import { ErrorSelectComponent } from './error/error.docs';
import { ReusableSelectDemo } from './reusable/reusable.docs';
import { InitialValueSelectComponent } from './initial-value/initial-value.docs';
import { MockDataSelectComponent } from './mock-data/mock-data.docs';
import { ModelDrivenFbSelectComponent } from './model-driven-fb/model-driven-fb.docs';
import { ModelDrivenFormSelectComponent } from './model-driven-form/model-driven-form.docs';
import { ModelDrivenObjectSelectComponent } from './model-driven-object/model-driven-object.docs';
import { ModelDrivenSelectComponent } from './model-driven/model-driven.docs';
import { ReadOnlySelectComponent } from './read-only/read-only.docs';
import { TemplateDrivenFormSelectComponent } from './template-driven-form/template-driven-form.docs';
import { TemplateDrivenObjectSelectComponent } from './template-driven-object/template-driven-object.docs';
import { TemplateDrivenSelectComponent } from './template-driven/template-driven.docs';
import { WithInlineLabelSelectComponent } from './with-inline-label/with-inline-label.docs';
import { WithInlineMessageSelectComponent } from './with-inline-message/with-inline-message.docs';

const examples = {
  DefaultSelectComponent,
  DisabledSelectComponent,
  ErrorSelectComponent,
  InitialValueSelectComponent,
  MockDataSelectComponent,
  ModelDrivenFbSelectComponent,
  ModelDrivenFormSelectComponent,
  ModelDrivenObjectSelectComponent,
  ModelDrivenSelectComponent,
  ReadOnlySelectComponent,
  TemplateDrivenFormSelectComponent,
  TemplateDrivenObjectSelectComponent,
  TemplateDrivenSelectComponent,
  WithInlineLabelSelectComponent,
  WithInlineMessageSelectComponent,
  ReusableSelectDemo
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Select examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key], { providers: [MockDataService, HttpClient, HttpHandler] });
      expect(container).toMatchSnapshot();
    });
  });
});
