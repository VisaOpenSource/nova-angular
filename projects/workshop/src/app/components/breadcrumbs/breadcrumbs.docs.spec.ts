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

import { IdGenerator } from '@visa/nova-angular';
import { CustomItemsBreadcrumbsComponent } from './custom-items/custom-items.docs';
import { CustomSeparatorBreadcrumbsComponent } from './custom-separator/custom-separator.docs';
import { DefaultBreadcrumbsComponent } from './default/default.docs';
import { InlineSeparatorBreadcrumbsComponent } from './inline-separator/inline-separator.docs';
import { ServiceBasedActiveCrumbBreadcrumbsComponent } from './service-based-active-crumb/service-based-active-crumb.docs';
import { SvgSeparatorBreadcrumbsComponent } from './svg-separator/svg-separator.docs';
import { DynamicBreadcrumbsComponent } from './dynamic/dynamic.docs';

const examples = {
  CustomItemsBreadcrumbsComponent,
  CustomSeparatorBreadcrumbsComponent,
  DefaultBreadcrumbsComponent,
  InlineSeparatorBreadcrumbsComponent,
  ServiceBasedActiveCrumbBreadcrumbsComponent,
  SvgSeparatorBreadcrumbsComponent,
  DynamicBreadcrumbsComponent
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Breadcrumbs examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key]);
      expect(container).toMatchSnapshot();
    });
  });
});
