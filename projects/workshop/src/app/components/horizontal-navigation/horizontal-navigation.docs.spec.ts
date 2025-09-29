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
import { AlternateWithActiveElementHorizontalNavComponent } from './alternate-with-active-element/alternate-with-active-element.docs';
import { AlternateWithIconsHorizontalNavComponent } from './alternate-with-icons/alternate-with-icons.docs';
import { AlternateHorizontalNavComponent } from './alternate/alternate.docs';
import { DefaultHorizontalNavComponent } from './default/default.docs';
import { PersistentSearcgHorizontalNavComponent } from './persistent-search/persistent-search.docs';
import { StackedWithPersistentSearchHorizontalNavComponent } from './stacked-with-persistent-search/stacked-with-persistent-search.docs';
import { StackedHorizontalNavComponent } from './stacked/stacked.docs';
import { WithActiveElementHorizontalNavComponent } from './with-active-element/with-active-element.docs';
import { WithIconsHorizontalNavComponent } from './with-icons/with-icons.docs';

const examples = {
  AlternateHorizontalNavComponent,
  AlternateWithActiveElementHorizontalNavComponent,
  AlternateWithIconsHorizontalNavComponent,
  DefaultHorizontalNavComponent,
  PersistentSearcgHorizontalNavComponent,
  StackedHorizontalNavComponent,
  StackedWithPersistentSearchHorizontalNavComponent,
  WithActiveElementHorizontalNavComponent,
  WithIconsHorizontalNavComponent
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Horizontal navigation examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key]);
      expect(container).toMatchSnapshot();
    });
  });
});
