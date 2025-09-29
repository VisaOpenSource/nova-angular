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
import { CustomButtonsDropdownmenuComponent } from './custom-buttons/custom-buttons.docs';
import { CustomLinksDropdownmenuComponent } from './custom-links/custom-links.docs';
import { FormDropdownmenuComponent } from './form/form.docs';
import { IconButtonDropdownmenuComponent } from './icon-button/icon-button.docs';
import { NativePopoverDropdownmenuComponent } from './native-popover/native-popover.docs';
import { TextButtonDropdownmenuComponent } from './text-button/text-button.docs';

const examples = {
  CustomButtonsDropdownmenuComponent,
  CustomLinksDropdownmenuComponent,
  FormDropdownmenuComponent,
  IconButtonDropdownmenuComponent,
  NativePopoverDropdownmenuComponent,
  TextButtonDropdownmenuComponent
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Banner examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key]);
      expect(container).toMatchSnapshot();
    });
  });
});
