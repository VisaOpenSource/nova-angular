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
import { DefaultIconComponent } from './default/default.docs';
import { GenericIconComponent } from './generic/generic.docs';
import { HighResolutionIconComponent } from './high-resolution/high-resolution.docs';
import { LowResolutionIconComponent } from './low-resolution/low-resolution.docs';
import { RTLIconComponent } from './rtl/rtl.docs';
import { TinyResolutionIconComponent } from './tiny-resolution/tiny-resolution.docs';
import { UsingIconSpriteIconComponent } from './using-icon-sprite/using-icon-sprite.docs';
import { VisaIconComponent } from './visa/visa.docs';

const examples = {
  DefaultIconComponent,
  GenericIconComponent,
  HighResolutionIconComponent,
  LowResolutionIconComponent,
  RTLIconComponent,
  TinyResolutionIconComponent,
  UsingIconSpriteIconComponent,
  VisaIconComponent
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Icon examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key]);
      expect(container).toMatchSnapshot();
    });
  });
});
