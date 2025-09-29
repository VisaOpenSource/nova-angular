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
import { AlternateLinkComponent } from './alternate/alternate.docs';
import { ButtonAsDisabledLinkLinkComponent } from './button-as-disabled-link/button-as-disabled-link.docs';
import { ButtonAsLinkLinkComponent } from './button-as-link/button-as-link.docs';
import { DefaultLinkComponent } from './default/default.docs';
import { DisabledLinkComponent } from './disabled/disabled.docs';
import { InlineLinkComponent } from './inline/inline.docs';
import { LinkWithLeadingIconComponent } from './link-with-leading-icon/link-with-leading-icon.docs';
import { LinkWithTrailingIconComponent } from './link-with-trailing-icon/link-with-trailing-icon.docs';
import { LinkOpenInNewTab } from './open-in-new-tab/open-in-new-tab.docs';
import { WithoutUnderlineLinkComponent } from './without-underline/without-underline.docs';

const examples = {
  AlternateLinkComponent,
  ButtonAsDisabledLinkLinkComponent,
  ButtonAsLinkLinkComponent,
  DefaultLinkComponent,
  DisabledLinkComponent,
  InlineLinkComponent,
  LinkWithLeadingIconComponent,
  LinkWithTrailingIconComponent,
  LinkOpenInNewTab,
  WithoutUnderlineLinkComponent
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Link examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key]);
      expect(container).toMatchSnapshot();
    });
  });
});
