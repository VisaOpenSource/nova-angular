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
import { DefaultBadgeComponent } from './default/default.docs';
import { LongNumberBadgeComponent } from './long-number/long-number.docs';
import { NegativeIconNoBackgroundBadgeComponent } from './negative-icon-no-background/negative-icon-no-background.docs';
import { NegativeIconOnlyBadgeComponent } from './negative-icon-only/negative-icon-only.docs';
import { NegativeLabelOnlyBadgeComponent } from './negative-label-only/negative-label-only.docs';
import { NegativeNoBackgroundBadgeComponent } from './negative-no-background/negative-no-background.docs';
import { NegativeNumberNoBackgroundBadgeComponent } from './negative-number-no-background/negative-number-no-background.docs';
import { NegativeNumberBadgeComponent } from './negative-number/negative-number.docs';
import { NegativeWithEllipseBadgeComponent } from './negative-with-ellipse/negative-with-ellipse.docs';
import { NegativeWithIconBadgeComponent } from './negative-with-icon/negative-with-icon.docs';
import { NeutralIconNoBackgroundBadgeComponent } from './neutral-icon-no-background/neutral-icon-no-background.docs';
import { NeutralIconOnlyBadgeComponent } from './neutral-icon-only/neutral-icon-only.docs';
import { NeutralLabelOnlyBadgeComponent } from './neutral-label-only/neutral-label-only.docs';
import { NeutralNumberNoBackgroundBadgeComponent } from './neutral-number-no-background/neutral-number-no-background.docs';
import { NeutralNumberBadgeComponent } from './neutral-number/neutral-number.docs';
import { NeutralWithEllipseBadgeComponent } from './neutral-with-ellipse/neutral-with-ellipse.docs';
import { NeutralWithIconBadgeComponent } from './neutral-with-icon/neutral-with-icon.docs';
import { NumberNoBackgroundBadgeComponent } from './number-no-background/number-no-background.docs';
import { NumberBadgeComponent } from './number/number.docs';
import { StableIconNoBackgroundBadgeComponent } from './stable-icon-no-background/stable-icon-no-background.docs';
import { StableIconOnlyBadgeComponent } from './stable-icon-only/stable-icon-only.docs';
import { StableLabelOnlyBadgeComponent } from './stable-label-only/stable-label-only.docs';
import { StableNoBackgroundBadgeComponent } from './stable-no-background/stable-no-background.docs';
import { StableNumberNoBackgroundBadgeComponent } from './stable-number-no-background/stable-number-no-background.docs';
import { StableNumberBadgeComponent } from './stable-number/stable-number.docs';
import { StableWithEllipseBadgeComponent } from './stable-with-ellipse/stable-with-ellipse.docs';
import { StableWithIconBadgeComponent } from './stable-with-icon/stable-with-icon.docs';
import { SubtleIconNoBackgroundBadgeComponent } from './subtle-icon-no-background/subtle-icon-no-background.docs';
import { SubtleIconOnlyBadgeComponent } from './subtle-icon-only/subtle-icon-only.docs';
import { SubtleLabelOnlyBadgeComponent } from './subtle-label-only/subtle-label-only.docs';
import { SubtleNoBackgroundBadgeComponent } from './subtle-no-background/subtle-no-background.docs';
import { SubtleNumberNoBackgroundBadgeComponent } from './subtle-number-no-background/subtle-number-no-background.docs';
import { SubtleNumberBadgeComponent } from './subtle-number/subtle-number.docs';
import { SubtleWithEllipseBadgeComponent } from './subtle-with-ellipse/subtle-with-ellipse.docs';
import { SubtleWithIconBadgeComponent } from './subtle-with-icon/subtle-with-icon.docs';
import { WarningIconNoBackgroundBadgeComponent } from './warning-icon-no-background/warning-icon-no-background.docs';
import { WarningIconOnlyBadgeComponent } from './warning-icon-only/warning-icon-only.docs';
import { WarningLabelOnlyBadgeComponent } from './warning-label-only/warning-label-only.docs';
import { WarningNoBackgroundBadgeComponent } from './warning-no-background/warning-no-background.docs';
import { WarningNumberNoBackgroundBadgeComponent } from './warning-number-no-background/warning-number-no-background.docs';
import { WarningNumberBadgeComponent } from './warning-number/warning-number.docs';
import { WarningWithEllipseBadgeComponent } from './warning-with-ellipse/warning-with-ellipse.docs';
import { WarningWithIconBadgeComponent } from './warning-with-icon/warning-with-icon.docs';

const examples = {
  DefaultBadgeComponent,
  LongNumberBadgeComponent,
  NegativeIconNoBackgroundBadgeComponent,
  NegativeIconOnlyBadgeComponent,
  NegativeLabelOnlyBadgeComponent,
  NegativeNoBackgroundBadgeComponent,
  NegativeNumberNoBackgroundBadgeComponent,
  NegativeNumberBadgeComponent,
  NegativeWithEllipseBadgeComponent,
  NegativeWithIconBadgeComponent,
  NeutralIconNoBackgroundBadgeComponent,
  NeutralIconOnlyBadgeComponent,
  NeutralLabelOnlyBadgeComponent,
  NeutralNumberNoBackgroundBadgeComponent,
  NeutralNumberBadgeComponent,
  NeutralWithEllipseBadgeComponent,
  NeutralWithIconBadgeComponent,
  NumberNoBackgroundBadgeComponent,
  NumberBadgeComponent,
  StableIconNoBackgroundBadgeComponent,
  StableIconOnlyBadgeComponent,
  StableLabelOnlyBadgeComponent,
  StableNoBackgroundBadgeComponent,
  StableNumberNoBackgroundBadgeComponent,
  StableNumberBadgeComponent,
  StableWithEllipseBadgeComponent,
  StableWithIconBadgeComponent,
  SubtleIconNoBackgroundBadgeComponent,
  SubtleIconOnlyBadgeComponent,
  SubtleLabelOnlyBadgeComponent,
  SubtleNoBackgroundBadgeComponent,
  SubtleNumberNoBackgroundBadgeComponent,
  SubtleNumberBadgeComponent,
  SubtleWithEllipseBadgeComponent,
  SubtleWithIconBadgeComponent,
  WarningIconNoBackgroundBadgeComponent,
  WarningIconOnlyBadgeComponent,
  WarningLabelOnlyBadgeComponent,
  WarningNoBackgroundBadgeComponent,
  WarningNumberNoBackgroundBadgeComponent,
  WarningNumberBadgeComponent,
  WarningWithEllipseBadgeComponent,
  WarningWithIconBadgeComponent
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Badge examples snapshots', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key]);
      expect(container).toMatchSnapshot();
    });
  });
});
