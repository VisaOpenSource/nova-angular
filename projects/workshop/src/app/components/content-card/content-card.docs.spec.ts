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
import { NovaCategoryCardComponent } from './category/category.docs';
import { NovaClickableCardDisabledComponent } from './clickable-card-disabled/clickable-card-disabled.docs';
import { NovaClickableCardComponent } from './clickable-card/clickable-card.docs';
import { NovaCompactDashboardCardComponent } from './compact-dashboard/compact-dashboard.docs';
import { NovaCompactCardComponent } from './compact/compact.docs';
import { NovaDefaultDashboardCardComponent } from './default-dashboard/default-dashboard.docs';
import { NovaDefaultWithUIButtonsCardComponent } from './default-with-ui-buttons/default-with-ui-buttons.docs';
import { NovaDefaultCardComponent } from './default/default.docs';
import { NovaIconCardComponent } from './icon/icon.docs';
import { NovaImageCardComponent } from './image/image.docs';

const examples = {
  NovaCompactDashboardCardComponent,
  NovaCategoryCardComponent,
  NovaClickableCardComponent,
  NovaClickableCardDisabledComponent,
  NovaCompactCardComponent,
  NovaDefaultCardComponent,
  NovaDefaultWithUIButtonsCardComponent,
  NovaIconCardComponent,
  NovaImageCardComponent,
  NovaDefaultDashboardCardComponent
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Content card examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key]);
      expect(container).toMatchSnapshot();
    });
  });
});
