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
import { WorkshopService } from '../../shared/services/workshop.service';

import { IdGenerator } from '@visa/nova-angular';
import { CompactWizardComponent } from './compact/compact.docs';
import { HorizontalWizardComponent } from './horizontal/horizontal.docs';
import { VerticalWizardComponent } from './vertical/vertical.docs';
import { InPageWizardComponent } from './in-page/in-page.docs';

const examples = {
  CompactWizardComponent,
  HorizontalWizardComponent,
  VerticalWizardComponent,
  InPageWizardComponent,
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Wizard examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key], {
        providers: [WorkshopService, HttpClient, HttpHandler],
      });
      expect(container).toMatchSnapshot();
    });
  });
});
