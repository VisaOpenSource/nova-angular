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
import { ActiveElementNavDrawerComponent } from './active-element/active-element.docs';
import { AlternateActiveElementNavDrawerComponent } from './alternate-with-active-element/alternate-with-active-element.docs';
import { AlternateWithIconsNavDrawerComponent } from './alternate-with-icons/alternate-with-icons.docs';
import { AlternateNavDrawerComponent } from './alternate/alternate.docs';
import { DefaultNavDrawerComponent } from './default/default.docs';
import { NestedWithSectionTitlesNavDrawerComponent } from './nested-with-section-titles/nested-with-section-titles.docs';
import { NestedNavDrawerComponent } from './nested/nested.docs';
import { WithIconsNavDrawerComponent } from './with-icons/with-icons.docs';
import { WithSectionTitleNavDrawerComponent } from './with-section-titles/with-section-titles.docs';

const examples = {
  DefaultNavDrawerComponent,
  NestedNavDrawerComponent,
  WithIconsNavDrawerComponent,
  WithSectionTitleNavDrawerComponent,
  ActiveElementNavDrawerComponent,
  NestedWithSectionTitlesNavDrawerComponent,
  AlternateNavDrawerComponent,
  AlternateActiveElementNavDrawerComponent,
  AlternateWithIconsNavDrawerComponent
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Navigation drawer examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key]);
      expect(container).toMatchSnapshot();
    });
  });
});
