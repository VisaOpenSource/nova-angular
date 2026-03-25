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

import { HorizontalApplicationLayoutComponent } from './horizontal-application-layout/horizontal-application-layout.docs';
import { VerticalApplicationLayoutComponent } from './vertical-application-layout/vertical-application-layout.docs';
import { MixedApplicationLayoutComponent } from './mixed-application-layout/mixed-application-layout.docs';
import { StackedHorizontalApplicationLayoutComponent } from './stacked-horizontal-application-layout/stacked-horizontal-application-layout.docs';


const examples = {
  HorizontalApplicationLayoutComponent,
  VerticalApplicationLayoutComponent,
  MixedApplicationLayoutComponent,
  StackedHorizontalApplicationLayoutComponent,
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Application layouts examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key], {
        providers: [WorkshopService, HttpClient, HttpHandler],
      });
      expect(container).toMatchSnapshot();
    });
  });
});
